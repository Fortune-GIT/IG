import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Button,
	TextField,
	Box,
	Stack,
	Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef } from "react";

const Transition = Slide;

const CommentsModal = ({ isOpen, onClose, post }) => {
	const { handlePostComment, isCommenting } = usePostComment();
	const commentRef = useRef(null);
	const commentsContainerRef = useRef(null);

	const handleSubmitComment = async (e) => {
		e.preventDefault();
		await handlePostComment(post.id, commentRef.current.value);
		commentRef.current.value = "";
	};

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				commentsContainerRef.current.scrollTop =
					commentsContainerRef.current.scrollHeight;
			}, 100);
		}
	}, [isOpen, post.comments.length]);

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			TransitionComponent={Transition}
			PaperProps={{
				sx: {
					backgroundColor: "black",
					border: "1px solid gray",
					maxWidth: "400px",
					width: "100%",
					m: 1,
				},
			}}
		>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				Comments
				<IconButton onClick={onClose} sx={{ color: "white" }}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers sx={{ pb: 1 }}>
				<Stack
					spacing={2}
					sx={{ maxHeight: "250px", overflowY: "auto", mb: 2 }}
					ref={commentsContainerRef}
				>
					{post.comments.map((comment, idx) => (
						<Comment key={idx} comment={comment} />
					))}
				</Stack>

				<Box component="form" onSubmit={handleSubmitComment} mt={4}>
					<TextField
						fullWidth
						variant="outlined"
						size="small"
						placeholder="Comment"
						inputRef={commentRef}
						sx={{
							input: { color: "white" },
						}}
					/>
					<DialogActions sx={{ px: 0 }}>
						<Button
							type="submit"
							variant="contained"
							size="small"
							disabled={isCommenting}
							sx={{ ml: "auto", mt: 2 }}
						>
							Post
						</Button>
					</DialogActions>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default CommentsModal;
