import {
  Avatar,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";

const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Link to={`/${authUser.username}`}>
          <Avatar src={authUser.profilePicURL} sx={{ width: 48, height: 48 }} />
        </Link>
        <Link to={`/${authUser.username}`}>
          <Typography fontSize={12} fontWeight="bold" color="text.primary">
            {authUser.username}
          </Typography>
        </Link>
      </Box>

      <Button
        onClick={handleLogout}
        disabled={isLoggingOut}
        size="small"
        variant="text"
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: "primary.main",
          textTransform: "none",
        }}
      >
        {isLoggingOut ? <CircularProgress size={16} /> : "Log out"}
      </Button>
    </Box>
  );
};

export default SuggestedHeader;
