import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AdminFindProfileAction, imageUploadAdminAction } from "../action/adminAction";
const profileInfo = React.createContext({});
const Wraper = {
  backgroundColor: "#5D5CDE",
  padding: 10,
  border: 20,
};

const WraperA = {
  padding: 10,
  boxShadow: 3,
  overflow: "hidden",
  width: "auto",
};

function AdminProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminProFind } = useSelector((state) => {
    return state.AdminFindProfile;
  });

  const { imageUpload } = useSelector((state) => {
    return state.imageUploadUser;
  });

    useEffect(() => {
      dispatch(AdminFindProfileAction());
    }, [imageUpload]);

  const editProfile = (id) => {
    navigate(`/userHome/editprofile/${id}`);
  };

  // Navigate logout
  //   const logoutClick = () => {
  //     localStorage.getItem("staffInfo")
  //       ? localStorage.removeItem("loginInfo")
  //       : localStorage.removeItem("loginInfo");
  //     navigate("/login");
  //   };

  const uploader = new Uploader({
    apiKey: "free",
  });

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box style={WraperA}>
        <Container style={Wraper}>
          {" "}
          <Typography
            style={{
              marginBottom: "20px",
              marginLeft: "60px",
              marginTop: "20px",
              height: "auto",
            }}
            component="h2"
          >
            {" "}
            <h2 style={{ textAlign: "center" }}>Profile</h2>{" "}
          </Typography>
          <div
            style={{
              width: "50vw",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                width: "auto",
                backgroundColor: "white",
                height: "auto",
                boxShadow: 7,
                marginBottom: "10px",
                borderRadius: "2px",
                padding: "20px",
                minHeight: "300px",

                border: "2px solid black",
                borderRadius: "25px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                >
                  {adminProFind && (
                    adminProFind?.img?.length != 0 ?
                    <img
                      onClick={handleOpen}
                      src={adminProFind.img}
                      alt="chosen"
                      style={{
                        width: "150px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    /> : <Avatar sx={{ bgcolor: "blue" }} variant="square" alt={adminProFind.firstName} style={{ width: "auto", height: "150px",cursor:"pointer" }}/>
                  )}
                </div>
              </div>

              <div style={{ display: "block" }}>
                <Typography align="center" component="h5">
                  {" "}
                  <h2>{adminProFind && adminProFind.firstName}</h2>{" "}
                </Typography>
              </div>
              <div style={{ display: "block", color: "gray" }}>
                <Typography align="center" component="h5">
                  {" "}
                  <h5>NAME</h5>{" "}
                </Typography>
              </div>
              <UploadButton
                uploader={uploader}
                options={{ multi: true }}
                onComplete={(files) =>
                  dispatch(imageUploadAdminAction(files[0].fileUrl))
                }
              >
                {({ onClick }) => (
                  <button
                    style={{
                      backgroundColor: "#5D5CDE",
                      border: "none",
                      borderRadius: "5px",
                      color: "#fff",
                      width: "100%",
                      padding: "20px",
                      fontFamily: "sans-serif",
                    }}
                    onClick={onClick}
                  >
                    Upload a Image..
                  </button>
                )}
              </UploadButton>
            </div>
          </div>
        </Container>
        <Container style={Wraper}>
          <Box>
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                height: "auto",
                boxShadow: 7,
                borderRadius: "2px",
                padding: "20px",
                minHeight: "400px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography component="h5">
                  {" "}
                  {/* <h1> Profile </h1>{" "} */}
                  <ListItem>
                    <Avatar
                      style={{
                        backgroundColor: "#ff6f00",
                        width: "60px",
                        height: "60px",
                        marginBottom:"9px"
                      }}
                    >
                      <AccountCircleIcon />
                     
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography
                          style={{ marginLeft: "10px" }}
                          variant="h3"
                          gutterBottom
                        >
                          {adminProFind && adminProFind.firstName}
                        </Typography>
                      }
                      secondary="Admin"
                    />
                  </ListItem>
                </Typography>
                <Button
                  onClick={() => editProfile(adminProFind._id)}
                  variant="outlined"
                  disableElevation
                >
                  <EditIcon /> Edit{" "}
                </Button>{" "}
              </div>
              <div
                style={{
                  display: "block",
                  color: "gray",
                  marginBottom: "20px",
                }}
              >
                <Typography> Basic info, </Typography>
              </div>
              <div
                style={{
                  display: "block",
                  color: "gray",
                  fontSize: "10px",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                {/* <Text></Text> */}
                <Typography sx={{ display: "inline" }}>
                  <small>{adminProFind && adminProFind.firstName}</small>
                </Typography>
                <Typography
                  sx={{
                    display: "inline",
                    position: "absolute",
                    left: "45%",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <small>Name</small>
                </Typography>
              </div>
              <Divider />
              <div
                style={{
                  display: "block",
                  color: "gray",
                  fontSize: "10px",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                <Typography sx={{ display: "inline" }}>
                  <small>{adminProFind && adminProFind.email}</small>
                </Typography>
                <Typography
                  sx={{
                    display: "inline",
                    position: "absolute",
                    left: "45%",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <small>EMAIL</small>
                </Typography>
              </div>
              <Divider />
              <div
                style={{
                  display: "block",
                  color: "gray",
                  fontSize: "10px",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                <Typography sx={{ display: "inline" }}>
                  <small>{adminProFind && adminProFind.password}</small>
                </Typography>
                <Typography
                  sx={{
                    display: "inline",
                    position: "absolute",
                    left: "45%",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <small>password</small>
                </Typography>
              </div>
              <Divider />
              <div
                style={{
                  display: "block",
                  color: "gray",
                  fontSize: "10px",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                <Typography sx={{ display: "inline" }}>
                  <small>ACTIVE</small>
                </Typography>
                <Typography
                  sx={{
                    display: "inline",
                    position: "absolute",
                    left: "45%",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <small>Status</small>
                </Typography>
              </div>
              <Divider />
            </div>
          </Box>
        </Container>
      </Box>

      {/* Modal image */}

      {adminProFind && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img
                src={adminProFind.image}
                alt="chosen"
                style={{ width: "100%", height: "auto" }}
              />
            </Typography>
          </Box>
        </Modal>
      )}

      {/* ) : (
        ""
      )} */}
    </>
  );
}

export default AdminProfile;
