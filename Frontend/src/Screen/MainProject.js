// import faker from "faker"
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  Alert,
  AlertTitle,
  Button,
  Divider,
  Modal,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";

import { useForm, Controller } from "react-hook-form";
import WYSIWYGEditor from "../component/WYSIWYGEditor";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  AdminTaskAsign,
  adminTaskAsignFindAction,
  DeleteProjectAction,
  taskAsignFindAction,
  userFindForAssighnAction,
} from "../action/adminAction";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: "100%",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
    marginLeft: "20px",
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

let USERS = [],
  STATUSES = ["Active", "Pending", "Blocked"];

//modal handles
// import Typography from '@mui/material/Typography';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "#FAFBFC !important",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MainProject() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(null);
  const [user, setUser] = useState("");
  const [label, setLabel] = useState("");
  const [priority, setPriority] = useState("");
  const [proName, setProName] = useState("");
  const [type, setType] = useState("");
  const [summary, setSummary] = useState("");
  const [estimate, setEstimate] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useSelector
  const { showUserForAsign } = useSelector((state) => {
    return state.userFindForAssighn;
  });

  const { loading, TaskAsignFind } = useSelector((state) => {
    return state.AdminTaskAsignFind;
  });

  let { TaskAsign } = useSelector((state) => {
    return state.AdminTaskAsign;
  });
  let { deletPro } = useSelector((state) => {
    return state.DeleteProject;
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
  //userFind
  useEffect(() => {
    dispatch(userFindForAssighnAction());
  }, []);

  useEffect(() => {
    dispatch(taskAsignFindAction());
  }, [TaskAsign, deletPro]);

  useEffect(() => {
    if (TaskAsign) {
      setOpen(false);
    }
  }, [TaskAsign]);

  useEffect(() => {
    dispatch(adminTaskAsignFindAction());
  }, [taskContentFind]);

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //editor submit
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const handleSubmitOnClick = ({ editor_content }) => {
    console.log("editor_content ==> ", editor_content);
    setDescription(editor_content);
  };

  //select Button
  //Form
  const userChange = (e) => {
    console.log(e.target.value);
    setUser(e.target.value);
  };
  const userLable = (e) => {
    console.log(e.target.value);
    setLabel(e.target.value);
  };

  const ChangePriority = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };

  //submit Click
  const submitClick = () => {
    console.log(
      proName,
      type,
      value,
      summary,
      description,
      user,
      label,
      estimate,
      priority
    );
    const obj = {
      proName,
      type,
      value,
      summary,
      description,
      user,
      label,
      estimate,
      priority,
    };
    if (description !== "") {
      setErrors(false);
      dispatch(AdminTaskAsign(obj));
    } else {
      setErrors(true);
    }
  };

  //openTaskClick
  const openTaskClick = (id) => {
    navigate(`/task/${id}`);
  };

  //DeleteHandler
  const DeleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteProjectAction(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        ml="50px"
        style={{
          borderRadius: 35,
          backgroundColor: "#1565C0",
          padding: "8px 16px",
          fontSize: "13px",
          color: "white",
        }}
      >
        Create Project
      </Button>

      {/* modal for Project */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            mb: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
            overflowY: "scroll",
            // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
          }}
        >
          <Typography
            align="center"
            style={{ marginTop: "5px", fontSize: "30px", color: "#5D5CDE" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Project Details
          </Typography>
          <TextField
            mt="10px"
            sx={{ m: 1, width: "55ch" }}
            label="Project Name"
            variant="standard"
            onChange={(e) => setProName(e.target.value)}
          />
          <br />
          <TextField
            onChange={(e) => {
              setType(e.target.value);
            }}
            mt="10px"
            sx={{ m: 1, width: "55ch" }}
            id="standard-basic"
            label="Enter Type"
            variant="standard"
          />
          <br />

          <Box
            style={{
              width: "auto",
              height: "100px !important",
              marginTop: "10px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Choose Project Date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>

          <Divider style={{ marginTop: "20px" }} variant="middle" />
          <Typography
            align="center"
            style={{ marginTop: "10px", fontSize: "30px", color: "#5D5CDE" }}
          >
            Task Assignment
          </Typography>
          <Typography style={{ marginTop: "10px" }}>Tasks</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={label}
            label="label"
            placeholder="Select a Task"
            onChange={(e) => userLable(e)}
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

          <TextField
            onChange={(e) => {
              setSummary(e.target.value);
            }}
            mt="10px"
            sx={{ mt: 3 }}
            label="Summary"
            variant="outlined"
            fullWidth
          />
          <br />

          <Typography style={{ marginTop: "10px" }}>Description</Typography>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              border: (theme) => `1px solid ${theme.palette.divider}`,
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

              <button type="submit" className="signup-button">
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

          <Typography style={{ marginTop: "10px" }}>Assignee</Typography>
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
              showUserForAsign.map((data) => {
                console.log(
                  data,
                  "crbug/1173575, non-JS module files deprecated.crbug/1173575, non-JS module files deprecated."
                );
                return <MenuItem value={data._id}>{data.name}</MenuItem>;
              })}
          </Select>

          <Typography style={{ marginTop: "10px" }}>
            Original Estimate
          </Typography>
          {/* <TextField
            onChange={(e) => setEstimate(e.target.value)}
            mt="10px"
            sx={{ mt: 1, width: "55ch" }}
            label="2w 1d 5h 4m"
            variant="standard"
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
          <Typography style={{ marginTop: "10px" }}>Priority</Typography>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priority}
            label="label"
            placeholder="Select a "
            onChange={(e) => ChangePriority(e)}
            sx={{ mt: 1, width: "55ch" }}
          >
            <MenuItem value="Highest">Highest</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Lowest">Lowest</MenuItem>
          </Select>

          <Button
            onClick={submitClick}
            variant="contained"
            style={{ marginTop: "25px", backgroundColor: "#1565C0 !important" }}
          >
            Submit
          </Button>

          <Box sx={{ marginTop: "50px" }}></Box>
        </Box>
      </Modal>
      {/* modal for Project */}

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>
                Project Name
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Type</TableCell>
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TaskAsignFind &&
              TaskAsignFind.map((data) => {
                return (
                  <>
                    <TableRow>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={2}>
                            <Avatar
                              className={classes.avatar}
                              variant="rounded"
                            >
                              <AssignmentIcon />
                            </Avatar>
                          </Grid>
                          <Grid item lg={10}>
                            <Typography
                              onClick={() => openTaskClick(data._id)}
                              className={classes.name}
                            >
                              {data.proName}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Typography color="primary" variant="subtitle2">
                          {data.type}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {data.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {moment(data.value).utc().format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell>
                        <Typography
                          className={classes.status}
                          // style={{
                          //     backgroundColor:
                          //     ((row.status === 'Active' && 'green') ||
                          //     (row.status === 'Pending' && 'blue') ||
                          //     (row.status === 'Blocked' && 'orange'))
                          // }}
                        >
                          <DeleteIcon
                            onClick={() => {
                              DeleteHandler(data._id);
                            }}
                          />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={USERS.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default MainProject;
