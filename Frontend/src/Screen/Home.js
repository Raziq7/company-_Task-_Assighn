import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  Fab,
  Grid,
  InputLabel,
  Modal,
  Paper,
  Skeleton,
  Stack,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from "react-confetti";
import Blink from "react-blink-text";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import {
  adminTaskAsignFindAction,
  AdminTaskAsignOneActin,
  taskAsignProjectFindAction,
  taskStatusChangeAction,
  userFindForAssighnAction,
  userRateDecrementAction,
  userRateIncrementAction,
} from "../action/adminAction";
import WYSIWYGEditor from "../component/WYSIWYGEditor";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [label, setLabel] = useState("");
  const [estimate, setEstimate] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { loading, TaskAsignProFind } = useSelector((state) => {
    return state.AdminTaskAsignProjectFind;
  });
  let { statusChange } = useSelector((state) => {
    return state.taskStatusChange;
  });

  let { TaskAsignOne } = useSelector((state) => {
    return state.AdminTaskAsignOne;
  });

  const { showUserForAsign } = useSelector((state) => {
    return state.userFindForAssighn;
  });
  const { rateDecrease } = useSelector((state) => {
    return state.userRateDecrement;
  });

  const { rateIncrease } = useSelector((state) => {
    return state.userRateIncrement;
  });

  const { taskContentFind } = useSelector((state) => {
    return state.adminTaskAsignFind;
  });

  let adminExit = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  useEffect(() => {
    if (adminExit) {
      if (!adminExit.isUserExist.isAdmin) {
        navigate("/userHome");
      }
    } else {
      navigate("/login");
    }
  }, []);

  //Date
  useEffect(() => {
    if (TaskAsignProFind) {
      if (
        new Date(TaskAsignProFind.AssighnTasks.map((data) => data.estimate)) <
        new Date().getTime()
      )
        setShowToast(true);
    }
  }, [TaskAsignProFind, showToast]);

  useEffect(() => {
    dispatch(taskAsignProjectFindAction(id));
  }, [TaskAsignOne, statusChange, rateDecrease, rateIncrease]);

  useEffect(() => {
    if (TaskAsignOne) {
      setOpen(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      TaskAsignOne = false;
    }
  }, [TaskAsignOne]);

  useEffect(() => {
    if (statusChange) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    statusChange = false;
  }, [statusChange]);

  //userFind
  useEffect(() => {
    dispatch(userFindForAssighnAction());
  }, []);

  useEffect(() => {
    dispatch(adminTaskAsignFindAction());
  }, [taskContentFind]);

  const handleChange = (event, id, index, userId, estimate) => {
    if (event.target.value === "Done") {
      setStatus(event.target.value);
      new Date(estimate) < new Date().getTime()
        ? dispatch(
            userRateDecrementAction(event.target.value, id, index, userId)
          )
        : dispatch(
            userRateIncrementAction(event.target.value, id, index, userId)
          );
    } else {
      setStatus(event.target.value);
      dispatch(taskStatusChangeAction(event.target.value, id, index));
    }
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleSubmitFinal = (event) => {
    let id = TaskAsignProFind && TaskAsignProFind._id;
    const formValues = {
      summary,
      label,
      estimate,
      priority,
      description,
      user,
      id,
    };
    if (description !== "") {
      setErrors(false);
      dispatch(AdminTaskAsignOneActin(formValues));
    } else {
      setErrors(true);
    }
  };

  //TAsk Modal Open
  const [index, setIndex] = useState(0);
  const [taskopen, setTaskopen] = React.useState(false);
  const detailOpen = (i) => {
    setIndex(i);
    setTaskopen(true);
  };
  const detailClose = () => setTaskopen(false);

  //Form
  const userChange = (e) => {
    setUser(e.target.value);
  };

  //editor submit
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const handleSubmitOnClick = ({ editor_content }) => {
    console.log("editor_content ==> ", editor_content);
    setDescription(editor_content);
  };

  //birthday
  // const { width, height } = useWindowSize()
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Tooltip title="Add Task">
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleOpen}
            sx={{ marginTop: "10px", mb: 2 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "15px" }}>
          <Tooltip title="Go to Project Page">
            <Link underline="hover" color="inherit" href="/home">
              project
            </Link>
          </Tooltip>

          <Link
            underline="hover"
            color="text.primary"
            href=""
            aria-current="page"
          >
            Tasks
          </Link>
        </Breadcrumbs>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            width: "auto",
            mb: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
            overflowY: "scroll",
            // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
          }}
        >
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Typography
              variant="h5"
              sx={{ color: "#1565C0", fontWeight: "bold" }}
            >
              Assign Task
            </Typography>
            <Grid item>
              <TextField
                id="name-input"
                name="tittle"
                label="Enter Summary"
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                sx={{ marginTop: "10px", width: "45ch" }}
              />
            </Grid>
            <Grid item m="10px">
              <Paper
                elevation={2}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
                style={{ marginTop: "10px" }}
              >
                <form onSubmit={handleSubmit(handleSubmitOnClick)}>
                  <Controller
                    as={<WYSIWYGEditor />}
                    name="editor_content"
                    control={control}
                  />

                  <button
                    style={{ marginLeft: "4px", marginBottom: "5px" }}
                    type="submit"
                    className="signup-button"
                  >
                    Next
                  </button>
                </form>
                {errors && (
                  <Alert severity="error">
                    <AlertTitle>Warning</AlertTitle>
                    Please Enter Description and{" "}
                    <strong> Click Next Button!</strong>
                  </Alert>
                )}
              </Paper>
            </Grid>
            <Grid item>
              <InputLabel
                sx={{ ml: 0.5, mt: 0.5 }}
                id="demo-simple-select-label"
              >
                Select a User
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user}
                label="user"
                placeholder="Select a User"
                onChange={(e) => userChange(e)}
                sx={{ mt: 1, width: "55ch" }}
              >
                {showUserForAsign &&
                  showUserForAsign.map((data, index) => (
                    <MenuItem key={index} value={data._id}>
                      {data.name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item>
              <Typography style={{ marginTop: "10px" }}>Tasks</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={label}
                label="label"
                placeholder="Select a "
                onChange={(e) => setLabel(e.target.value)}
                sx={{ mt: 1, width: "55ch" }}
              >
                {taskContentFind &&
                  taskContentFind.map((data) => {
                    return (
                      <MenuItem value={data.contentName}>
                        {data.contentName}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>

            <Grid item>
              <Typography style={{ marginTop: "15px" }}>
                Original Estimate
              </Typography>
              {/* <TextField
                value={estimate}
                onChange={(e) => setEstimate(e.target.value)}
                name="estimate"
                mt="10px"
                label="2w 1d 5h 4m"
                variant="standard"
                sx={{ mt: 1, width: "55ch" }}
              /> */}
              <Box
                style={{
                  width: "auto",
                  height: "100px !important",
                  marginTop: "10px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Choose Estimate Date"
                    value={estimate}
                    onChange={(e) => setEstimate(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item>
              <Typography style={{ marginTop: "10px" }}>Priority</Typography>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                name="priority"
                label="priority"
                sx={{ mt: 1, width: "55ch" }}
              >
                <MenuItem value="Highest">Highest</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Lowest">Lowest</MenuItem>
              </Select>
            </Grid>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="primary"
              onClick={handleSubmitFinal}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Modal>

      {/* modal Task Detail */}

      <Modal
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
                  TaskAsignProFind &&
                  TaskAsignProFind.AssighnTasks[index].description,
              }}
            />
            <br />
            Label :{" "}
            {TaskAsignProFind && TaskAsignProFind.AssighnTasks[index].label}
            <br />
            Estimate :{" "}
            {TaskAsignProFind &&
              moment(TaskAsignProFind.AssighnTasks[index].estimate)
                .utc()
                .format("YYYY-MM-DD")}
            <br />
            Priority :{" "}
            {TaskAsignProFind && TaskAsignProFind.AssighnTasks[index].priority}
            <br />
          </Typography>
        </Box>
      </Modal>

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
          height: "auto",
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
            {TaskAsignProFind &&
              TaskAsignProFind.AssighnTasks.map((data, index) => {
                if (data.status === "Back Logs")
                  return (
                    <Paper
                      key={index}
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
                      {new Date(data.estimate) < new Date().getTime() && (
                        <Box style={{ marginTop: "50px !important" }}>
                          <Typography
                            sx={{
                              fontSize: "default",
                              fontWeight: "bold",
                              color: "red",
                            }}
                          >
                            You have not completed your task by the due date so
                            your rate has been reduced
                          </Typography>
                        </Box>
                      )}
                      <FormControl sx={{ width: "250px", ml: 10, p: 2 }}>
                        <Blink
                          color="red"
                          text={`Finish within ${moment(data.estimate)
                            .utc()
                            .format("YYYY-MM-DD")}`}
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
                              handleChange(
                                e,
                                TaskAsignProFind._id,
                                index,
                                data.userId,
                                data.estimate
                              )
                            }
                            sx={{ height: "30px" }}
                          >
                            <MenuItem value="Back Logs">Back Logs</MenuItem>
                            <MenuItem value="Progressing">Progressing</MenuItem>
                            <MenuItem value="Done">Done</MenuItem>
                          </Select>
                        </Tooltip>
                      </FormControl>

                      <Box boxShadow={3}>
                        <Tooltip title="Click for Details">
                          <Typography
                            onClick={() => detailOpen(index)}
                            variant="h6"
                            align="center"
                            style={{
                              fontWeight: "bold",
                              color: "#5d5cde",
                              cursor: "pointer",
                            }}
                          >
                            Tittle :{" "}
                            <strong style={{ color: "black" }}>
                              {data.summary}
                            </strong>
                          </Typography>
                        </Tooltip>
                      </Box>
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
            {TaskAsignProFind &&
              TaskAsignProFind.AssighnTasks.map((data, index) => {
                if (data.status === "Progressing")
                  return (
                    <Paper
                      key={index}
                      sx={{
                        justifyContent: "space-around",
                        boxShadow: 3,
                        backgroundColor: "white",
                        width: "320px",
                        height: "auto",
                        ml: 1.5,
                        mt: 1,
                      }}
                    >
                      {new Date(data.estimate) < new Date().getTime() && (
                        <Typography
                          sx={{
                            fontSize: "default",
                            fontWeight: "bold",
                            color: "red",
                          }}
                        >
                          You have not completed your task by the due date so
                          your rate has been reduced
                        </Typography>
                      )}
                      <FormControl sx={{ width: "250px", ml: 10, p: 2 }}>
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
                            value="Progressing"
                            label="status"
                            onChange={(e) =>
                              handleChange(
                                e,
                                TaskAsignProFind._id,
                                index,
                                data.userId,
                                data.estimate
                              )
                            }
                            sx={{ height: "30px" }}
                          >
                            <MenuItem value="Back Logs">Back Logs</MenuItem>
                            <MenuItem value="Progressing">Progressing</MenuItem>
                            <MenuItem value="Done">Done</MenuItem>
                          </Select>
                        </Tooltip>
                      </FormControl>
                      <Box boxShadow={3}>
                        <Tooltip title="Click for Details">
                          <Typography
                            onClick={() => detailOpen(index)}
                            variant="h6"
                            align="center"
                            style={{
                              fontWeight: "bold",
                              color: "#5d5cde",
                              cursor: "pointer",
                            }}
                          >
                            Tittle :{" "}
                            <strong style={{ color: "black" }}>
                              {data.summary}
                            </strong>
                          </Typography>
                        </Tooltip>
                      </Box>
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
            {TaskAsignProFind &&
              TaskAsignProFind.AssighnTasks.map((data, index) => {
                if (data.status === "Done") {
                  return (
                    <Paper
                      key={index}
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
                      <FormControl sx={{ ml: 10, p: 2 }}>
                        <Confetti width="auto" height="auto" />
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
                            value="Done"
                            label="status"
                            onChange={(e) =>
                              handleChange(
                                e,
                                TaskAsignProFind._id,
                                index,
                                data.userId,
                                data.estimate
                              )
                            }
                            sx={{ height: "30px", width: "180px" }}
                          >
                            <MenuItem value="Back Logs">Back Logs</MenuItem>
                            <MenuItem value="Progressing">Progressing</MenuItem>
                            <MenuItem value="Done">Done</MenuItem>
                          </Select>
                        </Tooltip>
                      </FormControl>
                      <Box boxShadow={3}>
                        <Tooltip title="Click for Details">
                          <Typography
                            onClick={() => detailOpen(index)}
                            variant="h6"
                            align="center"
                            style={{
                              fontWeight: "bold",
                              color: "#5d5cde",
                              cursor: "pointer",
                            }}
                          >
                            Tittle :
                            <strong style={{ color: "black" }}>
                              {data.summary}
                            </strong>
                          </Typography>
                        </Tooltip>
                      </Box>
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
                }
              })}
          </Box>
        )}
      </Box>
    </>
  );
}

export default Home;
