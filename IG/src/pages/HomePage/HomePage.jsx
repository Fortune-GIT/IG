import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
	const theme = useTheme();
	const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

	return (
		<Container maxWidth="lg">
			<Box
				display="flex"
				gap={5}
				flexDirection="row"
				justifyContent="space-between"
			>
				{/* Feed section */}
				<Box flex={2} sx={{ py: 5 }}>
					<FeedPosts />
				</Box>

				{/* Suggested Users */}
				{isLgUp && (
					<Box
						flex={3}
						sx={{
							maxWidth: 300,
							display: { xs: "none", lg: "block" },
							mr: 5,
						}}
					>
						<SuggestedUsers />
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default HomePage;
