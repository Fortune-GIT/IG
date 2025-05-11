import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";

const ProfileTabs = () => {
	const theme = useTheme();
	const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

	const tabStyle = {
		display: "flex",
		alignItems: "center",
		p: 2,
		gap: 1,
		cursor: "pointer",
		textTransform: "uppercase",
		fontWeight: "bold",
	};

	return (
		<Stack
			direction="row"
			justifyContent="center"
			width="100%"
			spacing={isSmUp ? 10 : 4}
			sx={{ textTransform: "uppercase", fontWeight: "bold" }}
		>
			<Box sx={{ ...tabStyle, borderTop: "1px solid white" }}>
				<BsGrid3X3 size={20} />
				{isSmUp && (
					<Typography fontSize={12}>Posts</Typography>
				)}
			</Box>

			<Box sx={tabStyle}>
				<BsBookmark size={20} />
				{isSmUp && (
					<Typography fontSize={12}>Saved</Typography>
				)}
			</Box>

			<Box sx={tabStyle}>
				<BsSuitHeart size={20} />
				{isSmUp && (
					<Typography fontSize={12}>Likes</Typography>
				)}
			</Box>
		</Stack>
	);
};

export default ProfileTabs;
