import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface UniversalDialogProps {
  title: string;
  content: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  triggerButtonText?: string;
}

export const UniversalDialog = ({
  title,
  content,
  onClose,
  onConfirm,
  confirmText = "ОК",
  cancelText = "Отмена",
  triggerButtonText = "Открыть диалог",
}: UniversalDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        {triggerButtonText}
      </Button>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelText}</Button>
          {onConfirm && <Button onClick={handleConfirm}>{confirmText}</Button>}
        </DialogActions>
      </Dialog>
    </>
  );
};
