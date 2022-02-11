import React from "react";
import { Text } from '../../components';
import { colorPalette } from '../../consts';
import iconWhite from '../../assets/images/iconWhite.png';

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
      <Text size='XXL' component="div" weight='medium' color={colors.white}>
        {item.value.toString()}
      </Text>
      {locked &&
        <img src={iconWhite} alt="lock" style={{
          height: squareSize * .2,
          width: squareSize * .2,
          position: 'absolute',
          top: 0,
          left: 0,
          padding: squareSize * .1
        }}/>
      }
    </div>
  );
}

export default NumberCell;
