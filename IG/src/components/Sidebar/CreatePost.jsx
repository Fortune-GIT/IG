import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	TextField,
	Tooltip,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { CreatePostLogo } from "../../assets/constants";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePost = () => {
	const [open, setOpen] = useState(false);
	const [caption, setCaption] = useState("");
	const imageRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const showToast = useShowToast();
	const { isLoading, handleCreatePost } = useCreatePost();

	const handlePostCreation = async () => {
		try {
			await handleCreatePost(selectedFile, caption);
			setOpen(false);
			setCaption("");
			setSelectedFile(null);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<>
			<Tooltip title="Create" placement="right" arrow>
				<Box
					onClick={() => setOpen(true)}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						p: 1,
						cursor: "pointer",
						borderRadius: 2,
						width: { xs: 40, md: "100%" },
						justifyContent: { xs: "center", md: "flex-start" },
						"&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
					}}
				>
					<CreatePostLogo />
					<Box sx={{ display: { xs: "none", md: "block" } }}>Create</Box>
				</Box>
			</Tooltip>

			<Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
				<DialogTitle sx={{ bgcolor: "black", color: "white" }}>
					Create Post
					<IconButton
						onClick={() => setOpen(false)}
						sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
					>
						<Close />
					</IconButton>
				</DialogTitle>

				<DialogContent sx={{ bgcolor: "black", color: "white" }}>
					<TextField
						fullWidth
						multiline
						minRows={3}
						placeholder="Post caption..."
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						variant="outlined"
						sx={{
							"& .MuiInputBase-input": { color: "white" },
							"& .MuiOutlinedInput-root": {
								"& fieldset": { borderColor: "gray" },
							},
							mt: 1,
						}}
					/>

					<input type="file" hidden ref={imageRef} onChange={handleImageChange} />
					<BsFillImageFill
						style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
						size={16}
						onClick={() => imageRef.current?.click()}
					/>

					{selectedFile && (
						<Box mt={2} position="relative" display="flex" justifyContent="center">
							<Box
								component="img"
								src={selectedFile}
								alt="Selected"
								sx={{ maxHeight: 250, objectFit: "contain" }}
							/>
							<IconButton
								onClick={() => setSelectedFile(null)}
								sx={{
									position: "absolute",
									top: 8,
									right: 8,
									color: "white",
									backgroundColor: "rgba(0,0,0,0.6)",
									"&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
								}}
								size="small"
							>
								<Close fontSize="small" />
							</IconButton>
						</Box>
					)}
				</DialogContent>

				<DialogActions sx={{ bgcolor: "black", p: 2 }}>
					<Button
						onClick={handlePostCreation}
						variant="contained"
						disabled={isLoading}
						fullWidth
					>
						Post
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default CreatePost;

// 🔁 Logic hook to create post
function useCreatePost() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const { pathname } = useLocation();

	const handleCreatePost = async (selectedFile, caption) => {
		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");

		setIsLoading(true);

		const newPost = {
			caption,
			likes: [],
			comments: [],
			createdAt: serverTimestamp(),
			createdBy: authUser.uid,
		};

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			await uploadString(imageRef, selectedFile, "data_url", {
				customMetadata: {
					uploadedBy: authUser.uid,
				},
			});

			const downloadURL = await getDownloadURL(imageRef);
			await updateDoc(postDocRef, { imageURL: downloadURL });

			await updateDoc(doc(firestore, "users", authUser.uid), {
				posts: arrayUnion(postDocRef.id),
			});

			const finalPost = { ...newPost, id: postDocRef.id, imageURL: downloadURL };

			if (userProfile?.uid === authUser.uid) {
				createPost(finalPost);
				if (pathname !== "/") addPost(finalPost);
			}

			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
}
