import React from "react";
import { Button } from "@mui/material";

const AppButton = ({ children, color, disabled, size, variant, sx }) => {
  const buttonStyles = {
    fontSize: 20,
    fontWeight: 700,
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "blue",
    },
  };

  return (
    <Button
      color={color}
      disabled={disabled}
      size={size}
      variant={variant}
      sx={buttonStyles}
    >
      {children}
    </Button>
  );
};

export default AppButton;
