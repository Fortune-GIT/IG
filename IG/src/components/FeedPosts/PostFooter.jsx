import {
	Box,
	Button,
	Typography,
	InputBase,
	IconButton,
	InputAdornment,
	Stack,
} from "@mui/material";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
	const { isCommenting, handlePostComment } = usePostComment();
	const [comment, setComment] = useState("");
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { handleLikePost, isLiked, likes } = useLikePost(post);
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmitComment = async () => {
		await handlePostComment(post.id, comment);
		setComment("");
	};

	return (
		<Box mb={5} mt="auto">
			<Stack direction="row" spacing={2} alignItems="center" mt={2} mb={1}>
				<Box onClick={handleLikePost} sx={{ cursor: "pointer", fontSize: 18 }}>
					{!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
				</Box>

				<Box
					sx={{ cursor: "pointer", fontSize: 18 }}
					onClick={() => commentRef.current?.focus()}
				>
					<CommentLogo />
				</Box>
			</Stack>

			<Typography fontWeight={600} fontSize={14}>
				{likes} likes
			</Typography>

			{isProfilePage && (
				<Typography fontSize={12} color="text.secondary">
					Posted {timeAgo(post.createdAt)}
				</Typography>
			)}

			{!isProfilePage && (
				<>
					<Typography fontSize={14} fontWeight={700}>
						{creatorProfile?.username}{" "}
						<Typography component="span" fontWeight={400}>
							{post.caption}
						</Typography>
					</Typography>

					{post.comments.length > 0 && (
						<Typography
							fontSize={14}
							color="text.secondary"
							sx={{ cursor: "pointer" }}
							onClick={() => setIsOpen(true)}
						>
							View all {post.comments.length} comments
						</Typography>
					)}

					{isOpen && (
						<CommentsModal isOpen={isOpen} onClose={() => setIsOpen(false)} post={post} />
					)}
				</>
			)}

			{authUser && (
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mt={2}
					spacing={2}
				>
					<InputBase
						placeholder="Add a comment..."
						inputRef={commentRef}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						fullWidth
						sx={{
							borderBottom: "1px solid gray",
							fontSize: 14,
							px: 1,
						}}
						endAdornment={
							<InputAdornment position="end">
								<Button
									onClick={handleSubmitComment}
									sx={{
										color: "primary.main",
										fontSize: 14,
										fontWeight: 600,
										textTransform: "none",
										bg: "transparent",
										"&:hover": {
											color: "white",
											background: "transparent",
										},
									}}
									disabled={isCommenting}
								>
									Post
								</Button>
							</InputAdornment>
						}
					/>
				</Stack>
			)}
		</Box>
	);
};

export default PostFooter;
