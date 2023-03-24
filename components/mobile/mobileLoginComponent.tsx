import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import UseBackDrop from "../useBackDrop";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { userAtom, userState } from "../../recoil/user";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../hooks/firebase";
import Snackbar from "@mui/material/Snackbar";
import { useRouter } from "next/router";

function MobileLoginComponent() {
  const [userKey, setUserKey] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
  });

  const router = useRouter();
  if(firebaseAuth.currentUser !== null) router.push("/")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // return auth.onIdTokenChanged(async (user) => {
  //   if (!user) {
  //    console.log(user, "user")
  //   }
  // })

  watch();
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    signInWithEmailAndPassword(
      firebaseAuth,
      getValues("email"),
      getValues("password")
    )
      .then((data) => {
        setLoading(false);
        setUserKey(data.user);
        router.push("/")
      })
      .catch((error) => {
        setLoading(false);
        setSnack({
          open: true,
          message: "이메일 또는 비밀번호를 다시 확인해주세요.",
        });
      });
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack({ ...snack, open: false });
  };

  return (
    <div>
      <UseBackDrop bdOpen={loading} />
      <Snackbar
        open={snack.open}
        message={snack.message}
        onClose={handleClose}
        autoHideDuration={3000}
      />
      <Box>
        <Container maxWidth="xs">
          <form onSubmit={onSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                로그인
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                안녕하세요!
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="이메일"
              type="text"
              variant="outlined"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "이메일 형식이 잘못되었습니다.",
                },
              })}
            />
            <div className={"color-red"}>
              {errors.email?.type === "pattern" && "이메일형식을 확인해주세요."}
              {errors.email?.type === "required" && "이메일을 입력해주세요."}
            </div>
            <TextField
              fullWidth
              margin="dense"
              label="비밀번호(생일)"
              type="password"
              variant="outlined"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "비밀번호는 6자 이상이어야 합니다.",
                },
              })}
            />
            <div>
              {errors.password?.type === "required" && "이메일을 입력해주세요."}
            </div>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                type="submit"
              >
                로그인
              </Button>
            <UseBackDrop bdOpen={loading} />

            <Typography color="textSecondary" variant="body2">
              아직 회원이 아니신가요? <Link href="/register">회원가입</Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </div>
  );
}

export default MobileLoginComponent;
