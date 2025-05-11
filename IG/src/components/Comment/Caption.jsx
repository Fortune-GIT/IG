import { Avatar, Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import useUserProfileStore from "../../store/userProfileStore";

const Caption = ({ post }) => {
	const userProfile = useUserProfileStore((state) => state.userProfile);

	return (
		<Stack direction="row" spacing={2}>
			<Link to={`/${userProfile.username}`}>
				<Avatar
					src={userProfile.profilePicURL}
					sx={{ width: 32, height: 32 }}
				/>
			</Link>
			<Box>
				<Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
					<Link to={`/${userProfile.username}`}>
						<Typography fontWeight="bold" fontSize={12}>
							{userProfile.username}
						</Typography>
					</Link>
					<Typography fontSize={14}>{post.caption}</Typography>
				</Stack>
				<Typography fontSize={12} color="text.secondary">
					{timeAgo(post.createdAt)}
				</Typography>
			</Box>
		</Stack>
	);
};

export default Caption;
