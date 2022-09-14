import React, { forwardRef, useEffect, useState } from 'react'
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@mui/material';

// Modal meterial npm
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';


import { AdminFindAction, AdminUserProductShowAction } from '../../action/superAdminAction';


// style Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


function AdminDetailsTable() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false)
  const [adminName,setAdminName] = useState("")

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

  const { showAdmins } = useSelector((state) => {
    return state.AdminFind;
  });
  const { showUsersProject } = useSelector((state) => {
    return state.AdminUserProductShow;
  });
  

  useEffect(()=>{
    dispatch(AdminFindAction())
  },[])

  const showDetailsHandle = (id,admin)=>{
    setAdminName(admin)
    dispatch(AdminUserProductShowAction(id))
    setOpen(true);
  }

  //for Modal data
  const handleClose = () => {
    setOpen(false);
  };


  // CHILD MODAL
  const [childOpen, setChildOpen] = useState(false)
  const [index,setIndex] = useState()
  const [childData,setChildData] = useState([])


  
  const handleChildOpen = (ind) => {
    setIndex(ind)
    //child Modal Data
    setChildData(showUsersProject  &&
showUsersProject[ind].AssighnTasks.map((data,index)=>{
    return{
      userName :data.user,
      sammury:data.summary
    }

  }))
    setChildOpen(true);
  };

console.log(childData,"lllllllllllllllllllllllllllllllllllllllllll");

  const handleChildClose = () => {
    setChildOpen(false);
  };
  const columns = [
    { title: "FName", field: "fname" },
    { title: "LName", field: "lname" },
    { title: "Email", field: "email" },
    // {
    //   title: "Status",
    //   field: "status",
    // },
    {
      title: "Change Status",
      field: "action",
    },
  ];

  // columns for chaild
  const columnsModal = [
    {title : "Admin Name" , field: "adminName"},
    { title: "Project Name", field: "ProName" },
    { title: "Type", field: "type" },
    {
      title: "Users",
      field: "users",
    },
  ];
  
  // COLOUMNS FOR child MoDAL
  const childColumns = [
    {title: "User Name", field: "userName"},
    {title: "Sammury", field: "sammury"},

    

  ]
 
  //meterial data
  const data =
    showAdmins &&
    showAdmins.map((admin) => {
      return {
        fname: admin.firstName,
        lname: admin.lastName,
        email: admin.email,
        // status: (
        //   <Box color={admin.status == "Block" ? "#dd2c00" : "#69f0ae"}>
        //     {admin.status}
        //   </Box>
        // ),
        action: (
          <>
            <RemoveRedEyeIcon onClick={()=>showDetailsHandle(admin._id,admin.firstName)}/> 

          </>
        ),
      };
    });

    //meterial Modal Data
  const dataModal =
  showUsersProject &&
  showUsersProject.map((task,index) => {
    return {
      adminName : adminName && adminName,
      ProName: task.proName,
      type: task.type,
      email: task.email,
      users:(
        <>
        <VisibilityIcon onClick={()=>handleChildOpen(index)}/>
        </>
      )
    };
  });
  
  

    

    
  return (
    <>
    <Link href="/" underline="hover">
  HOME
</Link>
    <MaterialTable
        style={{ width: "100%", marginTop: "10px" }}
        icons={tableIcons}
        title="Admins"
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
        }}
      />

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 900 }}>
          <h2 id="parent-modal-title">Admin Details</h2>
          <p id="parent-modal-description">
          <MaterialTable
        style={{ width: "100%", marginTop: "10px" }}
        icons={tableIcons}
        title="Projects"
        columns={columnsModal}
        data={dataModal}
        options={{
          actionsColumnIndex: -1,
        }}
      />
          </p>


          
          {/* // CHILD MODAL */}
      <Modal
        hideBackdrop
        open={childOpen}
        onClose={handleChildClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="child-modal-title">Users and their task summary</h2>
          <p id="child-modal-description">

        <MaterialTable
        style={{ width: "auto", marginTop: "10px" }}
        icons={tableIcons}
        title="Users"
        columns={childColumns}
        data={childData.length != 0 && childData}
        options={{
          actionsColumnIndex: -1,
        }}
      />
          </p>
          <Button color="warning" onClick={handleChildClose}>Close</Button>
        </Box>
      </Modal>
        </Box>
      </Modal>
    </>
  )
}

export default AdminDetailsTable



  
      
  