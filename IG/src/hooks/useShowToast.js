// src/hooks/useShowToast.js
import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

const useShowToast = () => {
	const { showToast } = useContext(ToastContext);
	return showToast;
};

export default useShowToast;
