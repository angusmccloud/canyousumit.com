import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { NumberCell } from '../index';

const DraggableCell = (item, index, squareSize, addPadding, locked) => {
  return (
    <div style={{padding: addPadding ? squareSize * .1 : 0}} key={item.id}>
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
        isDragDisabled={locked}
      >
        {(provided, snapshot) => {
          return NumberCell(provided, snapshot, squareSize, item, locked);
        }}
      </Draggable>
    </div>
  );
}

export default DraggableCell;
