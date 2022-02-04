import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { SettingsOutlined, InfoOutlined, BarChart } from '@mui/icons-material';
// import {DragList} from '../../components';
import DragList from './DragList';

const HomePage = () => {

  // const onUpdate = (e) => {
  //   console.log('-- On Update --', e);
  // }

  return (
    <>
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
              SumIt!
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
      <DragList />
    </>
  );
}

export default HomePage;







/// This worked, but wasn't pretty on mobile (you couldn't see the div you were dragging)
{/* 
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from "react-dnd-html5-backend";

const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
};

  <div>
<DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
  <div style={{ overflow: 'hidden', clear: 'both' }}>
    <DroppableArea />
  </div>
  <div style={{ overflow: 'hidden', clear: 'both' }}>
    <DraggableArea name="Glass"/>
    <DraggableArea name="Banana"/>
    <DraggableArea name="Paper"/>
  </div>
</DndProvider>
</div> */}