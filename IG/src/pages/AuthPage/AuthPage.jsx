import {
	Box,
	Container,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<Box
			minHeight="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
			px={2}
		>
			<Container maxWidth="md" disableGutters>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap={5}
					flexWrap="wrap"
				>
					{/* Left-hand side image */}
					{isMdUp && (
						<Box>
							<Box
								component="img"
								src="/auth.png"
								alt="Phone img"
								sx={{ height: 650 }}
							/>
						</Box>
					)}

					{/* Right-hand side */}
					<Stack spacing={3} alignItems="center" width="100%" maxWidth={400}>
						<AuthForm />

						<Typography variant="body2" align="center">
							Get the app.
						</Typography>

						<Box display="flex" gap={2} justifyContent="center">
							<Box
								component="img"
								src="/playstore.png"
								alt="Playstore logo"
								sx={{ height: 40 }}
							/>
							<Box
								component="img"
								src="/microsoft.png"
								alt="Microsoft logo"
								sx={{ height: 40 }}
							/>
						</Box>
					</Stack>
				</Box>
			</Container>
		</Box>
	);
};

export default AuthPage;
