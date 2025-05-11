import { Box, Button, Tooltip, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

	return (
		<Box
			sx={{
				height: "100vh",
				borderRight: "1px solid rgba(255,255,255,0.2)",
				py: 4,
				px: { xs: 1, md: 3 },
				position: "sticky",
				top: 0,
				left: 0,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "100%",
					gap: 4,
				}}
			>
				{/* Logo */}
				<Box
					component={RouterLink}
					to="/"
					sx={{
						display: { xs: "none", md: "block" },
						pl: 1,
						cursor: "pointer",
					}}
				>
					<InstagramLogo />
				</Box>

				<Box
					component={RouterLink}
					to="/"
					sx={{
						display: { xs: "block", md: "none" },
						p: 1,
						width: 40,
						borderRadius: 2,
						cursor: "pointer",
						"&:hover": {
							backgroundColor: "rgba(255,255,255,0.2)",
						},
					}}
				>
					<InstagramMobileLogo />
				</Box>

				{/* Navigation Items */}
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<SidebarItems />
				</Box>

				{/* Logout */}
				<Tooltip title="Logout" placement="right" arrow enterDelay={500}>
					<Box
						onClick={handleLogout}
						sx={{
							mt: "auto",
							display: "flex",
							alignItems: "center",
							gap: 2,
							p: 1.5,
							borderRadius: 2,
							width: { xs: 40, md: "100%" },
							cursor: "pointer",
							justifyContent: { xs: "center", md: "flex-start" },
							"&:hover": {
								backgroundColor: "rgba(255,255,255,0.2)",
							},
						}}
					>
						<BiLogOut size={25} />
						{isMdUp && (
							<Button
								variant="text"
								color="inherit"
								sx={{ textTransform: "none", ml: 1 }}
								disabled={isLoggingOut}
							>
								Logout
							</Button>
						)}
					</Box>
				</Tooltip>
			</Box>
		</Box>
	);
};

export default Sidebar;
