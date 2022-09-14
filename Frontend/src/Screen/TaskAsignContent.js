import { Box, Button, Grid, TextField } from '@mui/material'
import React, { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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




import { adminTaskAsignFindAction, adminTaskContentAction, deleteTaskAsignAction } from '../action/adminAction'

function TaskAsignContent() {
   const dispacth = useDispatch()
   const [content,setContent] = useState("")


   const {taskContentFind } = useSelector((state)=>{
    return state.adminTaskAsignFind
   })
   const {taskContentAdd } = useSelector((state)=>{
    return state.adminTaskContent
   })
   

   useEffect(()=>{
 dispacth(adminTaskAsignFindAction())
   },[taskContentFind,taskContentAdd,content])


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
    { title: "Content Name", field: "contentName" }
  ];

//meterial data
const data =
taskContentFind &&
taskContentFind.map((content) => {
  return {
    contentName: content.contentName,
    _id:content._id,
};
});

const submitHandler = (e)=>{
  e.preventDefault()
    dispacth(adminTaskContentAction(content))
    setContent("")
}
  return (
    <>
    {/* <Box 
     display="flex"
    justifyContent="center"
    alignItems="center"
    style={{width:"100%"}}
     > */}
  <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{overflow:"scroll"}}>
   <Grid item xs={12} md={6} lg={6}>
    <Box boxShadow="3"
    style={{backgroundColor:"white",height:"24.1rem", textAlign:"center"}} justifyContent="center"
    alignItems="center">
      <h1 style={{fontFamily: 'Aboreto'}}>Task Add</h1>
      <form onSubmit={(e)=>submitHandler(e)} >
        <TextField
        onChange={(e)=>{setContent(e.target.value)}}
        fullWidth
        value={content}
          id="outlined-required"
          label="Required"
          placeholder='Enter the task you want'
          style={{display:"block",width:"50%",marginLeft:"150px"}}
        />
        <Button type="submit" style={{marginTop:"10px"}} variant="contained">Add</Button>
        </form>
        </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
    <MaterialTable
    style={{marginTop:"25px"}}
        icons={tableIcons}
        columns={columns}
        title = "Task"
        data={data}        
        options={{
          actionsColumnIndex: -1,
          filtering: true,
          pageSizeOptions:[3,5, 10, 20],
          pageSize:3
        }}
        actions={[
          (rowData) => ({
            icon: () => <DeleteOutlineIcon />,
            tooltip: "Delete User",
            onClick: (event, rowData) =>
              dispacth(deleteTaskAsignAction(rowData._id))
          }),
        ]}
      />
      </Grid>
     </Grid>
    </>
  )
}

export default TaskAsignContent