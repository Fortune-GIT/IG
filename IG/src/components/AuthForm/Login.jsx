import {
	TextField,
	Button,
	Alert,
	AlertTitle,
	CircularProgress,
	Box,
} from "@mui/material";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { loading, error, login } = useLogin();

	return (
		<>
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
				label="Password"
				type="password"
				variant="outlined"
				size="small"
				fullWidth
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
				sx={{ fontSize: 14, mb: 2 }}
			/>

			{error && (
				<Alert severity="error" sx={{ fontSize: 13, py: 1, borderRadius: 1, mb: 2 }}>
					<AlertTitle sx={{ fontSize: 13 }}>{error.message}</AlertTitle>
				</Alert>
			)}

			<Button
				variant="contained"
				color="primary"
				fullWidth
				size="small"
				disabled={loading}
				sx={{ fontSize: 14 }}
				onClick={() => login(inputs)}
			>
				{loading ? <CircularProgress size={20} color="inherit" /> : "Log in"}
			</Button>
		</>
	);
};

export default Login;
