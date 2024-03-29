import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function AddKeywordConfirmationDialog({ open, onClose, onConfirm, newItem }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to add this Keyword?
        </DialogContentText>
        <DialogContentText>
          <strong>Keyword Name:</strong> {newItem.keywordName}
        </DialogContentText>
        <DialogContentText>
          <strong>Description:</strong> {newItem.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddKeywordConfirmationDialog;
