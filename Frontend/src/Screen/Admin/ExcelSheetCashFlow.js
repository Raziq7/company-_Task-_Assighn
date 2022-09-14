import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminExcelCashFlowFindAction } from "../../action/adminAction";

function ExcelSheetCashFlow() {
  const dispatch = useDispatch();

  const { excelCashFlow } = useSelector((state) => {
    return state.adminExcelCashFlowFind;
  });

  console.log(
    excelCashFlow,
    "excelCashFlowexcelCashFlowexcelCashFlowexcelCashFlow"
  );
  useEffect(() => {
    dispatch(adminExcelCashFlowFindAction());
  }, []);

  return (
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
        justifyContent: "space-between",
        overflow: "scroll",
      }}
    >
      <ul
        style={{
          width: "auto",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelCashFlow &&
          excelCashFlow.map((data) => {
            return (
              <>
                <li>{data.Month.month1}</li>
                <li>{data.Month.month2}</li>
                <li>{data.Month.month3}</li>
                <li>{data.Month.month4}</li>
                <li>{data.Month.month5}</li>
                <li>{data.Month.month6}</li>
                <li>{data.Month.month7}</li>
                <li>{data.Month.month8}</li>
                <li>{data.Month.month9}</li>
                <li>{data.Month.month10}</li>
                <li>{data.Month.month11}</li>
                <li>{data.Month.month12}</li>
                <li>{data.Month.month13}</li>
                <li>{data.Month.month14}</li>
                <li>{data.Month.month15}</li>
                <li>{data.Month.month16}</li>
                <li>{data.Month.month17}</li>
                <li>{data.Month.month18}</li>
              </>
            );
          })}
      </ul>
      <Typography style={{ textAlign: "center", marginTop: "-10px" }}>
        Director's Loan/Capital
      </Typography>

      <ul
        style={{
          width: "auto",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelCashFlow &&
          excelCashFlow.map((data) => {
            //   console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                <li>{data.DirectorsLoan_Capital.Director1}</li>
                <li>{data.DirectorsLoan_Capital.Director2}</li>
                <li>{data.DirectorsLoan_Capital.Director3}</li>
                <li>{data.DirectorsLoan_Capital.Director4}</li>
                <li>{data.DirectorsLoan_Capital.Director5}</li>
                <li>{data.DirectorsLoan_Capital.Director6}</li>
                <li>{data.DirectorsLoan_Capital.Director7}</li>
                <li>{data.DirectorsLoan_Capital.Director8}</li>
                <li>{data.DirectorsLoan_Capital.Director9}</li>
                <li>{data.DirectorsLoan_Capital.Director10}</li>
                <li>{data.DirectorsLoan_Capital.Director11}</li>
                <li>{data.DirectorsLoan_Capital.Director12}</li>
                <li>{data.DirectorsLoan_Capital.Director13}</li>
                <li>{data.DirectorsLoan_Capital.Director14}</li>
                <li>{data.DirectorsLoan_Capital.Director15}</li>
                <li>{data.DirectorsLoan_Capital.Director16}</li>
                <li>{data.DirectorsLoan_Capital.Director17}</li>
                <li>{data.DirectorsLoan_Capital.Director18}</li>
              </>
            );
          })}
      </ul>

      {/* Top-up */}
      <Typography style={{ textAlign: "center", marginTop: "-10px" }}>
        Top-up
      </Typography>

      <ul
        style={{
          width: "auto",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
          
        }}
      >
        {excelCashFlow &&
          excelCashFlow.map((data) => {
            // console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                <li>{data.Top_up.topUp1}</li>
                <li>{data.Top_up.topUp2}</li>
                <li>{data.Top_up.topUp3}</li>
                <li>{data.Top_up.topUp4}</li>
                <li>{data.Top_up.topUp5}</li>
                <li>{data.Top_up.topUp6}</li>
                <li>{data.Top_up.topUp7}</li>
                <li>{data.Top_up.topUp8}</li>
                <li>{data.Top_up.topUp9}</li>
                <li>{data.Top_up.topUp10}</li>
                <li>{data.Top_up.topUp11}</li>
                <li>{data.Top_up.topUp12}</li>
                <li>{data.Top_up.topUp13}</li>
                <li>{data.Top_up.topUp14}</li>
                <li>{data.Top_up.topUp15}</li>
                <li>{data.Top_up.topUp16}</li>
                <li>{data.Top_up.topUp17}</li>
                <li>{data.Top_up.topUp18}</li>
              </>
            );
          })}
      </ul>

      {/* other business */}
      <Typography style={{ textAlign: "center", marginTop: "-10px" }}>
        Revenue
      </Typography>

      <ul
        style={{
          width: "auto",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelCashFlow &&
          excelCashFlow.map((data) => {
            // console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                <li>{data.Revenue.Revenue1 && data.Revenue.Revenue1}</li>
                <li>{data.Revenue.Revenue2 && data.Revenue.Revenue2}</li>
                <li>{data.Revenue.Revenue3 && data.Revenue.Revenue3}</li>
                <li>{data.Revenue.Revenue4}</li>
                <li>{data.Revenue.Revenue5}</li>
                <li>{data.Revenue.Revenue6}</li>
                <li>{data.Revenue.Revenue7}</li>
                <li>{data.Revenue.Revenue8}</li>
                <li>{data.Revenue.Revenue9}</li>
                <li>{data.Revenue.Revenue10}</li>
                <li>{data.Revenue.Revenue11}</li>
                <li>{data.Revenue.Revenue12}</li>
                <li>{data.Revenue.Revenue13}</li>
                <li>{data.Revenue.Revenue14}</li>
                <li>{data.Revenue.Revenue15}</li>
                <li>{data.Revenue.Revenue16}</li>
                <li>{data.Revenue.Revenue17}</li>
                <li>{data.Revenue.Revenue18}</li>
              </>
            );
          })}
      </ul>

      {/* What's Going Out? (Total from EXPENSES sheet)*/}
      <Typography style={{ textAlign: "center", marginTop: "-10px" }}>
        What's Going Out? (Total from EXPENSES sheet)
      </Typography>

      <ul
        style={{
          width: "auto",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelCashFlow &&
          excelCashFlow.map((data) => {
            // console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                <li>
                  {data.WhatsComingInTotal.ComingInTotal1 &&
                    data.WhatsComingInTotal.ComingInTotal1}
                </li>
                <li>
                  {data.WhatsComingInTotal.ComingInTotal2 &&
                    data.WhatsComingInTotal.ComingInTotal2}
                </li>
                <li>
                  {data.WhatsComingInTotal.ComingInTotal3 &&
                    data.WhatsComingInTotal.ComingInTotal3}
                </li>
                <li>{data.WhatsComingInTotal.ComingInTotal4}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal5}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal6}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal7}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal8}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal9}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal10}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal11}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal12}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal13}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal14}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal15}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal16}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal17}</li>
                <li>{data.WhatsComingInTotal.ComingInTotal18}</li>
              </>
            );
          })}
      </ul>



      {/* What's Going Out? (Total from EXPENSES sheet)*/}
      <Typography style={{ textAlign: "center", marginTop: "-10px" }}>
      What's Going Out? (Total from EXPENSES sheet)
      </Typography>

      <ul
        style={{
          width: "auto",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelCashFlow &&
          excelCashFlow.map((data) => {
            // console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                <li>
                  {data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens1 &&
                    data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens1}
                </li>
                <li>
                  {data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens2 &&
                    data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens2}
                </li>
                <li>
                  {data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens3 &&
                    data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens3}
                </li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens4}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens5}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens6}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens7}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens8}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens9}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens10}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens11}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens12}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens13}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens14}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens15}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens16}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens17}</li>
                <li>{data.WhatsGoingOutTotalfromEXPENSESsheet.goingOutFromExpens18}</li>
              </>
            );
          })}
      </ul>




      {/* What Do We Have Left? Reinvest into Stock - This is our Purchasing Budget*/}
      <Typography style={{ textAlign: "center", marginTop: "-10px" }}>
      What Do We Have Left? Reinvest into Stock - This is our Purchasing Budget
      </Typography>

      <ul
        style={{
          width: "auto",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelCashFlow &&
          excelCashFlow.map((data) => {
            // console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                <li>
                  {data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock1 &&
                    data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock1}
                </li>
                <li>
                  {data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock2 &&
                    data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock2}
                </li>
                <li>
                  {data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock3 &&
                    data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock3}
                </li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock4}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock5}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock6}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock7}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock8}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock9}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock10}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock11}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock12}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock13}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock14}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock15}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock16}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock17}</li>
                <li>{data.WhatDoWeHaveLeftReinvestintoStock.ReinvestintoStock18}</li>
              </>
            );
          })}
      </ul>



       {/*Cumulative Revenue Projection
*/}
       <Typography style={{ textAlign: "center", marginTop: "-10px" }}>
       Cumulative Revenue Projection
      </Typography>

      <ul
        style={{
          width: "auto",
          backgroundColor: "#e4ede6",
          height: "auto",
          boxShadow: 7,
          borderRadius: "2px",
          padding: "20px",
          minHeight: "400px",
        }}
      >
        {excelCashFlow &&
          excelCashFlow.map((data) => {
            // console.log(Object.keys(data.Month), "datadatadatadatadatadata");

            return (
              <>
                <li>
                  {data.CumulativeRevenueProjection.CumulativeRevenueProjection1 &&
                    data.CumulativeRevenueProjection.CumulativeRevenueProjection1}
                </li>
                <li>
                  {data.CumulativeRevenueProjection.CumulativeRevenueProjection2 &&
                    data.CumulativeRevenueProjection.CumulativeRevenueProjection2}
                </li>
                <li>
                  {data.CumulativeRevenueProjection.CumulativeRevenueProjection3 &&
                    data.CumulativeRevenueProjection.CumulativeRevenueProjection3}
                </li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection4}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection5}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection6}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection7}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection8}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection9}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection10}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection11}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection12}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection13}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection14}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection15}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection16}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection17}</li>
                <li>{data.CumulativeRevenueProjection.CumulativeRevenueProjection18}</li>
              </>
            );
          })}
      </ul>
    </Box>
  );
}

export default ExcelSheetCashFlow;
