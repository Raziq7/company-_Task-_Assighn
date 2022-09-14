import { Box, Container } from "@mui/system";
import React, { forwardRef, useEffect } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { adminExcelResourceFindAction } from "../../action/adminAction";

function ExcelTable1() {
  const dispatch = useDispatch();
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

  const { excelResourceFind } = useSelector((state) => {
    return state.adminExcelResourceFind;
  });

  const { excelSheetInsert } = useSelector((state) => {
    return state.excelSheetAdd;
  });

  useEffect(() => {
    dispatch(adminExcelResourceFindAction());
  }, [excelSheetInsert]);

  const columns = [
    { title: "Name", field: "Name" },
    { title: "Link", field: "Link" },
  ];

  //meterial data
  let data =
    excelResourceFind &&
    excelResourceFind.map((data) => {
      return {
        Name: data.Name,
        Link: <a href={`${data.Link}`} target="_blank">{data.Link}</a>,
      };
    });

  const Wraper = {
    backgroundColor: "#fff",
    padding: 10,
    border: 20,
  };

  return (
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
          <MaterialTable
            style={{ marginTop: "10px", width: "90%", marginLeft: "59px" }}
            title="Resources"
            icons={tableIcons}
            columns={columns}
            data={data}
            options={{
              actionsColumnIndex: -1,
              filtering: true,
              pageSizeOptions: [3, 5, 10, 20],
              pageSize: 3,
            }}
          />
        </div>
      </Box>
    </Container>
  );
}

export default ExcelTable1;
