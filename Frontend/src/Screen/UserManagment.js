import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";

import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import Swal from "sweetalert2";
//meterial Table
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useDispatch, useSelector } from "react-redux";
import {
  userFindAction,
  userRegisterAction,
  userStatusChageAction,
} from "../action/adminAction";

function UserManagment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const { showUser } = useSelector((state) => {
    return state.userFind;
  });

  const { userInsert } = useSelector((state) => {
    return state.userRegister;
  });

  const { changeUserStatus } = useSelector((state) => {
    return state.userStatusChage;
  });

  const handleChange = (event, id) => {
    setStatus(event.target.value);
    dispatch(userStatusChageAction(event.target.value, id));
  };
  //meterial Talbe
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Change Status",
      field: "action",
    },
  ];

  //meterial data
  const data =
    showUser &&
    showUser.map((user) => {
      return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: (
          <Box color={user.status == "Block" ? "#dd2c00" : "#69f0ae"}>
            {user.status}
          </Box>
        ),
        action: (
          <>
            <InputLabel id="demo-simple-select-standard-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={status}
              onChange={(e) => handleChange(e, user._id)}
              label="Status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Block">Block</MenuItem>
            </Select>
          </>
        ),
      };
    });

  //userFind
  useEffect(() => {
    dispatch(userFindAction());
  }, [userInsert, changeUserStatus]);

  //sweetAlert
  useEffect(() => {
    if (userInsert) {
      setModalOpen(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [userInsert]);

  let adminExit = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  useEffect(() => {
    console.log(adminExit, "adminExitadminExitadminExit");
    if (adminExit) {
      if (!adminExit.isUserExist.isAdmin) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  });

  ///FORM MATERIAL UI
  const [phone, setPhoe] = useState();
  const handleOnChange = (value) => {
    setPhoe(value);
  };
  const [formValues, setFormValues] = useState("HELLO");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userRegisterAction(formValues, phone));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // //modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Typography
                variant="h5"
                sx={{ color: "#1565C0", fontWeight: "bold", mt: "10px" }}
              >
                Create User
              </Typography>
              <Grid item>
                <TextField
                  id="name-input"
                  name="name"
                  label="Enter User Name"
                  type="text"
                  value={formValues.name}
                  onChange={handleInputChange}
                  sx={{ marginTop: "20px" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="name-input"
                  aria-label="empty textarea"
                  placeholder="Enter User Email"
                  label="Enter User Email"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  sx={{ marginTop: "10px" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="name-input"
                  name="password"
                  placeholder="Enter User Password"
                  label="Enter User Password"
                  type="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  sx={{ marginTop: "10px" }}
                />
              </Grid>
              <Grid item>
                {/* <TextField
                  id="name-input"
                  name="phone"
                  placeholder="Enter User Phone"
                  label="Enter User Phone"
                  type="text"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  sx={{ marginTop: "10px" }}
                /> */}
                <MuiPhoneNumber
                  sx={{ marginTop: "10px" }}
                  defaultCountry={"in"}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit" style={{marginTop:"15px !imoportant"}}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Box>
        <Button onClick={handleOpen} variant="contained" color="primary">
          Add User
        </Button>
      </Box>
      <MaterialTable
        style={{ width: "100%", marginTop: "10px" }}
        icons={tableIcons}
        title="User Managment"
        columns={columns}
        data={data}
        actions={[
          (rowData) => ({
            icon: () => <DeleteOutlineIcon />,
            tooltip: "Delete User",
            onClick: (event, rowData) =>
              alert("You want to delete " + rowData.name),
            disabled: rowData.birthYear < 2000,
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </>
  );
}

export default UserManagment;
