import { Box, Tooltip } from "@mui/material";
import { NotificationsLogo } from "../../assets/constants";

const Notifications = () => {
	return (
		<Tooltip
			title="Notifications"
			placement="right"
			arrow
			enterDelay={500}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
					p: 1.5,
					borderRadius: 2,
					width: { xs: 40, md: "100%" },
					justifyContent: { xs: "center", md: "flex-start" },
					cursor: "pointer",
					color: "inherit",
					textDecoration: "none",
					"&:hover": {
						backgroundColor: "rgba(255, 255, 255, 0.1)",
					},
				}}
			>
				<NotificationsLogo />
				<Box sx={{ display: { xs: "none", md: "block" } }}>Notifications</Box>
			</Box>
		</Tooltip>
	);
};

export default Notifications;
