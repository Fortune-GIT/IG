import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#000000",
			paper: "#121212",
		},
		text: {
			primary: "#ffffff",
			secondary: "#b0b0b0",
		},
		primary: {
			main: "#3182CE", // Chakra blue.500
		},
		secondary: {
			main: "#E53E3E", // Chakra red.500
		},
	},
	typography: {
		fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif"`,
		h1: {
			fontSize: "2.25rem",
			fontWeight: 700,
		},
		h2: {
			fontSize: "1.75rem",
			fontWeight: 600,
		},
		body1: {
			fontSize: "1rem",
		},
		body2: {
			fontSize: "0.875rem",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: "8px",
				},
			},
			defaultProps: {
				variant: "contained",
				color: "primary",
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
				},
			},
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	spacing: 8, // 1 spacing unit = 8px
});

export default theme;
