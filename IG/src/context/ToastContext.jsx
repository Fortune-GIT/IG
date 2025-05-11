// src/context/ToastContext.jsx
import React, { createContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
	const [toast, setToast] = useState({
		open: false,
		message: "",
		severity: "info",
	});

	const showToast = useCallback((message, severity = "info") => {
		setToast({
			open: true,
			message,
			severity,
		});
	}, []);

	const handleClose = () => {
		setToast((prev) => ({ ...prev, open: false }));
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<Snackbar
				open={toast.open}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleClose}
					severity={toast.severity}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{toast.message}
				</Alert>
			</Snackbar>
		</ToastContext.Provider>
	);
};
