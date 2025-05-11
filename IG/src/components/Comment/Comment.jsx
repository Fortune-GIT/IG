import {
	Avatar,
	Box,
	Typography,
	Stack,
	Skeleton,
} from "@mui/material";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const Comment = ({ comment }) => {
	const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);

	if (isLoading || !userProfile) return <CommentSkeleton />;

	const timestamp = comment.createdAt;

	const timeDisplay =
		timestamp?.seconds
			? timeAgo(new Date(timestamp.seconds * 1000))
			: timeAgo(new Date(timestamp)); // fallback for plain JS date

	return (
		<Stack direction="row" spacing={2} alignItems="flex-start" width="100%">
			<Link to={`/${userProfile.username}`}>
				<Avatar
					src={userProfile.profilePicURL}
					alt={userProfile.username}
					sx={{ width: 32, height: 32 }}
				/>
			</Link>

			<Box>
				<Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
					<Link to={`/${userProfile.username}`}>
						<Typography fontWeight="bold" fontSize={12}>
							{userProfile.username}
						</Typography>
					</Link>
					<Typography fontSize={14}>{comment.comment}</Typography>
				</Stack>

				<Typography fontSize={12} color="text.secondary" mt={0.5}>
					{timeDisplay}
				</Typography>
			</Box>
		</Stack>
	);
};

export default Comment;

const CommentSkeleton = () => {
	return (
		<Stack direction="row" spacing={2} alignItems="center" width="100%">
			<Skeleton variant="circular" width={32} height={32} />
			<Stack spacing={0.5}>
				<Skeleton variant="rectangular" width={100} height={10} />
				<Skeleton variant="rectangular" width={60} height={10} />
			</Stack>
		</Stack>
	);
};
