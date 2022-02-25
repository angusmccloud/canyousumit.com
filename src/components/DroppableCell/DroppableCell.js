import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DraggableCell } from '../../components';
import { colorPalette } from '../../consts';

const DroppableCell = (cell, squareSize, lockTopLeftCorner, won, gridSize, lockBottomRightCorner) => {
	const colors = colorPalette();
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}
			key={cell.id}
		>
			<Droppable droppableId={cell.id} key={cell.id} isDropDisabled={(lockTopLeftCorner && cell.id === '0-0') || (lockBottomRightCorner && cell.id === `${gridSize-1}-${gridSize-1}`) || won}>
				{(provided, snapshot) => {
					return (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={{
								background: snapshot.isDraggingOver
									? colors.hoverBackground
									: 'none',
								width: squareSize - 4,
								height: squareSize - 4,
								borderRadius: squareSize * .2,
								borderWidth: 2,
								border: 'solid',
								borderColor: (lockTopLeftCorner && cell.id === '0-0') || (lockBottomRightCorner && cell.id === `${gridSize-1}-${gridSize-1}`) || won ?
									colors.darkBlue :
									snapshot.isDraggingOver
										? colors.darkBlue
										: colors.primaryBlue,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								overflow: 'hidden',
							}}
						>
							{cell.items.map((item, index) => {
								return DraggableCell(item, index, squareSize, false, (lockTopLeftCorner && cell.id === '0-0') || (lockBottomRightCorner && cell.id === `${gridSize-1}-${gridSize-1}`) || won);
							})}
							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
		</div>
	);
};

export default DroppableCell;
