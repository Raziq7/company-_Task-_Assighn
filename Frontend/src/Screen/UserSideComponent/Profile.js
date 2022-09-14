// import Navbar from '../navbar/Navbar';

import { useParams } from "react-router-dom";
import { Identity } from "@mui/base";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import { UploadButton } from "react-uploader";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  imageUploadUserAction,
  userFindProfileAction,
} from "../../action/userAction";
const profileInfo = React.createContext({});
const Wraper = {
  backgroundColor: "#1976D2",
  padding: 10,
  border: 20,
};

const WraperA = {
  padding: 10,
  width: "100%",
  boxShadow: 3,
  overflow: "hidden",
};

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  // const { id } = useParams();
  // console.log("this is id of profiel   :", id);
  const [profile, setUserProfile] = useState();

  const { userFind } = useSelector((state) => {
    return state.userFindProfile;
  });

  const { imageUpload } = useSelector((state) => {
    return state.imageUploadUser;
  });

  useEffect(() => {
    dispatch(userFindProfileAction());
  }, [imageUpload]);

  const editProfile = (id) => {
    navigate(`/userHome/editprofile/${id}`);
  };

  // Navigate logout
  const logoutClick = () => {
    localStorage.getItem("staffInfo")
      ? localStorage.removeItem("loginInfo")
      : localStorage.removeItem("loginInfo");
    navigate("/login");
  };

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
        <div>
          <Button
            sx={{ backgroundColor: "#1976D2", color: "white" }}
            onClick={logoutClick}
          >
            Logout
          </Button>
        </div>
        <Container style={Wraper} sx={{ marginTop: "10px" }}>
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
            <h2>MY ACCOUNT</h2>{" "}
          </Typography>
        </Container>
        <Container style={Wraper}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3} md={3} lg={3}>
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
                    {userFind && (
                      <img
                        onClick={handleOpen}
                        src={userFind.image}
                        alt="chosen"
                        style={{ width: "150px", height: "auto",cursor:"pointer" }}
                      />
                    )}
                  </div>
                </div>

                <div style={{ display: "block" }}>
                  <Typography align="center" component="h5">
                    {" "}
                    <h2>{userFind && userFind.name}</h2>{" "}
                  </Typography>
                </div>
                <div style={{ display: "block", color: "gray" }}>
                  <Typography align="center" component="h5">
                    {" "}
                    <h5>PERSONAL PROFILE</h5>{" "}
                  </Typography>
                </div>
              </div>
              {/* <Button sx={{backgroundColor:"white",width:"100%"}} variant="white">Upload Photo</Button> */}
              <UploadButton
                uploader={uploader}
                options={{ multi: true }}
                onComplete={(files) =>
                  dispatch(imageUploadUserAction(files[0].fileUrl))
                }
              >
                {({ onClick }) => (
                  <button
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "5px",
                      color: "#333",
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

              {/* <UploadDropzone
                uploader={uploader}
                options={{ multi: true }}
                onUpdate={(files) => console.log(files)}
                width="600px"
                height="375px"
              /> */}
            </Grid>
            <Grid item xs={12} sm={9} md={9} lg={9}>
              <div
                style={{
                  width: "auto",
                  backgroundColor: "white",
                  height: "auto",
                  boxShadow: 7,
                  borderRadius: "2px",
                  padding: "20px",
                  minHeight: "400px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography component="h5">
                    {" "}
                    <h1> Profile </h1>{" "}
                  </Typography>
                  <Button
                    onClick={() => editProfile(userFind._id)}
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
                  <Typography sx={{ display: "inline" }}>
                    <small>{userFind && userFind.name}</small>
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
                    <small>name</small>
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
                    <small>{userFind && userFind.email}</small>
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
                    <small>{userFind && userFind.password}</small>
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
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Modal image */}

      {userFind && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography> */}
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img
                src={userFind.image}
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

export default Profile;
