import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { DroppableCell, Text } from '../../components';
import { CircularProgress } from "@mui/material";
import { UnassignedContainer, WinnerModal } from '../../containers';
import { generatePuzzle, dateInfo, getGameStatus, setGameStatus, getGridSize, useViewport, getSquareSize, setGameHistory, getStats } from '../../utils';
import { colorPalette } from '../../consts';

const GameBoard = () => {
	const [showWinnerModal, setShowWinnerModal] = useState(false);
	// TO-DO: Investigate if there's an issue with this being an Empty Array vs. the Inital Cells I used to use
	const [cells, setCells] = useState([]);
	const [numbers, setNumbers] = useState([]);
	const [puzzleStatus, setPuzzleStatus] = useState({ rowTop: 0, rowBottom: 0, columnLeft: 0, columnRight: 0, corners: 0, unused: 0 });
	const [moves, setMoves] = useState(0);
	const [target, setTarget] = useState(0);
	const [won, setWon] = useState(false);
	const [best, setBest] = useState(0);
	
	const colors = colorPalette();
	const gridSize = getGridSize();
	const { width, height } = useViewport();
	const lockCorner = true;
	const squareSize = getSquareSize(height, width);

	// useEffect(() => {
	// 	// Load up some fake history, DEV ONLY
	// 	setGameHistory({year: 2022, month: 0, day: 1}, true, 5, 43);
	// 	setGameHistory({year: 2022, month: 0, day: 2}, true, 6, 73);
	// 	setGameHistory({year: 2022, month: 0, day: 3}, true, 4, 28);
	// 	setGameHistory({year: 2022, month: 0, day: 4}, true, 4, 33);
	// 	setGameHistory({year: 2022, month: 0, day: 5}, true, 4, 33);
	// 	setGameHistory({year: 2022, month: 0, day: 7}, true, 5, 49);
	// 	setGameHistory({year: 2022, month: 0, day: 8}, true, 5, 59);
	// 	setGameHistory({year: 2022, month: 0, day: 9}, true, 6, 82);
	// 	setGameHistory({year: 2022, month: 0, day: 10}, true, 4, 39);
	// 	setGameHistory({year: 2022, month: 0, day: 11}, true, 4, 49);
	// 	setGameHistory({year: 2022, month: 0, day: 12}, true, 4, 37);
	// 	setGameHistory({year: 2022, month: 0, day: 13}, true, 4, 58);
	// 	setGameHistory({year: 2022, month: 0, day: 14}, true, 5, 58);
	// 	setGameHistory({year: 2022, month: 0, day: 15}, false, 5, 98);
	// 	setGameHistory({year: 2022, month: 0, day: 16}, true, 6, 103);
	// 	setGameHistory({year: 2022, month: 1, day: 1}, true, 4, 46);
	// 	setGameHistory({year: 2022, month: 1, day: 2}, true, 4, 45);
	// 	setGameHistory({year: 2022, month: 1, day: 3}, true, 4, 38);
	// 	setGameHistory({year: 2022, month: 1, day: 4}, true, 5, 69);
	// 	setGameHistory({year: 2022, month: 1, day: 5}, true, 5, 52);
	// 	setGameHistory({year: 2022, month: 1, day: 6}, true, 6, 82);
	// 	setGameHistory({year: 2022, month: 1, day: 8}, true, 4, 46);
	// 	setGameHistory({year: 2022, month: 1, day: 9}, true, 4, 36);
	// 	setGameHistory({year: 2022, month: 1, day: 10}, true, 4, 58);
	// }, []);

	useEffect(() => {
		const compareDateObjects = (date1, date2) => {
			return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
		}
		// Go get the stats (so we can show Best)
		const stats = getStats();
		const bestThisSize = stats.statsByGridSize.find((g) => g.gridSize === gridSize);
		setBest(bestThisSize.fewestMoves);

		const dtInfo = dateInfo();
		const boardStatus = getGameStatus();
		// console.log('-- Reloading Page, Status --', boardStatus);
		// Go load the puzzle input
		const puzzleInput = generatePuzzle(gridSize);
		const { puzzleTarget, puzzleCells } = puzzleInput;
		// Then with puzzle input, set the cells

		let { puzzleNumbers } = puzzleInput;
		let newCells = [];
		// console.log('-- boardStatus --', boardStatus);
		if (boardStatus && boardStatus.moves && boardStatus.moves > 0 && boardStatus.numbers.length > 0 && compareDateObjects(boardStatus.date, dtInfo.today)) {
			// console.log('-- Have a Board Status --', boardStatus.cells);
			newCells = boardStatus.cells;
			puzzleNumbers = boardStatus.numbers;
			setMoves(boardStatus.moves);
		} else {
			// console.log('-- Don\'t have a Board Status for today, set a blank one! --');
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
		checkPuzzle(newCells, puzzleTarget);
		// TO-DO Need to update stats (show they started the day)
	}, []);

	useEffect(() => {
		const dtInfo = dateInfo();
		setGameStatus({ date: dtInfo.today, cells, numbers, moves, won });
		setGameHistory(dtInfo.today, won, gridSize, moves);
	}, [cells, numbers])

	const checkPuzzle = (checkCells, puzzleTarget = target) => {
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
		let winnerFlag = false
		const dtInfo = dateInfo();
		if (rowTop === puzzleTarget && rowBottom === puzzleTarget && columnLeft === puzzleTarget && columnRight === puzzleTarget && corners === puzzleTarget && unused === 0) {
			// console.log('-- YOU WIN !! --');
			winnerFlag = true;
			setShowWinnerModal(true);
			setWon(true);
			setGameStatus({ date: dtInfo.today, cells, numbers, moves, won: true });
		}
		// And update stats, winner or loser...
		setGameHistory(dtInfo.today, winnerFlag, gridSize, moves);
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
			<div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
				<DragDropContext
					onDragEnd={result => onDragEnd(result, cells, setCells, checkPuzzle)}
				>
					<div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center', height: "100%" }}>
						{/* Top Row */}
						<div style={{ display: 'flex', width: squareSize * (gridSize + 1), height: squareSize, justifyContent: 'space-between', alignItems: 'center' }}>
							{cells.filter(c => c.inGrid && c.row === 0).map((cell) => {
								return DroppableCell(cell, squareSize, lockCorner, won);
							})}
						</div>
						{/* Middle Container */}
						<div style={{ display: 'flex', flexDirection: 'row', width: squareSize * (gridSize + 1), height: squareSize * (gridSize - 2) * (1 + (1 / gridSize)), justifyContent: 'space-between', alignItems: 'center' }}>
							{/* Left Column */}
							<div style={{ display: 'flex', flexDirection: 'column', width: squareSize, justifyContent: 'space-evenly', alignItems: 'center', height: ((gridSize - 2) / gridSize) * (squareSize * (gridSize + 1)) }}>
								{cells.filter(c => c.inGrid && c.column === 0 && c.row !== 0 && c.row !== (gridSize - 1)).map((cell) => {
									return DroppableCell(cell, squareSize, lockCorner, won);
								})}
							</div>
							{/* Center Square */}
							<div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								{target === 0 ? (
									<CircularProgress />
								) : (
									<>
										<Text size='Jumbo' color={colors.darkBlue} component="div">
											{target.toString()}
										</Text>
									</>
								)}
							</div>
							{/* Right Column */}
							<div style={{ display: 'flex', flexDirection: 'column', width: squareSize, justifyContent: 'space-evenly', alignItems: 'center', height: ((gridSize - 2) / gridSize) * (squareSize * (gridSize + 1)) }}>
								{cells.filter(c => c.inGrid && c.column === (gridSize - 1) && c.row !== 0 && c.row !== (gridSize - 1)).map((cell) => {
									return DroppableCell(cell, squareSize, lockCorner, won);
								})}
							</div>
						</div>
						{/* Bottom Row */}
						<div style={{ display: 'flex', width: squareSize * (gridSize + 1), height: squareSize, justifyContent: 'space-between', alignItems: 'center' }}>
							{cells.filter(c => c.inGrid && c.row === gridSize - 1).map((cell) => {
								return DroppableCell(cell, squareSize, lockCorner, won);
							})}
						</div>
						{/* Bottom Container */}
						{!won && (
							<div style={{ display: "flex", justifyContent: "center", height: "100%", paddingTop: squareSize * .1}}>
								{target !== 0 &&
									cells.filter(c => !c.inGrid).map((cell) => {
										return UnassignedContainer(cell, squareSize, gridSize);
									})
								}
							</div>
						)}
						{/* Moves and Best */}
						{target !== 0 && (
							<div style={{ display: 'flex', width: squareSize * (gridSize + 1), flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingTop: 10}}>
								<Text size='XL' color={colors.darkBlue} component="div">
									Moves: {moves}
								</Text>
								<Text size='XL' color={colors.darkBlue} component="div">
									Best: {best}
								</Text>
							</div>
						)}
					</div>
					{/* <div>
						Width: {width}
					</div>
					<div>
						Height: {height}
					</div>
					<div>
						Square Size: {squareSize}
					</div> */}
					{/* <div>
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
					</div> */}
				</DragDropContext>
			</div>
		</>
	);
}

export default GameBoard;
