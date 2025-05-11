import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../Comment/Caption";

const ProfilePost = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      setIsDeleting(true);

      // Delete image from storage
      const imageRef = ref(storage, `posts/${post.id}`);
      try {
        await deleteObject(imageRef);
      } catch (err) {
        console.warn("Image already deleted or not found:", err.message);
      }

      // Delete post from Firestore
      await deleteDoc(doc(firestore, "posts", post.id));

      // Remove post ref from user document
      const userRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      // Update UI
      deletePost(post.id);
      decrementPostsCount(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Thumbnail Grid Post */}
      <Box
        onClick={() => setIsOpen(true)}
        sx={{
          cursor: "pointer",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "rgba(255,255,255,0.2)",
          position: "relative",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "black",
        }}
      >
        {/* Overlay Icons */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0,0,0,0.5)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            "&:hover": {
              opacity: 1,
            },
            zIndex: 1,
          }}
        >
          <Box display="flex" alignItems="center">
            <AiFillHeart size={20} />
            <Typography fontWeight="bold" ml={1}>
              {post.likes.length}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <FaComment size={20} />
            <Typography fontWeight="bold" ml={1}>
              {post.comments.length}
            </Typography>
          </Box>
        </Box>

        {/* Post Thumbnail Image */}
        <Box
          component="img"
          src={post.imageURL}
          alt="profile post"
          onError={(e) => {
            e.target.src = "/fallback-image.png"; // Optional fallback
          }}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      {/* Expanded Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="xl">
        <DialogContent sx={{ bgcolor: "black", p: 3 }}>
          <Box
            display="flex"
            flexDirection={isMdUp ? "row" : "column"}
            gap={4}
            mx="auto"
            width="100%"
            maxHeight="90vh"
          >
            {/* Left: Image */}
            <Box
              sx={{
                flex: 1.5,
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={post.imageURL}
                alt="profile post"
                sx={{ width: "100%", height: "auto", maxHeight: "90vh" }}
              />
            </Box>

            {/* Right: Comments + Controls */}
            {isMdUp && (
              <Box flex={1} display="flex" flexDirection="column" px={4}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={userProfile.profilePicURL} sx={{ width: 30, height: 30 }} />
                    <Typography fontWeight="bold" fontSize={12}>
                      {userProfile.username}
                    </Typography>
                  </Box>

                  {authUser?.uid === userProfile.uid && (
                    <IconButton
                      onClick={handleDeletePost}
                      sx={{ color: "white", "&:hover": { color: "red.600" } }}
                      disabled={isDeleting}
                    >
                      <MdDelete size={20} />
                    </IconButton>
                  )}
                </Box>

                <Divider sx={{ my: 2, bgcolor: "gray" }} />

                {/* Comments */}
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  maxHeight="350px"
                  overflowY="auto"
                >
                  {post.caption && <Caption post={post} />}
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </Box>

                <Divider sx={{ my: 2, bgcolor: "gray" }} />
                <PostFooter isProfilePage={true} post={post} />
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePost;
