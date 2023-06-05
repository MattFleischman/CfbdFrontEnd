import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

export default function TabPanel(props: TabPanelProps) {
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