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
  iconPosition?: "left" | "right";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  children,
  className,
  iconPosition = "left",
  icon,
  size,
  variant,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        "rounded-md",
        variant && !disabled ? BUTTON_TYPE[variant]?.bg : "bg-neutral-600",
        size ? BTN_SIZE[size] : "py-1 px-4",
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
