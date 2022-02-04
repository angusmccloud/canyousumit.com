import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';

const numbersInPuzzle = [
  { id: uuid(), value: 4, column: undefined, row: undefined },
  { id: uuid(), value: 5, column: undefined, row: undefined },
  { id: uuid(), value: 6, column: undefined, row: undefined },
  { id: uuid(), value: 7, column: undefined, row: undefined },
  { id: uuid(), value: 8, column: undefined, row: undefined },
  { id: uuid(), value: 9, column: undefined, row: undefined },
  { id: uuid(), value: 10, column: undefined, row: undefined },
  { id: uuid(), value: 11, column: 0, row: 0 },
  { id: uuid(), value: 12, column: undefined, row: undefined },
  { id: uuid(), value: 12, column: undefined, row: undefined },
  { id: uuid(), value: 14, column: undefined, row: undefined },
];

const initialCells = [
  {
    id: '0-0',
    inGrid: true,
    items: [],
    column: 0,
    row: 0,
  },
  {
    id: '1-0',
    inGrid: true,
    items: [],
    column: 1,
    row: 0,
  },
  {
    id: '2-0',
    inGrid: true,
    items: [],
    column: 2,
    row: 0,
  },
  {
    id: '3-0',
    inGrid: true,
    items: [],
    column: 3,
    row: 0,
  },
  {
    id: '0-1',
    inGrid: true,
    items: [],
    column: 0,
    row: 1,
  },
  {
    id: '3-1',
    inGrid: true,
    items: [],
    column: 3,
    row: 1,
  },
  {
    id: '0-2',
    inGrid: true,
    items: [],
    column: 0,
    row: 2,
  },
  {
    id: '3-2',
    inGrid: true,
    items: [],
    column: 3,
    row: 2,
  },
  {
    id: '0-3',
    inGrid: true,
    items: [],
    column: 0,
    row: 3,
  },
  {
    id: '1-3',
    inGrid: true,
    items: [],
    column: 1,
    row: 3,
  },
  {
    id: '2-3',
    inGrid: true,
    items: [],
    column: 2,
    row: 3,
  },
  {
    id: '3-3',
    inGrid: true,
    items: [],
    column: 3,
    row: 3,
  },
  {
    id: 'unassigned',
    inGrid: false,
    items: numbersInPuzzle,
    column: undefined,
    row: undefined,
  }
];

const onDragEnd = (result, cells, setCells) => {
  // console.log('-- On Drag End --', result, cells);
  if (!result.destination) return;
  const { source, destination, draggableId } = result;
  // console.log('-- Source --', source);
  // console.log('-- Destination --', destination);
  // console.log('-- Draggable Id --', draggableId);

  if (source.droppableId !== destination.droppableId) {
    const newCells = [...cells];
    const sourceCell = newCells.find(cell => cell.id === source.droppableId);
    const destinationCell = newCells.find(cell => cell.id === destination.droppableId);
    const unassignedCell = newCells.find(cell => cell.id === 'unassigned');
    const movedItem = numbersInPuzzle.find(item => item.id === draggableId);
    // If destination has an item, move it to unassigned
    if (destinationCell.items.length > 0) {
      unassignedCell.items.push(destinationCell.items[0]);
      destinationCell.items = [];
    }
    // Add Draggable ID to destination
    destinationCell.items.push(movedItem);
    // Remove Draggable ID from source
    sourceCell.items = sourceCell.items.filter(item => item.id !== draggableId);
    // Sort Unassigned Cell Items
    unassignedCell.items.sort((a, b) => a.value - b.value);
    // Update cells
    setCells(newCells);
  }
};

const draggableCell = (item, index) => {
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
              minHeight: 50,
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

const droppableCell = (cell) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      key={cell.id}
    >
      <div style={{ margin: 8 }}>
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
                  width: 50,
                  height: 50,
                }}
              >
                {cell.items.map((item, index) => {
                  return draggableCell(item, index);
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

const unassignedCell = (cell) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'green',
      }}
      key={cell.id}
    >
      <div style={{ margin: 8 }}>
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
                  width: 50,
                  height: 50,
                }}
              >
                {cell.items.map((item, index) => {
                  return draggableCell(item, index);
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

const HomePage = () => {
  const [cells, setCells] = useState(initialCells);
  const [gridSize, setGridSize] = useState(4);
  useEffect(() => {
    const newCells = initialCells.map((cell) => {
      if(cell.inGrid) {
        const items = numbersInPuzzle.filter((item) => item.column === cell.column && item.row === cell.row);
        return {
          ...cell,
          items
        };
      } else {
        const items = numbersInPuzzle.filter((item) => item.column === undefined && item.row === undefined);
        return {
          ...cell,
          items
        };
      }
    });
    setCells(newCells);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column', height: "100%"}}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, cells, setCells)}
      >
        <div style={{ display: "flex", justifyContent: "center", height: "100%"}}>
          {cells.filter(c => c.inGrid).map((cell) => {
            return droppableCell(cell);
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", height: "100%"}}>
          {cells.filter(c => !c.inGrid).map((cell) => {
            return unassignedCell(cell);
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default HomePage;
