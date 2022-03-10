import React, { forwardRef } from "react";

const Container = forwardRef((props, ref) => {
  const { children, ...rest } = props;

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
})

export default Container;
