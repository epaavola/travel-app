import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Confrim dialog

const ConfirmDialog = (props) => {
    const { title, children, open, setOpen, onConfirm } = props;
    return (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog">
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)} color="secondary">
                    Ei
                </Button>
                <Button variant="contained" onClick={() => { setOpen(false); onConfirm() }} color="default">
                    Kyllä
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;