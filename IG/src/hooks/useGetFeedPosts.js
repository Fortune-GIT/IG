import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);

      try {
        let feedPosts = [];

        if (!authUser) {
          setPosts([]);
          return;
        }

        const allUIDs = [authUser.uid, ...(authUser.following || [])];

        const uidChunks = [];
        for (let i = 0; i < allUIDs.length; i += 10) {
          uidChunks.push(allUIDs.slice(i, i + 10));
        }

        for (const chunk of uidChunks) {
          const q = query(
            collection(firestore, "posts"),
            where("createdBy", "in", chunk)
          );

          const snapshot = await getDocs(q);
          snapshot.forEach((doc) => {
            feedPosts.push({ id: doc.id, ...doc.data() });
          });
        }

        feedPosts.sort(
          (a, b) => b.createdAt?.seconds - a.createdAt?.seconds
        );

        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getFeedPosts();
  }, [authUser, setPosts, showToast, setUserProfile]);

  return { isLoading, posts };
};

export default useGetFeedPosts;
