import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';

const squareSize = 75;

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
    items: [],
    column: undefined,
    row: undefined,
  }
];

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
                return draggableCell(item, index);
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

const HomePage = () => {
  const [cells, setCells] = useState(initialCells);
  const [puzzleStatus, setPuzzleStatus] = useState({rowTop: 0, rowBottom: 0, columnLeft: 0, columnRight: 0, corners: 0, unused: 0})
  // const [target, setTarget] = ustState (35); /// For future use
  const target = 35;
  // const [gridSize, setGridSize] = useState(4); // For future use...
  const gridSize = 4;

  const checkPuzzle = (checkCells) => {
    const sumArray = (array) => {
      let val = 0;
      for(let i = 0; i < array.length; i++){
        for(let ii = 0; ii < array[i].items.length; ii++) {
          val += array[i].items[ii].value;
        }
      }
      return val;
    }

    const rowTopCells = checkCells.filter(c => c.row === 0 && c.items.length > 0);
    const rowBottomCells = checkCells.filter(c => c.row === gridSize - 1 && c.items.length > 0);
    const columnLeftCells = checkCells.filter(c => c.column === 0 && c.items.length > 0);
    const columnRightCells = checkCells.filter(c => c.column === gridSize - 1 && c.items.length > 0);
    const cornersCells = checkCells.filter(c => (c.column === 0 && c.row === 0) || (c.column === 0 && c.row === gridSize - 1) || (c.column === gridSize - 1 && c.row === 0) || (c.column === gridSize - 1 && c.row === gridSize - 1) && c.items.length > 0);
    const unusedCells = checkCells.filter(c => c.id === 'unassigned' && c.items.length > 0);
    const rowTop = sumArray(rowTopCells);
    const rowBottom = sumArray(rowBottomCells);
    const columnLeft = sumArray(columnLeftCells);
    const columnRight = sumArray(columnRightCells);
    const corners = sumArray(cornersCells);
    const unused = sumArray(unusedCells);
    setPuzzleStatus({rowTop, rowBottom, columnLeft, columnRight, corners, unused})
  };

  const onDragEnd = (result, cells, setCells, checkPuzzle) => {
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
      if (destinationCell.items.length > 0 && destinationCell !== unassignedCell) {
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
      checkPuzzle(newCells);
    }
  };

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
    checkPuzzle(newCells);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column', height: "100%"}}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, cells, setCells, checkPuzzle)}
      >
        <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center', height: "100%"}}>
          <div style={{display: 'flex', width: squareSize * (gridSize + 1), height: squareSize * 1.1, justifyContent: 'space-between', alignItems: 'center'}}>
            {cells.filter(c => c.inGrid && c.row === 0).map((cell) => {
              return droppableCell(cell);
            })}
          </div>
          <div style={{display: 'flex', width: squareSize * (gridSize + 1), height: squareSize * 1.1, justifyContent: 'space-between', alignItems: 'center'}}>
            {cells.filter(c => c.inGrid && c.row === 1).map((cell) => {
              return droppableCell(cell);
            })}
          </div>
          <div style={{display: 'flex', width: squareSize * (gridSize + 1), height: squareSize * 1.1, justifyContent: 'space-between', alignItems: 'center'}}>
            {cells.filter(c => c.inGrid && c.row === 2).map((cell) => {
              return droppableCell(cell);
            })}
          </div>
          <div style={{display: 'flex', width: squareSize * (gridSize + 1), height: squareSize * 1.1, justifyContent: 'space-between', alignItems: 'center'}}>
            {cells.filter(c => c.inGrid && c.row === 3).map((cell) => {
              return droppableCell(cell);
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", height: "100%"}}>
            {cells.filter(c => !c.inGrid).map((cell) => {
              return unassignedCell(cell);
            })}
          </div>
        </div>
        <div>
          rowTop: {puzzleStatus.rowTop}
        </div>
        <div>
          rowBottom: {puzzleStatus.rowBottom}
        </div>
        <div>
          columnLeft: {puzzleStatus.columnLeft}
        </div>
        <div>
          columnRight: {puzzleStatus.columnRight}
        </div>
        <div>
          corners: {puzzleStatus.corners}
        </div>
        <div>
          unused: {puzzleStatus.unused}
        </div>
        {puzzleStatus.rowTop === target && puzzleStatus.rowBottom === target && puzzleStatus.columnLeft === target && puzzleStatus.columnRight === target && puzzleStatus.corners === target && puzzleStatus.unused === 0 &&(
          <div>
            WINNER WINNER!!!
          </div>
        )}
      </DragDropContext>
    </div>
  );
}

export default HomePage;
