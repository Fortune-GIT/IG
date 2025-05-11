import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async ({ email, password }) => {
    if (!email || !password) {
      showToast("Error", "Please fill all fields", "error");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(email, password);
      if (!userCred?.user?.uid) {
        showToast("Error", "Login failed. Please try again.", "error");
        return;
      }

      const userDocRef = doc(firestore, "users", userCred.user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        showToast("Error", "User record not found in database", "error");
        return;
      }

      const userData = { id: userSnap.id, ...userSnap.data() };
      localStorage.setItem("user-info", JSON.stringify(userData));
      loginUser(userData);
      showToast("Success", "Logged in successfully", "success");
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };

  return { loading, error, login };
};

export default useLogin;
