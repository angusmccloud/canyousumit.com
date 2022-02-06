import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DraggableCell } from '../../components';

const UnassignedContainer = (cell, squareSize, gridSize) => {
  return (
    <div key={cell.id}>
      <Droppable droppableId={cell.id} key={cell.id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver
                  ? "lightblue"
                  : "none",
                borderRadius: squareSize * .2,
                outline: snapshot.isDraggingOver 
									? '2px solid darkblue'
									: '2px solid darkgray',
                width: squareSize * (gridSize + 1),
                minHeight: squareSize * 3,
                display: 'flex',
                flexDirection: 'row',
                alignItems: "flex-start",
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
              }}
            >
              {cell.items.map((item, index) => {
                return DraggableCell(item, index, squareSize, true);
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default UnassignedContainer;
