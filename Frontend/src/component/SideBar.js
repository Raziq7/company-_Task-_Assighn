import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
// import MailIcon from "@mui/icons-material/Mail";
import ListAltIcon from '@mui/icons-material/ListAlt';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

//NAVBAR
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideBar({ children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //NAV BAR
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //logoutClick
  const logoutClick = () => {
    localStorage.getItem("staffInfo")
      ? localStorage.removeItem("loginInfo")
      : localStorage.removeItem("loginInfo");
    navigate("/login");
  };

  let adminExit = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  useEffect(() => {
    if (adminExit) {
      if(adminExit.isUserExist.isSuperAdmin)
      setSuperAdmin(true);
    }
  }, []);
  // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        sx={{ backgroundColor: "#5D5CDE !important" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,color:"white" }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            {/* LOGO */}
            {/* <img data-lazyloaded="1" src="https://asinwiser.com/wp-content/uploads/2021/09/logo.png" width="230" height="auto" data-src="https://asinwiser.com/wp-content/uploads/2021/09/logo.png" alt="Sticky Logo" class="stick-logo entered litespeed-loaded" data-ll-status="loaded"></img> */}

            <img
              src="images/download.png"
              width="230"
              height="auto"
              alt="UpScale"
              class="jss164"
            ></img>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => ( 
          <Link key={setting} style={{textDecoration: 'none'}} to={setting == "Logout" && "login"}>
            <MenuItem  onClick={setting == "Logout" ? logoutClick : handleCloseUserMenu}  style={{textAlign:"center !important", width:"100%"}}>
              <Typography style={{textAlign:"center !important", width:"100%"}}>{setting}</Typography>
            </MenuItem>
            </Link>
          ))} */}

              <Link style={{ textDecoration: "none" }} to="/admin/profile">
                <MenuItem
                  onClick={handleCloseUserMenu}
                  style={{ textAlign: "center !important", width: "100%" }}
                >
                  <Typography
                    style={{ textAlign: "center !important", width: "100%" }}
                  >
                    Profile
                  </Typography>
                </MenuItem>
              </Link>

              <Link style={{ textDecoration: "none" }} to="">
                <MenuItem
                  onClick={handleCloseUserMenu}
                  style={{ textAlign: "center !important", width: "100%" }}
                >
                  <Typography
                    style={{ textAlign: "center !important", width: "100%" }}
                  >
                    Home
                  </Typography>
                </MenuItem>
              </Link>

              <MenuItem
                onClick={logoutClick}
                style={{ textAlign: "center !important", width: "100%" }}
              >
                <Typography
                  style={{ textAlign: "center !important", width: "100%" }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: "#5D5CDE" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link style={{ textDecoration: "none", color: "none" }} to="/">
            <ListItem
              disablePadding
              sx={{ height: "auto", marginTop: "10px !important" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: "#0052CC" }} />
                </ListItemIcon>
                <ListItemText primary="DashBoard" />
              </ListItemButton>
            </ListItem>
          </Link>
          {superAdmin && (
            <Link
              style={{ textDecoration: "none", color: "none" }}
              to="/superAdmin"
            >
              <ListItem
                disablePadding
                sx={{ height: "auto", marginTop: "10px !important" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon sx={{ color: "#0052CC" }} />
                  </ListItemIcon>
                  <ListItemText primary="SuperAdmin" />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          <Link style={{ textDecoration: "none", color: "none" }} to="/home">
            <ListItem
              disablePadding
              sx={{ height: "auto", marginTop: "10px !important" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <HomeOutlinedIcon sx={{ color: "#0052CC" }} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* userManagement */}
          <Link
            style={{ textDecoration: "none", color: "none" }}
            to="/userManagment"
          >
            <ListItem
              disablePadding
              sx={{ height: "auto", marginTop: "10px !important" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PeopleOutlineOutlinedIcon sx={{ color: "#0052CC" }} />
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* Tasks */}
          <Link style={{ textDecoration: "none", color: "none" }} to="/taskContantAdd">
            <ListItem
              disablePadding
              sx={{ height: "auto", marginTop: "10px !important" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <TaskAltOutlinedIcon sx={{ color: "#0052CC" }} />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* Daily Updates */}
          <Link style={{ textDecoration: "none", color: "none" }} to="/admin/Excel">
            <ListItem
              disablePadding
              sx={{ height: "auto", marginTop: "10px !important" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <ListAltIcon sx={{ color: "#0052CC" }} />
                </ListItemIcon>
                <ListItemText primary="Excel" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        {/* <Divider /> */}
      </Drawer>
      <Main
        open={open}
        sx={{ width: "100%", backgroundColor: "#F4F6F8", height: "100vh" }}
      >
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
