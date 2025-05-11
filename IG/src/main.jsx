import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ToastProvider } from "./context/ToastContext"; // adjust path as needed

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#000",
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<ToastProvider>
					<App />
				</ToastProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
