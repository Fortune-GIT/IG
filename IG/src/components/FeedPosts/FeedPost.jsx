import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const q = query(
      collection(firestore, "posts", post.id, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(results);
    });

    return () => unsubscribe();
  }, [post.id]);

  const handlePostComment = async () => {
    if (!commentInput.trim()) return;
    setIsPosting(true);
    try {
      await addDoc(collection(firestore, "posts", post.id, "comments"), {
        text: commentInput.trim(),
        createdAt: serverTimestamp(),
        userId: authUser.uid,
        username: authUser.username,
        avatar: authUser.profilePicURL || "",
      });
      setCommentInput("");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card sx={{ mb: 4 }}>
      <PostHeader post={post} creatorProfile={userProfile} />
      <CardMedia
        component="img"
        height="400"
        image={post.imageURL}
        alt="Feed post"
      />
      <CardContent>
        <PostFooter post={post} creatorProfile={userProfile} />

        <Stack spacing={1} mt={2}>
          {comments.map((comment) => (
            <Stack direction="row" spacing={1} alignItems="center" key={comment.id}>
              <Avatar src={comment.avatar} sx={{ width: 24, height: 24 }} />
              <Typography variant="body2" fontWeight="bold">
                {comment.username}
              </Typography>
              <Typography variant="body2">{comment.text}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FeedPost;