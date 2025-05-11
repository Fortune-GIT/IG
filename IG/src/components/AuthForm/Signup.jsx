import {
	TextField,
	Button,
	InputAdornment,
	IconButton,
	Alert,
	AlertTitle,
	CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const { loading, error, signup } = useSignUpWithEmailAndPassword();

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		await signup(inputs);
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label="Email"
				type="email"
				variant="outlined"
				size="small"
				fullWidth
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
				sx={{ fontSize: 14, mb: 2 }}
			/>

			<TextField
				label="Username"
				type="text"
				variant="outlined"
				size="small"
				fullWidth
				value={inputs.username}
				onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
				sx={{ fontSize: 14, mb: 2 }}
			/>

			<TextField
				label="Full Name"
				type="text"
				variant="outlined"
				size="small"
				fullWidth
				value={inputs.fullName}
				onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
				sx={{ fontSize: 14, mb: 2 }}
			/>

			<TextField
				label="Password"
				type={showPassword ? "text" : "password"}
				variant="outlined"
				size="small"
				fullWidth
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
				sx={{ fontSize: 14, mb: 2 }}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={() => setShowPassword(!showPassword)}
								edge="end"
								size="small"
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			{error && (
				<Alert severity="error" sx={{ fontSize: 13, py: 1, borderRadius: 1, mb: 2 }}>
					<AlertTitle sx={{ fontSize: 13 }}>Signup Error</AlertTitle>
					{error.message}
				</Alert>
			)}

			<Button
				type="submit"
				variant="contained"
				color="primary"
				fullWidth
				size="small"
				disabled={loading}
				sx={{ fontSize: 14 }}
			>
				{loading ? <CircularProgress size={20} color="inherit" /> : "Sign Up"}
			</Button>
		</form>
	);
};

export default Signup;
