import { Button } from "@mui/material";

interface PageButtonProps {
  text: String;
  onClick: () => void;
  type: "button" | "submit";
  color?: "primary" | "secondary" | "error" | "success";
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const PageButton: React.FC<PageButtonProps> = ({
  onClick,
  type = "button",
  color = "primary",
  variant = "contained",
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      color={color}
      variant={variant}
      disabled={disabled}
      sx={{
        width: 150,
        borderRadius: 2,
        ml: 110,
      }}
    >
      Save Changes
    </Button>
  );
};
export default PageButton;
