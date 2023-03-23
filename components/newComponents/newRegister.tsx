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
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { schoolList } from "../../public/list";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UseBackDrop from "../useBackDrop";
import CheckIcon from "@mui/icons-material/Check";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "@firebase/auth";
import { firebaseAuth } from "../../hooks/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../recoil/user";
import { useRouter } from "next/router";

type PropsType = {};

const errorTailwind = "text-red-600 font-bold text-sm ml-4";

export default function NewRegister(props: PropsType) {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
      userGender: "여자",
      userSchool: "",
      userBirthDay: "",
      userNumber: "",
    },
  });
  const [emailCheck, setEmailCheck] = useState(false);
  const [open, setOpen] = useState(false);
  const setAtom = useSetRecoilState(userAtom);
  const router = useRouter();
  if (firebaseAuth.currentUser !== null) router.push("/");
  const onSubmit = async () => {
    if (!emailCheck) {
      alert("이메일 중복확인을 해주세용.");
      return;
    }
    setOpen(true);
    createUserWithEmailAndPassword(
      firebaseAuth,
      getValues().userEmail,
      getValues().userPassword
    )
      .then(async (userCredential) => {
        const user = userCredential.user;
        setAtom(user);
        const db = getFirestore();
        const { userPassword, ...newData } = getValues();
        await setDoc(doc(db, "usersCollection", user.uid), {
          ...newData,
          createdAt: new Date(),
        });
        router.push("/").then(() => {
          setOpen(false);
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
        setOpen(false);
      });
  };
  const onError = () => {
    console.log("sub");
  };

  watch();

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
  const handleKeyDown = (event: any) => {
    if (
      event.key === "Backspace" &&
      getValues("userNumber").slice(-1) === "-"
    ) {
      setValue("userNumber", getValues("userNumber").slice(0, -1));
    }
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
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickCheckEmail} edge="end">
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
            <div className={errorTailwind}>
              <Typography variant="caption">
                {errors.userEmail?.type === "required" &&
                  "이메일을 입력해주세요."}
                {errors.userEmail?.type === "pattern" &&
                  "이메일을 형식을 확인해주세요."}
              </Typography>
            </div>
          </FormControl>
          <Box sx={{ m: 1 }}>
            <TextField
              sx={{ width: "25ch" }}
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
            <div className={errorTailwind}>
              <Typography variant={"caption"}>
                {errors.userPassword?.type === "required" &&
                  "비밀번호를 입력해주세요."}
                {errors.userPassword?.type === "minLength" &&
                  "비밀번호는 최소 6자 이상입니다."}
              </Typography>
            </div>
          </Box>
          <Box sx={{ m: 1 }}>
            <TextField
              sx={{ width: "25ch" }}
              label="이름"
              type="text"
              {...register("userName", {
                required: true,
              })}
            />
            <div className={errorTailwind}>
              <Typography variant={"caption"}>
                {errors.userName?.type === "required" && "이름을 입력해주세요."}
              </Typography>
            </div>
          </Box>
          <Box sx={{ m: 1 }}>
            <TextField
              sx={{ width: "25ch" }}
              label="핸드폰 번호"
              type="text"
              onKeyDown={handleKeyDown}
              {...register("userNumber", {
                required: true,
                maxLength: 13,
                onChange: (event) => {
                  if (event.target.value.length > 13) return;
                  const input = event.target.value.replace(/\D/g, "");
                  let formatted = "";
                  if (input.length > 3) {
                    formatted += `${input.slice(0, 3)}-`;
                    if (input.length > 4) {
                      formatted += `${input.slice(3, 7)}-`;
                      if (input.length > 7) {
                        formatted += input.slice(7);
                      } else {
                        formatted += input.slice(7);
                      }
                    } else {
                      formatted += input.slice(3);
                    }
                  } else {
                    formatted += input;
                  }
                  setValue("userNumber", formatted);
                },
              })}
            />
            <div className={errorTailwind}>
              <Typography variant={"caption"}>
                {errors.userNumber?.type === "required" &&
                  "핸드폰 번호를 입력해주세요."}
                {errors.userNumber?.type === "maxLength" &&
                  "핸드폰 번호를 확인해주세요."}
              </Typography>
            </div>
          </Box>
          <Box sx={{ m: 1 }}>
            <TextField
              sx={{ width: "25ch" }}
              label="생년월일"
              type="date"
              {...register("userBirthDay", {
                required: true,
              })}
              defaultValue={register("userBirthDay")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className={errorTailwind}>
              <Typography variant={"caption"}>
                {getValues("userBirthDay") === "" && "생년월일을 선택해주세요!"}
              </Typography>
            </div>
          </Box>
          <Box>
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
          </Box>
          <ToggleButtonGroup
            sx={{ mb: 1 }}
            color={getValues("userGender") === "남자" ? "primary" : "error"}
            value={getValues("userGender")}
            exclusive
            onChange={(
              event: React.MouseEvent<HTMLElement>,
              newAlignment: string
            ) => {
              console.log(newAlignment);
              setValue("userGender", newAlignment);
            }}
          >
            <ToggleButton value="남자">남자</ToggleButton>
            <ToggleButton value="여자">여자</ToggleButton>
          </ToggleButtonGroup>
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
