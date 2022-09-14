import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findExcelExpensesAction } from "../../action/adminAction";
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
import { Box } from "@mui/system";
import { Typography } from "@material-ui/core";
function ExcelExpense() {
  const dispatch = useDispatch();

  const { excelExpenses } = useSelector((state) => {
    return state.findExcelExpenses;
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

  useEffect(() => {
    dispatch(findExcelExpensesAction());
  }, [excelExpenses]);

  //   const columns =[
  //     { title: "Month", field: "month" },
  //     { title: "Total", field: "total" },
  //   ];
  const columns =
    excelExpenses &&
    excelExpenses.map((data) => ({ title: data.month, field: data.month }));

  //meterial data
  //   let data =
  //   excelExpenses &&

  return (
    // <MaterialTable
    //         style={{ marginTop: "10px", width: "90%", marginLeft: "59px" }}
    //         title="Resources"
    //         icons={tableIcons}
    //         columns={columns}
    //         data={data}
    //         options={{
    //           actionsColumnIndex: -1,
    //           filtering: true,
    //           pageSizeOptions: [3, 5, 10, 20],
    //           pageSize: 3,
    //         }}
    //       />
    <Box
      style={{
        width: "100%",
        backgroundColor: "white",
        height: "auto",
        boxShadow: 7,
        borderRadius: "2px",
        padding: "20px",
        minHeight: "400px",
        display: "flex",
        justifyContent:"center"
      }}
    >
      <ul
        style={{
          width: "10%",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelExpenses &&
          excelExpenses.map((data) => {
            //   console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                {Object.keys(data.Month).map((data1) => {
                  return (
                    <>
                      <li>{data1}</li>
                    </>
                  );
                })}
              </>
            );
          })}
      </ul>
      <Typography style={{ textAlign: "center", marginTop: "-10px" }}>
        TOTAL EXPENSES
      </Typography>

      <ul
        style={{
          width: "10%",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelExpenses &&
          excelExpenses.map((data) => {
            //   console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 1"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 2"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 3"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 4"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 5"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 7"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 8"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 9"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 10"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 11"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 12"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 13"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 14"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 15"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 16"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 17"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 18"
                    ]
                  }
                </li>
                <li>
                  {
                    data.TOTALEXPENSESEACHMONTH.TOTALEXPENSESEACHMONTH[
                      "Month 19"
                    ]
                  }
                </li>
              </>
            );
          })}
      </ul>

      {/* other business
      <Typography style={{ textAlign: "center", marginTop: "-10px" }}>
        OTHER EXPENSES
      </Typography>

      <ul
        style={{
          width: "10%",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelExpenses &&
          excelExpenses.map((data) => {
              console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                <li>{data.OtherBusinessExpenses.Expense1}</li>
                <li>{data.OtherBusinessExpenses.Expense2}</li>
                <li>{data.OtherBusinessExpenses.Expense3}</li>
                <li>{data.OtherBusinessExpenses.Expense4}</li>
                <li>{data.OtherBusinessExpenses.Expense5}</li>
                <li>{data.OtherBusinessExpenses.Expense6}</li>
                <li>{data.OtherBusinessExpenses.Expense7}</li>
                <li>{data.OtherBusinessExpenses.Expense8}</li>
                <li>{data.OtherBusinessExpenses.Expense9}</li>
                <li>{data.OtherBusinessExpenses.Expense10}</li>
                <li>{data.OtherBusinessExpenses.Expense11}</li>
                <li>{data.OtherBusinessExpenses.Expense12}</li>
                <li>{data.OtherBusinessExpenses.Expense13}</li>
                <li>{data.OtherBusinessExpenses.Expense14}</li>
                <li>{data.OtherBusinessExpenses.Expense15}</li>
                <li>{data.OtherBusinessExpenses.Expense16}</li>
                <li>{data.OtherBusinessExpenses.Expense17}</li>
                <li>{data.OtherBusinessExpenses.Expense18}</li>
              </>
            );
          })}
      </ul>


      other business
      <Typography style={{ textAlign: "center", marginTop: "-10px" }}>
      BUSINESS MANAGMENT EXPENSES
      </Typography>

      <ul
        style={{
          width: "10%",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelExpenses &&
          excelExpenses.map((data) => {
              console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                <li>{data.BusinessManagementExpenses.AccountingTool_Xero_}</li>
                <li>{data.BusinessManagementExpenses.LinkMyBooks}</li>
                <li>{data.BusinessManagementExpenses.LinkMyBooks}</li>
                <li>{data.BusinessManagementExpenses.Expense4}</li>
                <li>{data.BusinessManagementExpenses.Expense5}</li>
                <li>{data.BusinessManagementExpenses.Expense6}</li>
                <li>{data.BusinessManagementExpenses.Expense7}</li>
                <li>{data.BusinessManagementExpenses.Expense8}</li>
                <li>{data.BusinessManagementExpenses.Expense9}</li>
                <li>{data.BusinessManagementExpenses.Expense10}</li>
                <li>{data.BusinessManagementExpenses.Expense11}</li>
                <li>{data.BusinessManagementExpenses.Expense12}</li>
                <li>{data.BusinessManagementExpenses.Expense13}</li>
                <li>{data.BusinessManagementExpenses.Expense14}</li>
                <li>{data.BusinessManagementExpenses.Expense15}</li>
                <li>{data.BusinessManagementExpenses.Expense16}</li>
                <li>{data.BusinessManagementExpenses.Expense17}</li>
                <li>{data.BusinessManagementExpenses.Expense18}</li>
              </>
            );
          })}
      </ul> */}
    </Box>
  );
}

export default ExcelExpense;
