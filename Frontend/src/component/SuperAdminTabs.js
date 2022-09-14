    import React, { useState } from 'react';
    import PropTypes from 'prop-types';
    import Tabs from '@mui/material/Tabs';
    import Tab from '@mui/material/Tab';
    import Typography from '@mui/material/Typography';
    import Box from '@mui/material/Box';
import AdminDetailsTable from '../Screen/SuperAdmin/AdminDetailsTable';
    
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
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    
    export default function SuperAdminTabs() {
      const [value, setValue] = useState(0);
    
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      return (
        <Box sx={{ width: '100%'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider',bgcolor:"#5D5CDE" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
              <Tab sx={{color : "white"}} label="Admin's Details" {...a11yProps(0)} />
              <Tab sx={{color : "white"}} label="Item Two" {...a11yProps(1)} />
              <Tab sx={{color : "white"}}  label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AdminDetailsTable/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      );
    }