import {
  Box,
  Container,
  Stack,
  Typography,
  Skeleton,
  Link as MuiLink,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";

const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);

  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box
        sx={{
          py: 10,
          px: 4,
          pl: { md: 10 },
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Box>

      <Box
        sx={{
          px: { xs: 2, sm: 4 },
          mx: "auto",
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Box>
    </Container>
  );
};

export default ProfilePage;

const ProfileHeaderSkeleton = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={isSmDown ? "column" : "row"}
      spacing={4}
      py={5}
      justifyContent="center"
      alignItems="center"
    >
      <Skeleton variant="circular" width={96} height={96} />
      <Stack spacing={1} alignItems={isSmDown ? "center" : "flex-start"} flex={1}>
        <Skeleton variant="text" width={150} height={20} />
        <Skeleton variant="text" width={100} height={18} />
      </Stack>
    </Stack>
  );
};


const UserNotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      textAlign="center"
      mx="auto"
      mt={4}
    >
      <Typography variant="h5">User Not Found</Typography>
      <MuiLink
        component={RouterLink}
        to="/"
        color="primary"
        sx={{ mt: 1, mx: "auto", width: "max-content" }}
        underline="hover"
      >
        Go home
      </MuiLink>
    </Box>
  );
};
