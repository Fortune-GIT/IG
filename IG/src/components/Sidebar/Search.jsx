import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	TextField,
	Tooltip,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { SearchLogo } from "../../assets/constants";
import { useRef, useState } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = () => {
	const [open, setOpen] = useState(false);
	const searchRef = useRef(null);
	const { user, isLoading, getUserProfile, setUser } = useSearchUser();

	const handleSearchUser = (e) => {
		e.preventDefault();
		getUserProfile(searchRef.current.value);
	};

	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<>
			<Tooltip title="Search" placement="right" arrow enterDelay={500}>
				<Box
					onClick={() => setOpen(true)}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						p: 1.5,
						cursor: "pointer",
						borderRadius: 2,
						width: { xs: 40, md: "100%" },
						justifyContent: { xs: "center", md: "flex-start" },
						"&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
					}}
				>
					<SearchLogo />
					<Box sx={{ display: { xs: "none", md: "block" } }}>Search</Box>
				</Box>
			</Tooltip>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="xs"
				fullWidth
				PaperProps={{
					sx: {
						bgcolor: "black",
						border: "1px solid gray",
					},
				}}
			>
				<DialogTitle sx={{ color: "white" }}>
					Search User
					<IconButton
						onClick={() => setOpen(false)}
						sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
					>
						<Close />
					</IconButton>
				</DialogTitle>

				<DialogContent>
					<form onSubmit={handleSearchUser}>
						<TextField
							fullWidth
							label="Username"
							placeholder="Enter username"
							inputRef={searchRef}
							variant="outlined"
							size="small"
							sx={{
								input: { color: "white" },
								label: { color: "white" },
							}}
						/>
						<DialogActions sx={{ px: 0, mt: 2 }}>
							<Button
								type="submit"
								variant="contained"
								size="small"
								disabled={isLoading}
								fullWidth
							>
								Search
							</Button>
						</DialogActions>
					</form>

					{user && <Box mt={3}><SuggestedUser user={user} setUser={setUser} /></Box>}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Search;
