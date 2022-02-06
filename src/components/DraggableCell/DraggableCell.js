import React from "react";
import { Draggable } from "react-beautiful-dnd";


const DraggableCell = (item, index, squareSize) => {
  return (
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
            {item.value.toString()}
          </div>
        );
      }}
    </Draggable>
  );
}

export default DraggableCell;
