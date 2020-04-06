import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

function Button({ isLoading, ...props }: ButtonProps) {
  return (
    <button type="button" {...props}>
      {props.children}
    </button>
  );
}

export { Button };
