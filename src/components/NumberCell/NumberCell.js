import React from "react";
import { Typography } from '../../components';
import { colorPalette } from '../../consts';
import LockIcon from '@mui/icons-material/Lock';

const NumberCell = (provided, snapshot, squareSize, item, locked) => {
  const colors = colorPalette();
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        userSelect: "none",
        position: 'relative',
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
      {locked &&
        <LockIcon style={{
          color: colors.white,
          fontSize: squareSize * .2,
          position: 'absolute',
          top: 0,
          left: 0,
          padding: squareSize * .05
        }} />
      }
    </div>
  );
}

export default NumberCell;
