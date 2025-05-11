import {
  Box,
  Grid,
  Stack,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../../hooks/useGetUserPosts";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const noPostsFound = !isLoading && posts.length === 0;
  if (noPostsFound) return <NoPostsFound />;

  return (
    <Box
      display="grid"
      gap={theme.spacing(1)}
      gridTemplateColumns={isMdUp ? "repeat(3, 1fr)" : "repeat(1, 1fr)"}
    >
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <Box key={idx}>
            <Stack alignItems="flex-start" spacing={2}>
              <Skeleton variant="rectangular" width="100%">
                <Box height="300px">contents wrapped</Box>
              </Skeleton>
            </Stack>
          </Box>
        ))}

      {!isLoading &&
        posts.map((post) => (
          <Box key={post.id}>
            <ProfilePost post={post} />
          </Box>
        ))}
    </Box>
  );
};

export default ProfilePosts;

const NoPostsFound = () => {
  return (
    <Box display="flex" flexDirection="column" textAlign="center" mt={10} mx="auto">
      <Typography variant="h5">No Posts Found 🤔</Typography>
    </Box>
  );
};
