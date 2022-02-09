import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { DroppableCell } from '../../components';
import { Typography, CircularProgress } from "@mui/material";
import { UnassignedContainer, WinnerModal } from '../../containers';
import { generatePuzzle, dateInfo } from '../../utils';

// Need to replace this initialCells with a function based on gridSize below
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

const GameBoard = () => {
	const [showWinnerModal, setShowWinnerModal] = useState(false);
	const [cells, setCells] = useState(initialCells);
	const [numbers, setNumbers] = useState([]);
	const [puzzleStatus, setPuzzleStatus] = useState({ rowTop: 0, rowBottom: 0, columnLeft: 0, columnRight: 0, corners: 0, unused: 0 })
	const [moves, setMoves] = useState(0);
	const [target, setTarget] = useState(0);
	const [won, setWon] = useState(false);
	const lockCorner = true;
	// const [lockCorner, setLockCornet] = useState(true); // For future use...
	// const [gridSize, setGridSize] = useState(4); // For future use...
	const gridSize = 4;
	// const [squareSize, setSquareSize] = useState(75); // For future use...
	const squareSize = 75;

	useEffect(() => {
		const compareDateObjects = ( date1, date2 ) => {
			return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;		
		}
		const dtInfo = dateInfo();
		const boardStatus = JSON.parse(localStorage.getItem('gameStatus'));
		console.log('-- Reloading Page, Status --', boardStatus);
		// Go load the puzzle input
		const puzzleInput = generatePuzzle(gridSize);
		const { puzzleTarget, puzzleCells } = puzzleInput;
		// Then with puzzle input, set the cells

		let { puzzleNumbers } = puzzleInput;
		let newCells = [];
		if(boardStatus !== undefined && boardStatus.moves > 0 && boardStatus.numbers.length > 0 && compareDateObjects(boardStatus.date, dtInfo.today)) {
			console.log('-- Have a Board Status --', boardStatus.cells);
			newCells = boardStatus.cells;
			puzzleNumbers = boardStatus.numbers;
			setMoves(boardStatus.moves);
		} else {
			console.log('-- Don\'t have a Board Status for today, set a blank one! --');
			newCells = puzzleCells.map((cell) => {
				if (cell.inGrid) {
					const items = puzzleNumbers.filter((item) => item.column === cell.column && item.row === cell.row);
					return {
						...cell,
						items
					};
				} else {
					const items = puzzleNumbers.filter((item) => item.column === undefined && item.row === undefined);
					return {
						...cell,
						items
					};
				}
			});
		}

		// console.log('-- set New Cells --', newCells);
		setCells(newCells);
		setNumbers(puzzleNumbers);
		setTarget(puzzleTarget);
		// TO-DO Need to update stats (show they started the day)
	}, []);

	useEffect (() => {
		const dtInfo = dateInfo();
		localStorage.setItem('gameStatus', JSON.stringify({date: dtInfo.today, cells, numbers, moves, won}));
		// TO-DO Need to update stats (# of moves for grid size, or something...)
	}, [cells, numbers])

	const checkPuzzle = (checkCells) => {
		// console.log('-- checkPuzzle --', checkCells);
		const sumArray = (array) => {
			let val = 0;
			for (let i = 0; i < array.length; i++) {
				for (let ii = 0; ii < array[i].items.length; ii++) {
					val += array[i].items[ii].value;
				}
			}
			return val;
		}

		const rowTopCells = checkCells.filter(c => c.row === 0 && c.items.length > 0);
		const rowBottomCells = checkCells.filter(c => c.row === gridSize - 1 && c.items.length > 0);
		const columnLeftCells = checkCells.filter(c => c.column === 0 && c.items.length > 0);
		const columnRightCells = checkCells.filter(c => c.column === gridSize - 1 && c.items.length > 0);
		const cornersCells = checkCells.filter(c => ((c.column === 0 && c.row === 0) || (c.column === 0 && c.row === gridSize - 1) || (c.column === gridSize - 1 && c.row === 0) || (c.column === gridSize - 1 && c.row === gridSize - 1)) && c.items.length > 0);
		const unusedCells = checkCells.filter(c => c.id === 'unassigned' && c.items.length > 0);
		const rowTop = sumArray(rowTopCells);
		const rowBottom = sumArray(rowBottomCells);
		const columnLeft = sumArray(columnLeftCells);
		const columnRight = sumArray(columnRightCells);
		const corners = sumArray(cornersCells);
		const unused = sumArray(unusedCells);
		setPuzzleStatus({ rowTop, rowBottom, columnLeft, columnRight, corners, unused });
		if(rowTop === target && rowBottom === target && columnLeft === target && columnRight === target && corners === target && unused === 0) {
			setShowWinnerModal(true);
			setWon(true);
			// TO-DO Need to update stats
			const dtInfo = dateInfo();
			localStorage.setItem('gameStatus', JSON.stringify({date: dtInfo.today, cells, numbers, moves, won: true}));
		}
	};

	const onDragEnd = (result, cells, setCells, checkPuzzle) => {
		// console.log('-- On Drag End --', result, cells);
		if (!result.destination) return;
		const { source, destination, draggableId } = result;
		// console.log('-- Source --', source);
		// console.log('-- Destination --', destination);
		// console.log('-- Draggable Id --', draggableId);

		if (source.droppableId !== destination.droppableId) {
			// console.log('-- numbers --', numbers);
			const newCells = [...cells];
			const sourceCell = newCells.find(cell => cell.id === source.droppableId);
			const destinationCell = newCells.find(cell => cell.id === destination.droppableId);
			const unassignedCell = newCells.find(cell => cell.id === 'unassigned');
			const movedItem = numbers.find(item => item.id === draggableId);
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
			setMoves(moves + 1);
		} 
		// TO-DO: Let the use rearrange the ones in the unassigned bucket
	};

	return (
		<>
			<WinnerModal showModal={setShowWinnerModal} visible={showWinnerModal} />
			<div style={{ display: "flex", justifyContent: "center", flexDirection: 'column', paddingTop: 20 }}>
			<DragDropContext
				onDragEnd={result => onDragEnd(result, cells, setCells, checkPuzzle)}
			>
				<div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center', height: "100%" }}>
					{/* Top Row */}
					<div style={{ display: 'flex', width: squareSize * (gridSize + 1), height: squareSize * (1 + (1 / gridSize)), justifyContent: 'space-between', alignItems: 'center' }}>
						{cells.filter(c => c.inGrid && c.row === 0).map((cell) => {
							return DroppableCell(cell, squareSize, lockCorner);
						})}
					</div>
					{/* Middle Container */}
					<div style={{ display: 'flex', flexDirection: 'row', width: squareSize * (gridSize + 1), height: squareSize * (gridSize - 2) * (1 + (1 / gridSize)), justifyContent: 'space-between', alignItems: 'center' }}>
						{/* Left Column */}
						<div style={{ display: 'flex', flexDirection: 'column', width: squareSize, justifyContent: 'space-evenly', alignItems: 'center', height: ((gridSize - 2) / gridSize) * (squareSize * (gridSize + 1)) }}>
							{cells.filter(c => c.inGrid && c.column === 0 && c.row !== 0 && c.row !== (gridSize - 1)).map((cell) => {
								return DroppableCell(cell, squareSize, lockCorner);
							})}
						</div>
						{/* Center Square */}
						<div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							{target === 0 ? (
								<CircularProgress />
							) : (
								<>
									<Typography variant="h1" component="div">
										{target.toString()}
									</Typography>
								</>
							)}
						</div>
						{/* Right Column */}
						<div style={{ display: 'flex', flexDirection: 'column', width: squareSize, justifyContent: 'space-evenly', alignItems: 'center', height: ((gridSize - 2) / gridSize) * (squareSize * (gridSize + 1)) }}>
							{cells.filter(c => c.inGrid && c.column === (gridSize - 1) && c.row !== 0 && c.row !== (gridSize - 1)).map((cell) => {
								return DroppableCell(cell, squareSize, lockCorner);
							})}
						</div>
					</div>
					{/* Bottom Row */}
					<div style={{ display: 'flex', width: squareSize * (gridSize + 1), height: squareSize * (1 + (1 / gridSize)), justifyContent: 'space-between', alignItems: 'center' }}>
						{cells.filter(c => c.inGrid && c.row === gridSize - 1).map((cell) => {
							return DroppableCell(cell, squareSize, lockCorner);
						})}
					</div>
					{/* Moves and Best */}
					{target !== 0 && (
						<div style={{ display: 'flex', width: squareSize * (gridSize + 1), flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingTop: 15, paddingBottom: 15 }}>
							<Typography variant="subtitle1" component="div">
								Moves: {moves}
							</Typography>
							<Typography variant="subtitle1" component="div">
								Best: 21
							</Typography>
						</div>
					)}
					{/* Bottom Container */}
					<div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
						{target !== 0 &&
							cells.filter(c => !c.inGrid).map((cell) => {
								return UnassignedContainer(cell, squareSize, gridSize);
							})
						}
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
			</DragDropContext>
		</div>
		</>
	);
}

export default GameBoard;
