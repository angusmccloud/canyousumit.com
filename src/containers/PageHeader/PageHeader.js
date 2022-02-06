import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { SettingsOutlined, InfoOutlined, BarChart } from '@mui/icons-material';

const PageHeader = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Info"
            sx={{ mr: 2 }}
        >
            <InfoOutlined />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.pageName}
        </Typography>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Stats"
            sx={{ mr: 2 }}
        >
            <BarChart />
        </IconButton>
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="Settings"
            sx={{ mr: 2 }}
        >
            <SettingsOutlined />
        </IconButton>
        </Toolbar>
    </AppBar>
    </Box>
  );
}

export default PageHeader;
