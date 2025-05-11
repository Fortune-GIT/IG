import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

const SuggestedUser = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((f) => f.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Link to={`/${user.username}`}>
          <Avatar src={user.profilePicURL} sx={{ width: 40, height: 40 }} />
        </Link>

        <Stack spacing={0.5} alignItems="flex-start">
          <Link to={`/${user.username}`}>
            <Typography fontSize={12} fontWeight="bold">
              {user.fullName}
            </Typography>
          </Link>
          <Typography fontSize={11} color="text.secondary">
            {user.followers.length} followers
          </Typography>
        </Stack>
      </Box>

      {authUser.uid !== user.uid && (
        <Button
          onClick={onFollowUser}
          disabled={isUpdating}
          variant="text"
          size="small"
          sx={{
            fontSize: 13,
            fontWeight: 500,
            color: "primary.main",
            textTransform: "none",
            minWidth: 0,
            padding: 0,
            "&:hover": {
              color: "text.primary",
              background: "transparent",
            },
          }}
        >
          {isUpdating ? <CircularProgress size={14} /> : isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Box>
  );
};

export default SuggestedUser;
