import { Box, CircularProgress } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

// Wraps every page with consistent layout — Sidebar (when logged in), Navbar (when logged out)

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);

  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";
  const checkingUserIsAuth = !user && loading;

  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <Box
      display="flex"
      flexDirection={canRenderNavbar ? "column" : "row"}
      height="100vh"
    >
      {/* Sidebar */}
      {canRenderSidebar && (
        <Box
          sx={{
            width: { xs: "70px", md: "240px" },
            flexShrink: 0,
          }}
        >
          <Sidebar />
        </Box>
      )}

      {/* Navbar */}
      {canRenderNavbar && <Navbar />}

      {/* Page content */}
      <Box
        flex={1}
        sx={{
          width: {
            xs: "calc(100% - 70px)",
            md: "calc(100% - 240px)",
          },
          mx: "auto",
          p: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={48} />
    </Box>
  );
};
