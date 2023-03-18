import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { schoolList } from "../../public/list";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UseBackDrop from "../useBackDrop";
import CheckIcon from "@mui/icons-material/Check";
import { fetchSignInMethodsForEmail } from "@firebase/auth";
import { firebaseAuth } from "../../hooks/firebase";

type PropsType = {};

export default function NewRegister(props: PropsType) {
  const { handleSubmit, register, getValues, setValue, formState: {errors}} = useForm({
    defaultValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
      userGender: "",
      userSchool: "",
      userBirthDay: "",
      userNumber: "",
    },
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
    if (emailCheck) {
      let result = confirm("이메일을 다시 입력하시겠습니까?");
      if (result) {
        setEmailCheck(false);
        setValue("userEmail", "");
      }
      return;
    }
    const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(getValues("userEmail"))) {
      alert("이메일 형식을 확인해주세요.");
      return;
    }
    setOpen(true);
    const check = await fetchSignInMethodsForEmail(
      firebaseAuth,
      getValues("userEmail")
    );
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
      <UseBackDrop bdOpen={open} />
      <Container component="main" maxWidth="xs">
        <Box sx={{ m: 2 }} className={"flex justify-center"}>
          <Typography variant="h5">회원 가입</Typography>
        </Box>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={"flex flex-col items-center"}
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="hi">이메일</InputLabel>
            <OutlinedInput
              {...register("userEmail", {
                required: true,
                pattern: {
                  value: /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "이메일 형식이 잘못되었습니다.",
                },
              })}
              disabled={emailCheck}
              // id="outlined-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickCheckEmail}
                    edge="end"
                    // disabled={emailCheck}
                  >
                    {emailCheck ? (
                      <RefreshIcon color="primary" />
                    ) : (
                      <CheckIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="email"
            />
          </FormControl>
          <Box className="flex flex-col">
            <TextField
              sx={{ m: 0.5, width: "25ch" }}
              label="비밀번호"
              type="password"
              {...register("userPassword", {
                required: { value: true, message: "비밀번호를 입력해주세요." },
                minLength: {
                  value: 6,
                  message: "비밀번호는 6자 이상이어야 합니다.",
                },
              })}
            />
            <div className="text-red-600 font-bold text-sm ml-4">
              <Typography variant={"caption"}>
                {errors.userPassword?.type === "required" &&
                  "비밀번호를 입력해주세요."}
                {errors.userPassword?.type === "minLength" &&
                  "비밀번호는 최소 6자 이상입니다."}
              </Typography>
            </div>
          </Box>
          <TextField
            sx={{ m: 1, width: "25ch" }}
            label="생년월일"
            type="date"
            {...register("userBirthDay")}
            defaultValue={register("userBirthDay")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth sx={{ m: 1, width: "25ch" }}>
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

          <FormControl sx={{ mb: 1 }} required>
            <RadioGroup row>
              <FormControlLabel
                value="남자"
                control={<Radio />}
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
                        color: pink[600],
                      },
                    }}
                  />
                }
                label="여자"
              />
            </RadioGroup>
          </FormControl>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            size={"medium"}
            sx={{ mb: 1 }}
          >
            가입
          </Button>
        </form>
        <Link href="/mobileLogin">이미 아이디가 있습니다!</Link>
      </Container>
    </>
  );
}
