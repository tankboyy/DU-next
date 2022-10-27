import React, { SyntheticEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { userState } from "../recoil/user";
import UseBackDrop from "./useBackDrop";
import { useRouter } from "next/router";
import Link from "next/link";
import { RoundaboutLeftRounded } from "@mui/icons-material";

function Login() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: { userId: "", userPw: "" },
  });

  watch();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(!loading);
    const { userId, userPw } = data;
    axios
      .post(`api/users/login`, { data })
      .then(({ data }) => {
        console.log(data);
        setUserData({
          id: data.userId,
          name: data.userName,
          gender: data.userGender,
          login: true,
        });
        setLoading(false);
        router.push("/");
        // history("/");
      })
      .catch(() => {
        setLoading(false);
        alert("아이디, 비밀번호를 확인해주세요");
        setValue("userId", "");
        setValue("userPw", "");
      });
  });

  const [userData, setUserData] = useRecoilState(userState);

  return (
    <div>
      <Box>
        <Container maxWidth="xs">
          <form onSubmit={onSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                로그인
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                비밀번호는 생일이에요!
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="아이디(이름)"
              type="text"
              variant="outlined"
              {...register("userId")}
            />
            <TextField
              fullWidth
              margin="dense"
              label="비밀번호(생일)"
              type="password"
              variant="outlined"
              {...register("userPw")}
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={
                  getValues("userId") === "" || getValues("userPw") === ""
                }
              >
                로그인
              </Button>
            </Box>
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

export default Login;
