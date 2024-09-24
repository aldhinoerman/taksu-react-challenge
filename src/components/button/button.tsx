import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { TButton, TButtonSize } from "@/utils";
import { BTN_SIZE, BUTTON_TYPE } from "./utils";

interface ButtonProps
  extends React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: TButton;
  size?: TButtonSize;
  icon?: React.ReactNode;
  disabled?: boolean;
  shape?: string;
  iconPosition?: "left" | "right";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  children,
  className,
  shape,
  iconPosition = "left",
  icon,
  size,
  variant,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        shape && shape === "circle" ? "rounded-full" : "rounded-md",
        variant && !disabled ? BUTTON_TYPE[variant]?.bg : "bg-neutral-600",
        size && !shape ? BTN_SIZE[size] : !shape ? "py-1 px-4" : "p-2",
        icon ? "flex justify-center align-middle gap-1" : "",
        className ? className : ""
      )}
      disabled={disabled}
      {...rest}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

export default Button;
