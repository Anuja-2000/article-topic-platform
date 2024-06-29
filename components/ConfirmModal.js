// components/ConfirmModal.js
import React from 'react';
import { Button} from "@mui/material";

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <p>Are you sure want to delete account?</p>
        <Button variant="contained" sx={{ marginTop: 2}} onClick={onConfirm} style={styles.button}>Yes</Button>
        <Button variant="contained" sx={{ marginTop: 2}} onClick={onCancel} style={styles.button}>No</Button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '35px',
    borderRadius: '4px',
    textAlign: 'center',
  },
  button: {
    margin: '5px',
  },
};

export default ConfirmModal;
