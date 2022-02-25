import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { DroppableCell, Text, Dialog } from '../../components';
import { CircularProgress } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { RestartAlt, ExtensionOutlined } from '@mui/icons-material';
import { UnassignedContainer, WinnerModal } from '../../containers';
import { generatePuzzle, dateInfo, getGameStatus, setGameStatus, getGridSize, useViewport, getSquareSize, setGameHistory, getStats, getSettings } from '../../utils';
import ReactGA from "react-ga4";
import { colorPalette, googleAnalyticsId } from '../../consts';

const GameBoard = () => {
	const [showWinnerModal, setShowWinnerModal] = useState(false);
	// TO-DO: Need to track this in Local Storage
	const [cells, setCells] = useState([]);
	const [numbers, setNumbers] = useState([]);
	// const [puzzleStatus, setPuzzleStatus] = useState({ rowTop: 0, rowBottom: 0, columnLeft: 0, columnRight: 0, corners: 0, unused: 0 });
	const [moves, setMoves] = useState(0);
	const [target, setTarget] = useState(0);
	const [won, setWon] = useState(false);
	const [best, setBest] = useState(0);
	const [helpUsed, setHelpUsed] = useState(false);
	const [showResetDialog, setShowResetDialog] = useState(false);
	const [showHelpDialog, setShowHelpDialog] = useState(false);
	const settings = getSettings();
	const lockTopLeftCorner = settings.lockTopCorner;

	ReactGA.initialize([{ trackingId: googleAnalyticsId }]);

	const colors = colorPalette();
	const gridSize = getGridSize();
	const { width, height } = useViewport();
	const squareSize = getSquareSize(height, width);

	const resetBoard = (topLeftCorner, bottomRightCorner) => {
		const puzzleInput = generatePuzzle(gridSize, topLeftCorner, bottomRightCorner);
		const { puzzleTarget, puzzleCells, puzzleNumbers } = puzzleInput;
		const newCells = puzzleCells.map((cell) => {
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

		setCells(newCells);
		setNumbers(puzzleNumbers);
		setTarget(puzzleTarget);
	}

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

		if (boardStatus && boardStatus.moves && boardStatus.moves > 0 && boardStatus.numbers.length > 0 && compareDateObjects(boardStatus.date, dtInfo.today)) {
			// console.log('-- Have a Board Status --', boardStatus.cells);
			const newCells = boardStatus.cells;
			const puzzleNumbers = boardStatus.numbers;
			setMoves(boardStatus.moves);
			setHelpUsed(boardStatus.helpUsed || false);
			setCells(newCells);
			setNumbers(puzzleNumbers);
			const puzzleInput = generatePuzzle(gridSize, true, false);
			const { puzzleTarget } = puzzleInput;
			setTarget(puzzleTarget);
			checkPuzzle(newCells, puzzleTarget);
		} else {
			resetBoard(lockTopLeftCorner, helpUsed);
		}
	}, []);

	useEffect(() => {
		const dtInfo = dateInfo();
		setGameStatus({ date: dtInfo.today, cells, numbers, moves, won, helpUsed });
		setGameHistory(dtInfo.today, won, gridSize, moves);
	}, [cells, numbers, helpUsed])

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
		// setPuzzleStatus({ rowTop, rowBottom, columnLeft, columnRight, corners, unused });
		let winnerFlag = false
		const dtInfo = dateInfo();
		if (rowTop === puzzleTarget && rowBottom === puzzleTarget && columnLeft === puzzleTarget && columnRight === puzzleTarget && corners === puzzleTarget && unused === 0) {
			// console.log('-- YOU WIN !! --');
			winnerFlag = true;
			setShowWinnerModal(true);
			setWon(true);
			setGameStatus({ date: dtInfo.today, cells, numbers, moves, won: true, helpUsed });
			ReactGA.event({
				category: 'Game',
				action: 'Win',
				label: `Grid Size ${gridSize}`,
				value: moves
			});
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

			if (moves === 0) {
				// When they make their first move, let's log it
				ReactGA.event({
					category: 'Game',
					action: 'Started',
					label: `Grid Size ${gridSize}`,
					value: 1
				});
			}

			setCells(newCells);
			checkPuzzle(newCells);
			setMoves(moves + 1);
		}
		// TO-DO: Let the use rearrange the ones in the unassigned bucket
	};

	const restartClickHandler = () => {
		setShowResetDialog(true);
	}

	const handleCloseResetDialog = () => {
		setShowResetDialog(false);
	}

	const handleResetDialogConfirm = () => {
		setShowResetDialog(false);
		resetBoard(lockTopLeftCorner, helpUsed);
		setMoves(moves + 1);
	};

	const helpClickHandler = () => {
		setShowHelpDialog(true);
	}

	const handleCloseHelpDialog = () => {
		setShowHelpDialog(false);
	}

	const handleHelpDialogConfirm = () => {
		resetBoard(lockTopLeftCorner, true);
		setShowHelpDialog(false);
		setHelpUsed(true);
	};

	const resetCells = cells.filter((cell) => cell.items.length > 0 && cell.inGrid && (!lockTopLeftCorner || cell.row !== 0 || cell.column !== 0) && (!helpUsed || cell.row !== gridSize - 1 || cell.column !== gridSize - 1));
	const showResetButton = !won && resetCells.length > 0;

	return (
		<>
			<WinnerModal showModal={setShowWinnerModal} visible={showWinnerModal} gridSize={gridSize} moves={moves} target={target} />
			<div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
				<DragDropContext
					onDragEnd={result => onDragEnd(result, cells, setCells, checkPuzzle)}
				>
					<div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center', height: "100%" }}>
						{/* Top Row */}
						<div style={{ display: 'flex', width: squareSize * (gridSize + 1), height: squareSize, justifyContent: 'space-between', alignItems: 'center' }}>
							{cells.filter(c => c.inGrid && c.row === 0).map((cell) => {
								return DroppableCell(cell, squareSize, lockTopLeftCorner, won, gridSize, helpUsed);
							})}
						</div>
						{/* Middle Container */}
						<div style={{ display: 'flex', flexDirection: 'row', width: squareSize * (gridSize + 1), height: squareSize * (gridSize - 2) * (1 + (1 / gridSize)), justifyContent: 'space-between', alignItems: 'center' }}>
							{/* Left Column */}
							<div style={{ display: 'flex', flexDirection: 'column', width: squareSize, justifyContent: 'space-evenly', alignItems: 'center', height: ((gridSize - 2) / gridSize) * (squareSize * (gridSize + 1)) }}>
								{cells.filter(c => c.inGrid && c.column === 0 && c.row !== 0 && c.row !== (gridSize - 1)).map((cell) => {
									return DroppableCell(cell, squareSize, lockTopLeftCorner, won, gridSize, helpUsed);
								})}
							</div>
							{/* Center Square */}
							<div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								{target === 0 ? (
									<CircularProgress />
								) : (
									<>
										<Text size='Jumbo' color={colors.textDefault} component="div">
											{target.toString()}
										</Text>
									</>
								)}
							</div>
							{/* Right Column */}
							<div style={{ display: 'flex', flexDirection: 'column', width: squareSize, justifyContent: 'space-evenly', alignItems: 'center', height: ((gridSize - 2) / gridSize) * (squareSize * (gridSize + 1)) }}>
								{cells.filter(c => c.inGrid && c.column === (gridSize - 1) && c.row !== 0 && c.row !== (gridSize - 1)).map((cell) => {
									return DroppableCell(cell, squareSize, lockTopLeftCorner, won, gridSize, helpUsed);
								})}
							</div>
						</div>
						{/* Bottom Row */}
						<div style={{ display: 'flex', width: squareSize * (gridSize + 1), height: squareSize, justifyContent: 'space-between', alignItems: 'center' }}>
							{cells.filter(c => c.inGrid && c.row === gridSize - 1).map((cell) => {
								return DroppableCell(cell, squareSize, lockTopLeftCorner, won, gridSize, helpUsed);
							})}
						</div>
						{/* Bottom Container */}
						{!won && (
							<div style={{ display: "flex", justifyContent: "center", height: "100%", paddingTop: squareSize * .1 }}>
								{target !== 0 &&
									cells.filter(c => !c.inGrid).map((cell) => {
										return UnassignedContainer(cell, squareSize, gridSize);
									})
								}
							</div>
						)}
						{/* Moves and Best */}
						{target !== 0 && (
							<div style={{ display: 'flex', width: squareSize * (gridSize + 1), flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
								<Text size='XL' color={colors.textDefault} component="div">
									Moves: {moves}
								</Text>
								{showResetButton && (
									<IconButton
										size="small"
										edge="start"
										aria-label="Reset"
										onClick={() => restartClickHandler()}
										style={{ color: colors.textDefault }}
									>
										<RestartAlt />
									</IconButton>
								)}
								{!won && !helpUsed && (
									<IconButton
										size="small"
										edge="start"
										aria-label="Help"
										onClick={() => helpClickHandler()}
										style={{ color: colors.textDefault }}
									>
										<ExtensionOutlined />
									</IconButton>
								)}
								<Text size='XL' color={colors.textDefault} component="div">
									Best: {best}
								</Text>
							</div>
						)}
					</div>
				</DragDropContext>
				<Dialog open={showResetDialog} handleClose={handleCloseResetDialog} handleConfirmationPress={handleResetDialogConfirm} title={'Reset Board'} description={'Are you sure you want to reset the board? This can\'t be undone.'} confirmText={'Reset Board'} cancelText={'Cancel'} />
				<Dialog open={showHelpDialog} handleClose={handleCloseHelpDialog} handleConfirmationPress={handleHelpDialogConfirm} title={'Help!'} description={'Having trouble? We can give you another corner to help make things easier!'} confirmText={'Give Me That Corner!'} cancelText={'Cancel'} />
			</div>
		</>
	);
}

export default GameBoard;
