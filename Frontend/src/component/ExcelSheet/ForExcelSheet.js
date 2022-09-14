import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExcelTable1 from "./ExcelTable1";
import ExcelExpense from "../../Screen/Admin/ExcelExpense";
import ExcelSheetCashFlow from "../../Screen/Admin/ExcelSheetCashFlow";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ForExcelSheet() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons={false}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Resources" {...a11yProps(0)} />
          <Tab label="Expenses" {...a11yProps(1)} />
          <Tab label="Cash Flow" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ExcelTable1/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ExcelExpense/>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <ExcelSheetCashFlow/>
      </TabPanel>
    </Box>
  );
}
