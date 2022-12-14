import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slide,
  TextField,
} from "@mui/material";
import { tUSER } from "./adminUser";
import { TransitionProps } from "@mui/material/transitions";
import { useForm } from "react-hook-form";
import { pink } from "@mui/material/colors";
import useGetYMD from "../../hooks/useGetYMD";
import UseBackDrop from "../useBackDrop";
import axios from "axios";
import { schoolList } from "../../public/list";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GridUserChange({
  user,
  users,
  setUsers,
}: {
  user: tUSER | undefined;
  users: tUSER[] | undefined;
  setUsers: React.Dispatch<React.SetStateAction<tUSER[] | undefined>>;
}) {
  const { register, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: {
      id: user?.id,
      created: user?.created,
      friends: user?.friends,
      userBirthDay: user?.userBirthDay,
      userGender: user?.userGender,
      userId: user?.userId,
      userName: user?.userName,
      userNumber: user?.userNumber,
      userPw: user?.userPw,
      userSchool: user?.userSchool,
    },
  });
  watch();

  const onUserDelete = async () => {
    setLoading(true);
    await axios
      .post("/api/users/deleteuser", { userIndex: getValues("id") })
      .then((data) => {
        setLoading(false);
        setOpen(false);
        // @ts-ignore
        const newUsers = [...users];
        newUsers.splice(getValues("id")! - 1, 1);
        for (let i = getValues("id")! - 1; i < newUsers.length; i++) {
          newUsers[i].id -= 1;
        }
        setUsers(newUsers);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await axios
      .post("/api/users/updateuser", { userData: data })
      .then(({ data }) => {
        const newData: tUSER[] = [];
        data.map((user: tUSER) => {
          const created = useGetYMD(new Date(user.created));
          newData.push({ ...user, created });
        });
        let userArr: tUSER[] = [];
        for (const [key, value] of Object.entries(newData)) {
          const realData = { ...value, id: parseInt(key) + 1 };
          userArr = [...userArr, realData];
        }
        setUsers(userArr);
        setLoading(false);
        setOpen(false);
      });
  });

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeUser = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button variant="outlined" onClick={onChangeUser}>
        ??????
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <form onSubmit={onSubmit}>
          <DialogTitle>{"????????????"}</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <UseBackDrop bdOpen={loading} />
            <Box sx={{ display: "flex", flexDirection: "column", width: 400 }}>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    label="?????????"
                    variant="outlined"
                    margin="dense"
                    {...register("userId")}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="??????"
                    variant="outlined"
                    margin="dense"
                    {...register("userName")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="????????????"
                    variant="outlined"
                    margin="dense"
                    {...register("userPw")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ mb: 1 }} margin="dense">
                    <InputLabel>??????</InputLabel>
                    <Select
                      required
                      label="??????"
                      value={getValues("userSchool")}
                      {...register("userSchool")}
                    >
                      {schoolList.map((school, i) => (
                        <MenuItem key={i} value={school}>
                          {school}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    helperText="??????????????? ??? ????????? ????????????"
                    id="date"
                    label="????????????"
                    type="date"
                    {...register("userBirthDay")}
                    defaultValue={register("userBirthDay")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormControl sx={{ mb: 1 }} required>
                    <RadioGroup row>
                      <FormControlLabel
                        checked={getValues("userGender") === "??????"}
                        value="??????"
                        control={<Radio />}
                        label="??????"
                        {...register("userGender")}
                      />
                      <FormControlLabel
                        checked={getValues("userGender") === "??????"}
                        {...register("userGender")}
                        value="??????"
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
                        label="??????"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onUserDelete}>????????????</Button>
            <Button type="submit">????????????</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default GridUserChange;
