import {
  Avatar,
  Button,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";
import useAuthStore from "../../store/authStore";

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);
  const authUser = useAuthStore((state) => state.user);

  const createdAtDate =
    post?.createdAt?.toDate?.() instanceof Date
      ? post.createdAt.toDate()
      : null;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      my={2}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {creatorProfile ? (
          <Link to={`/${creatorProfile.username}`}>
            <Avatar
              src={creatorProfile.profilePicURL}
              alt="user profile pic"
              sx={{ width: 32, height: 32 }}
            />
          </Link>
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}

        <Stack direction="row" spacing={1} alignItems="center">
          {creatorProfile ? (
            <Link to={`/${creatorProfile.username}`}>
              <Typography fontSize={12} fontWeight="bold">
                {creatorProfile.username}
              </Typography>
            </Link>
          ) : (
            <Skeleton variant="rectangular" width={100} height={10} />
          )}

          <Typography fontSize={12} color="text.secondary">
            • {createdAtDate ? timeAgo(createdAtDate) : "Just now"}
          </Typography>
        </Stack>
      </Stack>

      {/* Follow/Unfollow button — hide if post is by auth user */}
      {authUser?.uid !== post.createdBy && (
        <Button
          size="small"
          variant="text"
          disabled={isUpdating}
          sx={{
            fontSize: 12,
            fontWeight: "bold",
            color: "primary.main",
            textTransform: "none",
            minWidth: 0,
            "&:hover": {
              color: "white",
              backgroundColor: "transparent",
            },
            transition: "0.2s ease-in-out",
          }}
          onClick={handleFollowUser}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Stack>
  );
};

export default PostHeader;
