import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DraggableCell } from '../../components';
import { colors } from '../../consts';

const DroppableCell = (cell, squareSize, lockCorner) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}
			key={cell.id}
		>
			<Droppable droppableId={cell.id} key={cell.id} isDropDisabled={lockCorner && cell.id === '0-0'}>
				{(provided, snapshot) => {
					return (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={{
								background: snapshot.isDraggingOver
									? colors.lightBlue
									: 'none',
								width: squareSize,
								height: squareSize,
								borderRadius: squareSize * .2,
								outline: snapshot.isDraggingOver 
									? `2px solid ${colors.darkBlue}`
									: `2px solid ${colors.primaryBlue}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								overflow: 'hidden',
							}}
						>
							{cell.items.map((item, index) => {
								return DraggableCell(item, index, squareSize, false, lockCorner && cell.id === '0-0');
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
