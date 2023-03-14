import React from "react";
import { useForm } from "react-hook-form";
import {
	Box,
	Button,
	Container,
	FormControl, FormControlLabel,
	FormHelperText,
	Grid, IconButton, InputAdornment,
	InputLabel, Link,
	MenuItem, OutlinedInput, Radio, RadioGroup,
	Select,
	TextField,
	Typography
} from "@mui/material";
import { schoolList } from "../../public/list";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import firebase from "../../hooks/firebase";
import UseBackDrop from "../useBackDrop";
import CheckIcon from "@mui/icons-material/Check";

type PropsType = {}

export default function NewRegister(props: PropsType) {
	const {handleSubmit, register, getValues, watch} = useForm({
		defaultValues: {
			userName: "",
			userEmail: "",
			userPassword: "",
			userGender: "",
			userSchool: "",
			userBirthDay: "",
			userNumber: ""
		}
	});
	const onSubmit = () => {
		console.log("sub");
	};
	const onError = () => {
		console.log("sub");
	};

	const [emailCheck, setEmailCheck] = useState(false);
	const [open, setOpen] = useState(false);
	const handleClickCheckEmail = async () => {
		const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
		if (!emailRegex.test(getValues("userEmail"))) {
			alert("이메일 형식을 확인해주세요.");
			return;
		}
		setOpen(true);
		const check = await firebase.auth().fetchSignInMethodsForEmail(getValues("userEmail"));
		if (check.length === 0) {
			setOpen(false);
			setEmailCheck(true);
			alert("사용 가능한 이메일입니다.");
		} else {
			setOpen(false);
			alert("이미 사용중인 이메일입니다.");
		}

		// setCheckEmail((show) => !show);
	};

	return (
		<>
			<UseBackDrop bdOpen={open}/>
			<Box
				className={"mt-5"}
			>
				<Container component="main" maxWidth="xs" className={"flex flex-col items-center"}>
					<Box sx={{m: 2}}>
						<Typography variant="h5">회원 가입</Typography>
					</Box>
					<form onSubmit={handleSubmit(onSubmit, onError)} className={"flex flex-col justify-center"}>
						<FormControl sx={{m: 1, width: "25ch"}} variant="outlined">
							<InputLabel htmlFor="hi">이메일</InputLabel>
							<OutlinedInput
								error={true}
								{...register("userEmail")}
								disabled={emailCheck}
								// id="outlined-adornment-password"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											onClick={handleClickCheckEmail}
											edge="end"
											disabled={emailCheck}
										>
											{emailCheck ? <CheckIcon color="primary"/> : <CheckIcon/>}
										</IconButton>
									</InputAdornment>
								}
								label="email"
								
							/>
							<FormHelperText>{""}</FormHelperText>
						</FormControl>
						<TextField
							sx={{m: 1, width: "25ch"}}
							id="date"
							label="생년월일"
							type="date"
							{...register("userBirthDay")}
							defaultValue={register("userBirthDay")}
							InputLabelProps={{
								shrink: true
							}}
						/>
						<FormControl fullWidth sx={{m: 1, width: "25ch"}}>
							<InputLabel>학교</InputLabel>
							<Select
								required
								{...register("userSchool")}
								defaultValue="꿈빛나래"
								label="school"
							>
								{schoolList.map((school, i) => (
									<MenuItem key={i} value={school}>
										{school}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl sx={{mb: 1}} required>
							<RadioGroup row>
								<FormControlLabel
									value="남자"
									control={<Radio/>}
									label="남자"
									{...register("userGender")}
								/>
								<FormControlLabel
									{...register("userGender")}
									value="여자"
									control={
										<Radio
											sx={{
												color: pink[800],
												"&.Mui-checked": {
													color: pink[600]
												}
											}}
										/>
									}
									label="여자"
								/>
							</RadioGroup>
						</FormControl>
						<Button
							type="submit"
							disabled={
								// !idChecked ||
								getValues("userGender") === "" ||
								getValues("userSchool") === ""
							}
							variant="contained"
							fullWidth
							sx={{mb: 1}}
						>
							가입
						</Button>
					</form>
					<Link href="/login">이미 아이디가 있습니다!</Link>
				</Container>
			</Box>
		</>
	);
}


