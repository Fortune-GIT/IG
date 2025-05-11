import { Box, Typography, Divider, Stack, Button } from "@mui/material";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<>
			<Box
				sx={{
					border: "1px solid gray",
					borderRadius: 2,
					p: 3,
					backgroundColor: "background.paper",
				}}
			>
				<Stack spacing={3} alignItems="center">
					<Box
						component="img"
						src="/logo.png"
						alt="Instagram"
						sx={{ height: 96, cursor: "pointer" }}
					/>

					{isLogin ? <Login /> : <Signup />}

					{/* ---------------- OR -------------- */}
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							width: "100%",
							my: 2,
							gap: 1,
						}}
					>
						<Divider sx={{ flex: 2, bgcolor: "grey.500" }} />
						<Typography variant="body2" sx={{ color: "text.primary" }}>
							OR
						</Typography>
						<Divider sx={{ flex: 2, bgcolor: "grey.500" }} />
					</Box>

					<GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
				</Stack>
			</Box>

			<Box
				sx={{
					border: "1px solid gray",
					borderRadius: 2,
					p: 2,
					mt: 2,
					textAlign: "center",
				}}
			>
				<Typography variant="body2" component="span" sx={{ mr: 1 }}>
					{isLogin ? "Don't have an account?" : "Already have an account?"}
				</Typography>
				<Button
					variant="text"
					color="primary"
					onClick={() => setIsLogin(!isLogin)}
					sx={{ textTransform: "none", fontSize: 14 }}
				>
					{isLogin ? "Sign up" : "Log in"}
				</Button>
			</Box>
		</>
	);
};

export default AuthForm;
