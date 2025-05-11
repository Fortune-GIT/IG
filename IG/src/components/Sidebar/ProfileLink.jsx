import { Avatar, Box, Tooltip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
	const authUser = useAuthStore((state) => state.user);

	return (
		<Tooltip
			title="Profile"
			placement="right"
			arrow
			enterDelay={500}
		>
			<Box
				component={RouterLink}
				to={`/${authUser?.username}`}
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
					p: 1.5,
					borderRadius: 2,
					width: { xs: 40, md: "100%" },
					justifyContent: { xs: "center", md: "flex-start" },
					color: "inherit",
					textDecoration: "none",
					"&:hover": {
						backgroundColor: "rgba(255,255,255,0.1)",
					},
				}}
			>
				<Avatar
					src={authUser?.profilePicURL || ""}
					sx={{ width: 32, height: 32 }}
				/>
				<Box sx={{ display: { xs: "none", md: "block" } }}>Profile</Box>
			</Box>
		</Tooltip>
	);
};

export default ProfileLink;
