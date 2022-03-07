import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DraggableCell } from '../../components';
import { colorPalette, droppableCellPadding } from '../../consts';

const UnassignedContainer = (cell, squareSize, gridSize, showSums) => {
  const colors = colorPalette();
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
                  ? colors.hoverBackground
                  : "none",
                width: ((squareSize + (droppableCellPadding * 2)) * gridSize) - (droppableCellPadding * 2) + (showSums ? 60 : 0),
                minHeight: (squareSize * 3),
                borderRadius: squareSize * .2,
                borderWidth: 2,
                border: 'solid',
                borderColor: snapshot.isDraggingOver
                  ? colors.darkBlue
                  : colors.primaryBlue,
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
