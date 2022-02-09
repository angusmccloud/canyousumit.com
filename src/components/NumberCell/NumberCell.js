import React from "react";
import { Typography } from "@mui/material";


const NumberCell = (provided, snapshot, squareSize, item) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        userSelect: "none",
        height: squareSize,
        width: squareSize,
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
}

export default NumberCell;
