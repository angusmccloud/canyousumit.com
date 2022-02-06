import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Typography } from "@mui/material";


const DraggableCell = (item, index, squareSize, addPadding) => {
  return (
    <div style={{padding: addPadding ? squareSize * .1 : 0}} key={item.id}>
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
      >
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                userSelect: "none",
                height: squareSize,
                width: squareSize,
                // height: squareSize * .8,
                // width: squareSize * .8,
                borderRadius: squareSize * .2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: snapshot.isDragging
                  ? "#263B4A"
                  : "#456C86",
                color: "white",
                ...provided.draggableProps.style
              }}
            >
              <Typography variant="h5" component="div">
                {item.value.toString()}
              </Typography>
            </div>
          );
        }}
      </Draggable>
    </div>
  );
}

export default DraggableCell;
