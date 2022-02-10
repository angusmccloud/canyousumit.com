import React from "react";
import { Typography } from '../../components';
import { colors } from '../../consts';

const NumberCell = (provided, snapshot, squareSize, item) => {
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
          ? colors.darkBlue
          : colors.primaryBlue,
        color: colors.white,
        ...provided.draggableProps.style
      }}
    >
      <Typography size='XXL' component="div" weight='medium' color={colors.white}>
        {item.value.toString()}
      </Typography>
    </div>
  );
}

export default NumberCell;
