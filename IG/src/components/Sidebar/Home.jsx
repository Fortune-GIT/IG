import { Box, Tooltip } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
	return (
		<Tooltip
			title="Home"
			placement="right"
			arrow
			enterDelay={500}
		>
			<Box
				component={RouterLink}
				to="/"
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
						backgroundColor: "rgba(255, 255, 255, 0.1)",
					},
				}}
			>
				<AiFillHome size={25} />
				<Box sx={{ display: { xs: "none", md: "block" } }}>Home</Box>
			</Box>
		</Tooltip>
	);
};

export default Home;
