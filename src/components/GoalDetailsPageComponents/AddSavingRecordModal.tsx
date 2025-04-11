import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";

const AddSavingRecordModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Saving Record
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Savings Record</DialogTitle>
        <DialogContent>
          <TextField label="Amount" fullWidth margin="dense" />
          <TextField label="Description" fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleClose} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSavingRecordModal;