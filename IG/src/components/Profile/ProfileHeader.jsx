import {
	Avatar,
	AvatarGroup,
	Box,
	Button,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import { useState } from "react";
import { timeAgo } from "../../utils/timeAgo";

const ProfileHeader = () => {
	const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);

	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

	const [isOpen, setIsOpen] = useState(false);
	const theme = useTheme();
	const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

	let joinedText = "";
	if (userProfile?.createdAt?.seconds) {
		const dateObj = new Date(userProfile.createdAt.seconds * 1000);
		joinedText = `Joined ${timeAgo(dateObj)}`;
	}

	return (
		<Stack
			direction={isSmUp ? "row" : "column"}
			spacing={isSmUp ? 10 : 4}
			py={5}
		>
			<AvatarGroup
				sx={{
					alignSelf: isSmUp ? "flex-start" : "center",
					mx: isSmUp ? 0 : "auto",
				}}
			>
				<Avatar
					src={userProfile.profilePicURL}
					alt="Profile pic"
					sx={{ width: isSmUp ? 80 : 64, height: isSmUp ? 80 : 64 }}
				/>
			</AvatarGroup>

			<Stack spacing={1} flex={1} mx="auto">
				<Stack
					direction={isSmUp ? "row" : "column"}
					spacing={2}
					alignItems="center"
					justifyContent={isSmUp ? "flex-start" : "center"}
					width="100%"
				>
					<Typography fontSize={isSmUp ? "1.25rem" : "1rem"}>
						{userProfile.username}
					</Typography>

					{visitingOwnProfileAndAuth && (
						<Button
							variant="contained"
							size={isSmUp ? "small" : "extraSmall"}
							onClick={() => setIsOpen(true)}
							sx={{
								bgcolor: "white",
								color: "black",
								"&:hover": { bgcolor: "rgba(255,255,255,0.8)" },
							}}
						>
							Edit Profile
						</Button>
					)}

					{visitingAnotherProfileAndAuth && (
						<Button
							variant="contained"
							size={isSmUp ? "small" : "extraSmall"}
							onClick={handleFollowUser}
							disabled={isUpdating}
							sx={{
								bgcolor: "primary.main",
								color: "white",
								"&:hover": { bgcolor: "primary.dark" },
							}}
						>
							{isFollowing ? "Unfollow" : "Follow"}
						</Button>
					)}
				</Stack>

				<Stack direction="row" spacing={4} alignItems="center">
					<Typography fontSize="0.9rem">
						<strong>{userProfile.posts?.length || 0}</strong> Posts
					</Typography>
					<Typography fontSize="0.9rem">
						<strong>{userProfile.followers?.length || 0}</strong> Followers
					</Typography>
					<Typography fontSize="0.9rem">
						<strong>{userProfile.following?.length || 0}</strong> Following
					</Typography>
				</Stack>

				<Typography fontSize="0.95rem" fontWeight="bold">
					{userProfile.fullName}
				</Typography>
				<Typography fontSize="0.9rem">{userProfile.bio}</Typography>

				{joinedText && (
					<Typography fontSize="0.8rem" color="text.secondary">
						{joinedText}
					</Typography>
				)}
			</Stack>

			{isOpen && <EditProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />}
		</Stack>
	);
};

export default ProfileHeader;
