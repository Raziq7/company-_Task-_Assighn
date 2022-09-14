import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blink from "react-blink-text";
import Confetti from 'react-confetti'
import moment from "moment";


import {
  Button,
  Chip,
  Fab,
  Grid,
  InputLabel,
  Modal,
  Paper,
  Skeleton,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/system";
import { taskStatusChangeAction, userRateDecrementAction, userRateIncrementAction } from "../../action/adminAction";
import { usersTaskAsignFind } from "../../action/userAction";

function UserHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState("");

  

  const { loading, userTask } = useSelector((state) => {
    return state.usersTaskAsignFind;
  });

  console.log(userTask,"userTask userTask userTask userTask");
  const { statusChange } = useSelector((state) => {
    return state.taskStatusChange;
  });
  const { rateDecrease } = useSelector((state) => {
    return state.userRateDecrement;
  });

  const { rateIncrease } = useSelector((state) => {
    return state.userRateIncrement;
  });

  const handleChange = (event, id, index,userId,estimate) => {
    if(event.target.value === "Done"){
      setStatus(event.target.value);
      new Date(estimate) < new Date().getTime() ? dispatch(userRateDecrementAction(event.target.value, id, index,userId)) :  dispatch(userRateIncrementAction(event.target.value, id, index,userId))

    }else{
      setStatus(event.target.value);
      dispatch(taskStatusChangeAction(event.target.value, id, index));
    }
  };

  useEffect(() => {
    dispatch(usersTaskAsignFind());
  }, [statusChange,rateDecrease,rateIncrease]);

  useEffect(() => {
    let userExit = localStorage.getItem("loginInfo")
  ? JSON.parse(localStorage.getItem("loginInfo"))
  : null;
console.log(userExit.isUserExist._id);
setUserID(userExit.isUserExist._id)
  }, [statusChange]);
 

  //TAsk Modal Open
  const [index, setIndex] = useState(0);
  const [index1, setIndex1] = useState(0);

  const [taskopen, setTaskopen] = React.useState(false);
  const detailOpen = (index, i) => {
    setIndex(index);
    setIndex1(i);
    setTaskopen(true);
  };
  const detailClose = () => setTaskopen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "hidden !important",
    overflowY: "scroll !important",
  };
  return (
    <>
      {/* modal Task Detail */}

      {userTask &&  <Modal
        open={taskopen}
        onClose={detailClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ width: "auto", overflow: "scroll" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
            color="#5D5CDE"
          >
            Task Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description :{" "}
            <div
              dangerouslySetInnerHTML={{
                __html:
                  userTask.length !== 0 && userTask[index1].AssighnTasks[index].description,
              }}
            />
            <br />
            Label : { userTask.length !== 0  && userTask[index1].AssighnTasks[index].label}
            <br />
            Estimate :{" "}
            { userTask.length !== 0 && userTask[index1].AssighnTasks[index].estimate}
            <br />
            Priority :{" "}
            { userTask.length !== 0 && userTask[index1].AssighnTasks[index].priority}
            <br />
          </Typography>
        </Box>
      </Modal>}

      {/* modal Task Detail */}
      <Box
        elevation={3}
        display={{
          xs: "block",
          sm: "block",
          md: "block",
          lg: "flex",
          xl: "flex",
        }}
        ml={{ xs: "0", sm: "250px", md: "20px", lg: "0", xl: "0" }}
        sx={{
          justifyContent: "space-around",
          boxShadow: 3,
          backgroundColor: "#F4F6F8",
          width: "100%",
          height: "100vh",
        }}
      >
        {loading ? (
          <Skeleton sx={{ width: "350px", height: "350px" }} />
        ) : (
          <Box
            item
            spacing={4}
            sx={{
              justifyContent: "space-around",
              boxShadow: 3,
              backgroundColor: "white",
              width: "360px",
              height: "350px",
              overflow: "hidden",
              overflowY: "scroll",
              mt: 2.5,
            }}
          >
            {userTask &&
              userTask.map((element, i) => {
                return element.AssighnTasks.map((data, index) => {
                  if (data.status === "Back Logs" && userID == data.userId)
                    return (
                      <Paper
                        sx={{
                          justifyContent: "space-around",
                          boxShadow: 3,
                          backgroundColor: "white",
                          width: "320px",
                          height: "auto",
                          mt: 1,
                          ml: 1.5,
                        }}
                      >
                        { new Date(data.estimate) < new Date().getTime() && <Box style={{marginTop:"50px !important"}}><Typography sx={{ fontSize: 'default', fontWeight: 'bold',color:"red"}}>You have not completed your task by the due date so your rate has been reduced</Typography></Box>}
                        <FormControl sx={{ width: "250px", ml: 10, p: 2 }}>
                          <Blink
                            color="red"
                            text={`Finish within ${moment(data.estimate).utc().format("YYYY-MM-DD")}`}
                            fontSize="5"
                          ></Blink>
                          <InputLabel
                            sx={{ ml: 0.5, mt: 0.5 }}
                            id="demo-simple-select-label"
                          >
                            Select Your Project Status
                          </InputLabel>
                          <Tooltip title="Change your Task Status">
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value="Back Logs"
                              label="status"
                              onChange={(e) =>
                                handleChange(e, element._id, index,data.userId,data.estimate)
                              }
                              sx={{ height: "30px", width: "210px" }}
                            >
                              <MenuItem value="Back Logs">Back Logs</MenuItem>
                              <MenuItem value="Progressing">
                                Progressing
                              </MenuItem>
                              <MenuItem value="Done">Done</MenuItem>
                            </Select>
                          </Tooltip>
                        </FormControl>
                        <Tooltip title="Click for Details">
                        <Typography
                          onClick={() => detailOpen(index, i)}
                          variant="h6"
                          align="center"
                          style={{cursor:"pointer"}}
                        >
                          Tittle : {data.summary}
                        </Typography>
                        </Tooltip>
                        <Chip
                          label={`User : ${data.user}`}
                          sx={{ marginLeft: "110px", mb: 1 }}
                          color="primary"
                        />
                         <Chip
                        label="Back Logs"
                        sx={{ marginLeft: "110px", mb: 1 }}
                        style={{ backgroundColor: "#D31F3C", color: "white" }}
                      />
                      </Paper>
                    );
                });
              })}
          </Box>
        )}
        {loading ? (
          <Skeleton sx={{ width: "350px", height: "350px" }} />
        ) : (
          <Box
            item
            spacing={4}
            sx={{
              justifyContent: "space-around",
              boxShadow: 3,
              backgroundColor: "white",
              width: "350px",
              height: "360px",
              overflow: "hidden",
              overflowY: "scroll",
              mt: 2.5,
            }}
          >
            {userTask &&
              userTask.map((element,i) => {
                return element.AssighnTasks.map((data, index) => {
                if (data.status === "Progressing" && userID == data.userId)
                  return (
                    <Paper
                      sx={{
                        justifyContent: "space-around",
                        boxShadow: 3,
                        backgroundColor: "white",
                        width: "320px",
                        height: "auto",
                        mt: 1,
                        ml: 1.5,
                      }}
                    >
                      { new Date(data.estimate) < new Date().getTime() && <Typography sx={{ fontSize: 'default', fontWeight: 'bold',color:"red" }}>You have not completed your task by the due date so your rate has been reduced</Typography>}
                      <FormControl sx={{ width: "250px", ml: 10, p: 2 }}>
                        <InputLabel
                          sx={{ ml: 0.5, mt: 0.5 }}
                          id="demo-simple-select-label"
                        >
                          Select Your Project Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value="Progressing"
                          label="status"
                          onChange={(e) => handleChange(e, element._id, index,data.userId,data.estimate)}
                          sx={{ height: "30px", width: "210px" }}
                        >
                          <MenuItem value="Back Logs">Back Logs</MenuItem>
                          <MenuItem value="Progressing">Progressing</MenuItem>
                          <MenuItem value="Done">Done</MenuItem>
                        </Select>
                      </FormControl>
                      <Tooltip title="Click for Details">
                      <Typography variant="h6" align="center"  onClick={() => detailOpen(index, i)} style={{cursor:"pointer"}}>
                        Tittle : {data.summary}
                      </Typography>
                      </Tooltip>
                      <Chip
                        label={`User : ${data.user}`}
                        sx={{ marginLeft: "110px", mb: 1 }}
                        color="primary"
                      />
                      <Chip
                        label="Progressing"
                        sx={{ marginLeft: "110px", mb: 1 }}
                        color="warning"
                      />
                    </Paper>
                  );
                  })
              })}
          </Box>
        )}

        {loading ? (
          <Skeleton sx={{ width: "350px", height: "350px" }} />
        ) : (
          <Box
            item
            spacing={4}
            sx={{
              justifyContent: "space-around",
              boxShadow: 3,
              backgroundColor: "white",
              width: "350px",
              height: "360px",
              overflow: "hidden",
              overflowY: "scroll",
              mt: 2.5,
            }}
          >
            {userTask &&
              userTask.map((element,i) => {
                return element.AssighnTasks.map((data, index) => {
                if (data.status === "Done" && userID == data.userId)
                  return (
                    <Paper
                      sx={{
                        justifyContent: "space-around",
                        boxShadow: 3,
                        backgroundColor: "white",
                        width: "320px",
                        height: "auto",
                        mt: 1,
                        ml: 1,
                      }}
                    >
                      <FormControl sx={{ width: "250px", ml: 10, p: 2 }}>
                      <Confetti
                    width="auto"
                    height='auto'
                  />
                        <InputLabel
                          sx={{ ml: 0.5, mt: 0.5 }}
                          id="demo-simple-select-label"
                        >
                          Select Your Project Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value="Done"
                          label="status"
                          onChange={(e) => handleChange(e, element._id, index,data.userId,data.estimate)}
                          sx={{ height: "30px", width: "210px" }}
                        >
                          <MenuItem value="Back Logs">Back Logs</MenuItem>
                          <MenuItem value="Progressing">Progressing</MenuItem>
                          <MenuItem value="Done">Done</MenuItem>
                        </Select>
                      </FormControl>
                      <Tooltip title="Click for Details">
                      <Typography variant="h6" align="center" onClick={() => detailOpen(index, i)} style={{cursor:"pointer"}}>
                        Tittle : {data.summary}
                      </Typography>
                      </Tooltip>
                      <Chip
                        label={`User : ${data.user}`}
                        sx={{ marginLeft: "110px", mb: 1 }}
                        color="primary"
                      />
                      <Chip
                        label="Done"
                        sx={{ marginLeft: "130px", mb: 1 }}
                        color="success"
                      />
                    </Paper>
                  );
                    })
              })}
          </Box>
        )}
      </Box>
    </>
  );
}

export default UserHome;
