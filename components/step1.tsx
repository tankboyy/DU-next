import {
	Box,
	Button,
	Chip,
	ImageList,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import KsjTimer from "./ksjTimer";
import Link from "next/link";
import AdminGame from "./admin/adminGame";

export interface Step {
	friends: string[];
	players: string[];
	search: string;
	userIds: string[];
	cho: string[];

	handleDelete(friend: string): void;

	userSelection(name: string): void;

	setFriends: React.Dispatch<React.SetStateAction<string[]>>;

	setSearch: React.Dispatch<React.SetStateAction<string>>;

	onClickStepUp(): void;
}

function Step1(props: Step) {
	// useEffect(() => {
	// 	let arr: string[];
	// 	if (search !== "") {
	// 		const result = (userIds.filter(id => id.includes(search)));
	// 		arr = [...result];
	// 	} else arr = [];
	// 	const set = new Set(arr);
	// 	setFriends([...set]);
	// }, [search]);
	return (
		<div>
			<Stack
				direction="row"
				spacing={1}
				sx={{mb: 1, display: "flex", justifyContent: "center"}}
			>
				{props.players ? (
					props.players.map((friend, i) => (
						<Chip
							key={i}
							label={friend}
							variant="outlined"
							onDelete={() => props.handleDelete(friend)}
						/>
					))
				) : (
					<div>친구를 선택해주세요!</div>
				)}
			</Stack>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						marginX: 10,
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "center",
					}}
				>
					<TextField
						sx={{width: 400}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon/>
								</InputAdornment>
							),
						}}
						id="outlined-basic"
						label="친구 이름"
						variant="standard"
						value={props.search}
						onChange={(e) => props.setSearch(e.target.value)}
						autoFocus={true}
						helperText={
							<div style={{display: "flex", justifyContent: "space-between"}}>
								<Typography color="textSecondary" variant="body2">
									아직 회원이 아니신가요? <Link href="/register">회원가입</Link>
								</Typography>
								<div>
									<KsjTimer/>
								</div>
							</div>
						}
					/>

					<Button
						sx={{ml: 1}}
						disabled={props.players.length === 0}
						variant="outlined"
						size="medium"
						onClick={props.onClickStepUp}
					>
						다음
					</Button>
				</Box>
				{!props.search ? <AdminGame setAdmin1={false}/> : null}
			</div>
			<div style={{}}>
				<List dense={true}>
					<ImageList cols={6} rowHeight={164} variant="quilted">
						{props.friends.map((friend, i) => (
							<ListItem key={i}>
								<ListItemButton
									sx={{border: "solid"}}
									selected={props.players.includes(friend)}
									onClick={() => props.userSelection(friend)}
								>
									<ListItemText sx={{textAlign: "center"}} primary={friend}/>
								</ListItemButton>
							</ListItem>
						))}
					</ImageList>
				</List>
			</div>
		</div>
	);
}

export default Step1;
