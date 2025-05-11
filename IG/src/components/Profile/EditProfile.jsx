import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Avatar,
	Box,
	Stack,
	Typography,
	IconButton,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ isOpen, onClose }) => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		bio: "",
	});

	const authUser = useAuthStore((state) => state.user);
	const fileRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const { isUpdating, editProfile } = useEditProfile();
	const showToast = useShowToast();

	const handleEditProfile = async () => {
		try {
			await editProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="h6">Edit Profile</Typography>
				<IconButton onClick={onClose} sx={{ color: "white" }}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent sx={{ bgcolor: "black", borderTop: "1px solid gray", borderBottom: "1px solid gray" }}>
				<Stack spacing={4} p={isMobile ? 1 : 2}>
					{/* Avatar and Upload */}
					<Stack direction={{ xs: "column", sm: "row" }} spacing={4} alignItems="center">
						<Avatar
							src={selectedFile || authUser.profilePicURL}
							sx={{ width: 80, height: 80, border: "2px solid white" }}
						/>
						<Button
							variant="outlined"
							fullWidth
							onClick={() => fileRef.current.click()}
						>
							Edit Profile Picture
						</Button>
						<input
							type="file"
							hidden
							ref={fileRef}
							onChange={handleImageChange}
						/>
					</Stack>

					{/* Form Fields */}
					<TextField
						label="Full Name"
						variant="outlined"
						size="small"
						fullWidth
						value={inputs.fullName || authUser.fullName}
						onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						InputLabelProps={{ sx: { color: "white" } }}
						InputProps={{ sx: { color: "white" } }}
					/>

					<TextField
						label="Username"
						variant="outlined"
						size="small"
						fullWidth
						value={inputs.username || authUser.username}
						onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						InputLabelProps={{ sx: { color: "white" } }}
						InputProps={{ sx: { color: "white" } }}
					/>

					<TextField
						label="Bio"
						variant="outlined"
						size="small"
						fullWidth
						value={inputs.bio || authUser.bio}
						onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
						InputLabelProps={{ sx: { color: "white" } }}
						InputProps={{ sx: { color: "white" } }}
					/>
				</Stack>
			</DialogContent>

			<DialogActions sx={{ px: 3, py: 2 }}>
				<Button
					variant="contained"
					color="error"
					fullWidth
					size="small"
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					size="small"
					onClick={handleEditProfile}
					disabled={isUpdating}
				>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditProfile;
