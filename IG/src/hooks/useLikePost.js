import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useLikePost = (post) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const [likes, setLikes] = useState(post.likes ?? []);
	const [isLiked, setIsLiked] = useState(post.likes?.includes(authUser?.uid));
	const showToast = useShowToast();

	const handleLikePost = async () => {
		if (isUpdating) return;

		if (!authUser) {
			showToast("Error", "You must be logged in to like a post");
			return;
		}

		setIsUpdating(true);

		try {
			const postRef = doc(firestore, "posts", post.id);
			await updateDoc(postRef, {
				likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
			});

			setIsLiked(!isLiked);
			setLikes((prev) =>
				isLiked ? prev.filter((id) => id !== authUser.uid) : [...prev, authUser.uid]
			);
		} catch (error) {
			showToast("Error", error.message);
		} finally {
			setIsUpdating(false);
		}
	};

	return { isLiked, likes: likes.length, handleLikePost, isUpdating };
};

export default useLikePost;
