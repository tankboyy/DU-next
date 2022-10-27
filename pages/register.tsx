import Seo from "../components/Seo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import UseBackDrop from "../components/useBackDrop";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { schoolList } from "../public/list";
import { pink } from "@mui/material/colors";
import { useRouter } from "next/router";

type registerUserType = {
  userGender: string;
  userId: string;
  userName: string;
  userSchool: string;
  userBirthDay: string;
};

export default function RegisterPage() {
  const [idChecked, setIdChecked] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: {
      userGender: "",
      userId: "",
      userName: "",
      userSchool: "",
      userBirthDay: "2016-06-11",
      userNumber: "010",
    },
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: registerUserType) => {
    const values = Object.values(data);
    values.map((value) => {
      if (value === "") {
        alert("입력하지 않은 공간이 있거나 아이디확인을 다시 해주세요!");
        throw new Error("입력하지 않은 공간이 있어요!");
      }
    });
    addUser();
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const onIdCheck = async () => {
    setLoading(true);
    const userId = getValues("userId");
    axios
      .post("/api/users/idcheck", { userId })
      .then(({ data }) => {
        setLoading(false);
        if (data.idCheck === userId) {
          alert("사용 가능한 이름(아이디)입니다");
          setValue("userName", userId);
        } else {
          alert(`이미 ${userId} 님이 있어 ${data.idCheck} 님으로 변경됩니다.
꼭 >> ${data.idCheck} << 로 로그인부탁드립니다!`);
          setValue("userName", userId);
          setValue("userId", data.idCheck);
        }
        setIdChecked(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const addUser = async () => {
    setLoading(true);
    axios
      .post("/api/users/adduser", {
        userId: getValues("userId"),
        userGender: getValues("userGender"),
        userName: getValues("userName"),
        userSchool: getValues("userSchool"),
        userBirthDay: getValues("userBirthDay"),
        userNumber: getValues("userNumber"),
      })
      .then(() => {
        setLoading(false);
        alert("회원가입 성공!!");
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("관리자한테 문의해주세요ㅠㅠ");
      });
  };

  return (
    <div>
      <Seo title="회원가입" />

      <UseBackDrop bdOpen={loading} />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box sx={{ my: 2 }}>
            <Typography variant="h5">회원 가입</Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              비밀번호는 생일이에요!
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  sx={{ mb: 1 }}
                  label="이름(아이디)"
                  fullWidth
                  {...register("userId")}
                  autoFocus
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="primary"
                  variant="outlined"
                  // type="submit"
                  // fullWidth
                  onClick={onIdCheck}
                  size="medium"
                >
                  체크
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ my: 1 }}>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    id="date"
                    label="생년월일(비밀번호)"
                    type="date"
                    {...register("userBirthDay")}
                    helperText={`비밀번호는 ${
                      getValues("userBirthDay").split("-")[1]
                    }${getValues("userBirthDay").split("-")[2]}`}
                    defaultValue={register("userBirthDay")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
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
                </Grid>
              </Grid>
            </Box>

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
              type="submit"
              disabled={
                !idChecked ||
                getValues("userGender") === "" ||
                getValues("userSchool") === ""
              }
              variant="contained"
              fullWidth
              sx={{ mb: 1 }}
            >
              가입
            </Button>
          </form>
          <Link>이미 아이디가 있습니다!</Link>
        </Container>
      </Box>
    </div>
  );
}
