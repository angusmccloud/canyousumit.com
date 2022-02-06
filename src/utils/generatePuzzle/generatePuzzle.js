import { v4 as uuid } from 'uuid';
import shuffleSeed from 'shuffle-seed';
const _ = require('lodash');

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

const generatePuzzle = (gridSize) => {
	const generateCorner = (possibleNumbers, seed, cornerNumber) => {
		return shuffleSeed.shuffle(possibleNumbers, seed + `corner${cornerNumber}`)[0]
	}

	const generateSide = (seed, sideNumber, target, cornerOne, cornerTwo, gridSize) => {
		const numNeeded = gridSize - 2;
		const sumNeeded = target - cornerOne - cornerTwo;
		const possibilities = _.range(1, sumNeeded + 2 - numNeeded);
		// console.log('-- numNeeded, sumNeeded, possibilities --', numNeeded, sumNeeded, possibilities);
		const randomPossibilities = shuffleSeed.shuffle(possibilities, seed + `side${sideNumber}`);
		const numOne = randomPossibilities[0];
		const numTwo = sumNeeded - numOne;
		return [numOne, numTwo];
	}

	console.log('-- Let\'s generate a puzzle! --');
	const possibleNumbers = _.range(1, gridSize * (gridSize) + 1);
	// console.log("-- possibleNumbers --", possibleNumbers);
	// Build the base Seed (date)
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth();
	const date = today.getDate();
	const seed = year.toString() + (month < 9 ? '0' : '') + (month + 1).toString() + (date < 10 ? '0' : '') + date.toString();
	// console.log("-- seed --", seed);
	const corners = [];
	let numbers = [];
	// Generate the corners
	corners.push(generateCorner(possibleNumbers, seed, 1));
	corners.push(generateCorner(possibleNumbers, seed, 2));
	corners.push(generateCorner(possibleNumbers, seed, 3));
	corners.push(generateCorner(possibleNumbers, seed, 4));
	// console.log('-- Corners --', corners);
	// Sum all items in Corners into puzzleTarget
	const puzzleTarget = corners.reduce((a, b) => a + b);
	// console.log('-- Puzzle Target', puzzleTarget);
	numbers = [...corners];
	// console.log('-- Only Corners --', numbers);
	// Generate the 4 sides (between corners)
	const sideOne = generateSide(seed, 1, puzzleTarget, corners[0], corners[1], gridSize);
	const sideTwo = generateSide(seed, 2, puzzleTarget, corners[0], corners[2], gridSize);
	const sideThree = generateSide(seed, 3, puzzleTarget, corners[1], corners[3], gridSize);
	const sideFour = generateSide(seed, 4, puzzleTarget, corners[2], corners[3], gridSize);
	numbers = [...numbers, ...sideOne, ...sideTwo, ...sideThree, ...sideFour];
	const puzzleNumbers = numbers.map((num, index) => {
		return {
			id: uuid(),
			value: num,
			column: index === 0 ? 0 : undefined,
			row: index === 0 ? 0 : undefined,
		}
	});
	puzzleNumbers.sort((a, b) => a.value - b.value);
	// console.log('-- puzzleNumbers --', puzzleNumbers);

	const puzzleCells = [
		{
			id: 'unassigned',
			inGrid: false,
			items: [],
			column: undefined,
			row: undefined,
		}
	];
	for(let i = 0; i < gridSize; i++) {
		for(let ii = 0; ii < gridSize; ii++) {
			if(i === 0 || ii === 0 || i === gridSize - 1 || ii === gridSize - 1) {
				puzzleCells.push(
					{
						id: `${i}-${ii}`,
						inGrid: true,
						items: [],
						column: i,
						row: ii,
					}
				)
			}
		}
	};
	// console.log('-- puzzleCells --', puzzleCells);
	
	return({
		puzzleTarget,
		puzzleNumbers,
		puzzleCells,
	});
}

export default generatePuzzle;
