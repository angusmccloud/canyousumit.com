import React from "react";
import { Text, Container } from '../';
import { colorPalette } from '../../consts';
// import iconWhite from '../../assets/images/iconWhite.png';

const NumberCell = (provided, snapshot, squareSize, item, locked) => {
  const colors = colorPalette();
  return (
    <Container
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
        backgroundColor: locked ?
          colors.lockedCell
          : colors.cell,
        color: colors.white,
        ...provided.draggableProps.style
      }}
    >
      <Text size='XXL' component="div" weight='medium' color={locked ? colors.lockedCellText : colors.cellText}>
        {item.value.toString()}
      </Text>
      {/* {locked &&
        <img src={iconWhite} alt="locked" style={{
          height: squareSize * .2,
          width: squareSize * .2,
          position: 'absolute',
          top: squareSize * .1,
          left: squareSize * .1,
          zIndex: '1'
        }}/>
      } */}
    </Container>
  );
}

export default NumberCell;
