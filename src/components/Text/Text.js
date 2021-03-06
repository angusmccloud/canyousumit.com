import React from "react";
import { colorPalette } from "../../consts";

const sizeConversion = {
  XXS: 8,
  XS: 10,
  S: 12,
  M: 14,
  L: 16,
  XL: 18,
  XXL: 22,
  XXXL: 26,
  Jumbo: 80,
};
const defaultSize = 'L';

const weightConversion = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
}
const defaultWeight = 'regular';

const Text = (props) => {
  const colors = colorPalette();
  const { size, color, weight, children, textAlign, rotation, ...rest } = props;
  let textColor = color || colors.black;
  let textSize = sizeConversion[size || defaultSize];
  let textWeight = weightConversion[weight || defaultWeight];
  let align = textAlign || 'left';
  let rotate = rotation || 0;

  return (
    <p style={{color: textColor, fontSize: textSize, fontWeight: textWeight, textAlign: align, marginBlock: 0, fontFamily: 'LucidaRegular', lineHeight: 1, transform: `rotate(${rotate}deg)` }} {...rest}>
      {children}
    </p>
  );
}

export default Text;
