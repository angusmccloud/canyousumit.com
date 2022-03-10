import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { NumberCell, Container } from '../';

const DraggableCell = (item, index, squareSize, addPadding, locked) => {
  return (
    <Container style={{padding: addPadding ? squareSize * .1 : 0}} key={item.id}>
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
    </Container>
  );
}

export default DraggableCell;
