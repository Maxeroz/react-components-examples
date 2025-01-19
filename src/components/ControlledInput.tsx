import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

interface ControlledInputProps {
  label: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  initialValue?: string;
}

export const ControlledInput = ({
  label,
  onChange,
  onBlur,
  initialValue = "",
}: ControlledInputProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (newValue.length < 3) {
      setError("Минимум 3 символа");
    } else {
      setError("");
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(value);
    }
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        error={!!error}
        helperText={error}
        variant="outlined"
      />
    </Box>
  );
};
