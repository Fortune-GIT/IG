import {
	AppBar,
	Box,
	Button,
	Container,
	Toolbar,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
	const theme = useTheme();
	const isSmallUp = useMediaQuery(theme.breakpoints.up("sm"));

	return (
		<AppBar
			position="static"
			elevation={0}
			sx={{
				bgcolor: "transparent",
				boxShadow: "none",
				mt: 2,
			}}
		>
			<Container maxWidth="lg">
				<Toolbar
					sx={{
						justifyContent: isSmallUp ? "space-between" : "center",
						alignItems: "center",
						px: 0,
					}}
				>
					{isSmallUp && (
						<Box
							component="img"
							src="/logo.png"
							alt="Logo"
							sx={{ height: 80, cursor: "pointer", display: { xs: "none", sm: "block" } }}
						/>
					)}

					<Box sx={{ display: "flex", gap: 2 }}>
						<Link to="/auth">
							<Button variant="contained" size="small" color="primary">
								Login
							</Button>
						</Link>
						<Link to="/auth">
							<Button variant="outlined" size="small" color="primary">
								Signup
							</Button>
						</Link>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
