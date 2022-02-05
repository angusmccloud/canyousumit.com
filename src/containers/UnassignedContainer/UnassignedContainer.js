import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DraggableCell } from '../../components';

const UnassignedContainer = (cell, squareSize) => {
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
                  : "lightgrey",
                width: squareSize * 5,
                minHeight: squareSize * 3,
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                flexWrap: 'wrap',
              }}
            >
              {cell.items.map((item, index) => {
                return DraggableCell(item, index, squareSize);
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
