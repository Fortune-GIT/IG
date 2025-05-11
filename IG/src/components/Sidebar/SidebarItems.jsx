import { Stack } from "@mui/material";
import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = () => {
  return (
    <Stack spacing={2}>
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <ProfileLink />
    </Stack>
  );
};

export default SidebarItems;
