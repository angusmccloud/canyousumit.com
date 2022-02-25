import { v4 as uuid } from 'uuid';
import shuffleSeed from 'shuffle-seed';
import {dateInfo} from '../index';
const _ = require('lodash');

const generatePuzzle = (gridSize, topLeftCorner, bottomRightCorner) => {
	const generateSide = (seed, sideNumber, target, cornerOne, cornerTwo, numNeeded, allNumbers) => {
		// console.log('-- Generate a side... --', sideNumber, target, cornerOne, cornerTwo, numNeeded);
		let numLeft = numNeeded;
		let totalThisRow = 0;
		while (numLeft >= 2) {
			const sumNeeded = target - cornerOne - cornerTwo - totalThisRow; // And those numbers add up to this
			// console.log('-- sumNeeded --', sumNeeded);
			// Trying to avoid too many 1s and 2s, since they make it too easy
			let count1 = allNumbers.filter((n) => n === 1).length;
			let count2 = allNumbers.filter((n) => n === 2).length;
			const min = count1 === 0 ? 1 : count2 === 0 ? 2 : 3;
			let max = sumNeeded + 3 - min - numLeft - count1 - (count2 * 2);
			max = max >= (target / 1.5) ? Math.round(max / 1.5) : max;
			const possibilities = _.range(min, max);
			// console.log('-- count1, count2, min, max, numNeeded, sumNeeded, possibilities --', count1, count2, min, max, numNeeded, sumNeeded, possibilities);
			const randomPossibilities = shuffleSeed.shuffle(possibilities, seed + `-side${sideNumber.toString()}-size${gridSize.toString()}-totalThisRow${totalThisRow.toString()}`);
			for(let i = 0; i < randomPossibilities.length; i++) {
				const num = randomPossibilities[i];
				const checkNum = allNumbers.filter((n) => n === num);
				const wouldBeLeft = target - num - cornerOne - cornerTwo - totalThisRow;
				const wouldLeaveIssue = wouldBeLeft < numLeft || (numLeft === 2 && allNumbers.filter((n) => n === wouldBeLeft).length >= 2);
				if((checkNum.length < 2 && !wouldLeaveIssue ) || i === randomPossibilities.length - 1) {
					allNumbers.push(num);
					totalThisRow += num;
					// console.log('-- Got a Num! --', num);
					break;
				}
			}

			numLeft--;
		};
		// console.log('-- And push one more... --', (target - cornerOne - cornerTwo - totalThisRow));
		allNumbers.push(target - cornerOne - cornerTwo - totalThisRow);
		return allNumbers;
	}

	// console.log('-- Let\'s generate a puzzle! --');
	const dtInfo = dateInfo();
	const { seed } = dtInfo;

	// Variable that will hold all the numbers
	let numbers = [];

	// Generate a target between gridSize-squared and gridSize-cubed
	const possibleTargets = _.range(gridSize * gridSize, gridSize * gridSize * gridSize);
	// console.log('-- possibleTargets --', possibleTargets);
	const puzzleTarget = shuffleSeed.shuffle(possibleTargets, seed + `-target`)[0];
	// Generate the corners, knowing what the target is
	const corners = generateSide(seed, 0, puzzleTarget, 0, 0, 4, numbers);
	// console.log('-- corners --', corners);
	numbers = [...corners];

	// Generate the 4 sides (between corners)
	numbers = generateSide(seed, 1, puzzleTarget, corners[0], corners[1], gridSize - 2, numbers);
	numbers = generateSide(seed, 2, puzzleTarget, corners[0], corners[2], gridSize - 2, numbers);
	numbers = generateSide(seed, 3, puzzleTarget, corners[1], corners[3], gridSize - 2, numbers);
	numbers = generateSide(seed, 4, puzzleTarget, corners[2], corners[3], gridSize - 2, numbers);
	const puzzleNumbers = numbers.map((num, index) => {
		return {
			id: uuid(),
			value: num,
			column: (index === 0 && topLeftCorner) ? 0 : (index === 3 && bottomRightCorner) ? gridSize - 1 : undefined,
			row: (index === 0 && topLeftCorner) ? 0 : (index === 3 && bottomRightCorner) ? gridSize - 1 : undefined,
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

	// console.log('-- puzzleTarget --', puzzleTarget);
	// console.log('-- puzzleNumbers --', puzzleNumbers);
	// console.log('-- puzzleCells --', puzzleCells);
	
	return({
		puzzleTarget,
		puzzleNumbers,
		puzzleCells,
	});
}

export default generatePuzzle;
