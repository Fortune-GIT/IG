import {
  Box,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  // Optional: loading skeleton could go here
  if (isLoading) return null;

  return (
    <Stack py={4} px={3} spacing={2}>
      <SuggestedHeader />

      {suggestedUsers.length !== 0 && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography fontSize={12} fontWeight="bold" color="text.secondary">
            Suggested for you
          </Typography>
          <Typography
            fontSize={12}
            fontWeight="bold"
            sx={{ cursor: "pointer", "&:hover": { color: "text.primary" } }}
          >
            See All
          </Typography>
        </Box>
      )}

      {suggestedUsers.map((user) => (
        <SuggestedUser key={user.id} user={user} />
      ))}

      <Typography
        variant="body2"
        fontSize={12}
        color="text.secondary"
        mt={3}
        alignSelf="flex-start"
      >
        © 2025 Built By FORTUNE U ANOSIKE
      </Typography>
    </Stack>
  );
};

export default SuggestedUsers;
