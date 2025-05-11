import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile?.uid) return;

      setIsLoading(true);
      setPosts([]);

      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        const querySnapshot = await getDocs(q);

        const userPosts = [];
        querySnapshot.forEach((doc) => {
          userPosts.push({ id: doc.id, ...doc.data() });
        });

        userPosts.sort(
          (a, b) =>
            (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        );

        setPosts(userPosts);
      } catch (error) {
        showToast("Error fetching posts: " + error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [userProfile?.uid, setPosts, showToast]);

  return { isLoading, posts };
};

export default useGetUserPosts;
