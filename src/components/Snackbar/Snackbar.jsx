import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import useStyles from './styles';

const CustomizedSnackbar = ({ open, setOpen }) => {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div className={classes.root}>
        <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Transaction created successfully</Alert>
        </Snackbar>
    </div>
  )
}

export default CustomizedSnackbar;