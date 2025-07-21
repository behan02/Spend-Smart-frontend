import { Button } from "@mui/material";
import { ReactNode } from "react";

interface PageButtonProps {
  text: string;
  onClick: () => void;
  type: "button" | "submit";
  color?: "primary" | "secondary" | "error" | "success";
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  startIcon?: ReactNode;
}

const PageButton: React.FC<PageButtonProps> = ({
  text,
  onClick,
  type = "button",
  color = "primary",
  variant = "contained",
  disabled = false,
  startIcon,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      color={color}
      variant={variant}
      disabled={disabled}
      startIcon={startIcon}
      sx={{
        width: 150,
        borderRadius: 2,
        ml: 110,
      }}
    >
      {text}
    </Button>
  );
};
export default PageButton;
