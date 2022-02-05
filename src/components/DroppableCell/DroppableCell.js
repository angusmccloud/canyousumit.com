import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DraggableCell } from '../../components';

const DroppableCell = (cell, squareSize) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      key={cell.id}
    >
      <div>
        <Droppable droppableId={cell.id} key={cell.id}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver
                    ? "lightblue"
                    : cell.items.length > 0 ? "none" : 'lightgrey',
                  width: cell.items.length > 0 ? squareSize : squareSize - 4,
                  height: cell.items.length > 0 ? squareSize : squareSize - 4,
                  borderRadius: squareSize * .2,
                  borderColor: snapshot.isDraggingOver
                    ? 'darkblue' : 'darkgray',
                  borderWidth: cell.items.length > 0 ? 0 : 2,
                  borderStyle: 'solid',
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
    </div>
  );
};

export default DroppableCell;
