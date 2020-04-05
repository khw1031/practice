import React, { MouseEvent, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  onClick,
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button onClick={onClick} type="button" {...props}>
      {children}
    </button>
  );
}

export { Button };
