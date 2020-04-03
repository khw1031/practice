import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ onClick, children, ...props }: ButtonProps) {
  return (
    <button onClick={onClick} type="button" {...props}>
      {children}
    </button>
  );
}

export { Button };
