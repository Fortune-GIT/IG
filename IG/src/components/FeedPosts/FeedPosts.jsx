import {
  Box,
  Container,
  Skeleton,
  Typography,
  Avatar,
  Stack,
  Card,
} from "@mui/material";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      {isLoading &&
        [0, 1, 2].map((idx) => (
          <Stack spacing={2} key={idx} mb={4}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
              <Stack spacing={1}>
                <Skeleton variant="text" width={160} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </Stack>
            </Stack>
            <Skeleton variant="rectangular" height={400} />
          </Stack>
        ))}

      {!isLoading && posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}

      {!isLoading && posts.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography color="error" variant="body1">
            Dayuum. Looks like you don&apos;t have any friends.
          </Typography>
          <Typography color="error">Stop coding and go make some!!</Typography>
        </Box>
      )}
    </Container>
  );
};

export default FeedPosts;