import { Box, Grid, Typography } from '@mui/material';
import React, { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userFindAction } from '../action/adminAction';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'


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

function DashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[userDetail, setUserDetail] = useState([])
  const[largest, setLargest] = useState({})

  const { showUser } = useSelector((state) => {
    return state.userFind;
  });


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
      title: "Star",
      field: "Star",
    },
    {
      title: "Rate",
      field: "rate",
    }
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
    Star:(
  <Rater total={5} rating={user.rate} interactive={false} />
  ),
  rate:Math.trunc( user.rate )
};
});

useEffect(()=>{
if(showUser) setUserDetail(showUser) 
if(userDetail.length !== 0 )setLargest(showUser.reduce(function(prev, current) {
  return (prev.rate > current.rate) ? prev : current
}))
},[showUser,largest,userDetail])

   //userFind
   useEffect(() => {
    dispatch(userFindAction());
  }, []);


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
  return (
    <>
    <Box sx={{ height:"120vh",width:"100%"}}>
    <Grid container>
      {/* {showUser && showUser.map((data)=>{ */}
        <Box
        sx={{
          boxShadow: 3,
          width: '20rem',
          height: '10rem',
          // background: 'linear-gradient(to right bottom, #C95AD0, #816FE7)',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          ml:'60px'
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 'bold',marginTop:"25px" }} color="blue">User Count</Typography>
      <Typography sx={{ fontWeight: 'bold' }} variant='h6'>{showUser && showUser.length}</Typography>
      </Box>


      <Box
        sx={{
          boxShadow: 3,
          width: '20rem',
          height: '10rem',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          ml:'60px'
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 'bold',marginTop:"25px"  }} color="blue">Highest star rate user</Typography>
      <Typography sx={{ fontWeight: 'bold' }} variant='h6'>{Object.keys(largest).length !== 0 ? largest.name : "user is not there"}</Typography>
      </Box>

      <Box
        sx={{
          boxShadow: 3,
          width: '20rem',
          height: '10rem',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          ml:'60px'
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 'bold',marginTop:"25px"  }} color="blue">Something will come</Typography>
      <Typography sx={{ fontWeight: 'bold' }} variant='h6'>Now  Empty</Typography>
      </Box>
      
  </Grid>
  <Grid container>
  <MaterialTable
        style={{ marginTop: "10px",width:"90%", marginLeft:"59px" }}
        icons={tableIcons}
        columns={columns}
        data={data}        
        options={{
          actionsColumnIndex: -1,
          filtering: true,
          pageSizeOptions:[3,5, 10, 20],
          pageSize:3
        }}
      />
     
      </Grid>
      
      </Box>
    </>
  )
}

export default DashBoard;