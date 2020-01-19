import React, { Component, useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: blue[500],
    },
  });
  
  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(1),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  
  export default function DeleteProjectDialog(){
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = (e) => {
      e.preventDefault()
      setOpen(true);
    };
    const handleClose = () =>  {
      setOpen(false);
    };
    const handleDialClick = (e) => {
      e.preventDefault()
    }
  
    return (
      <div>
        <button id="vDelBtn" type="submit" onClick = {handleClickOpen}>
          <DeleteIcon
            style = {{
              color: "white",
              width: 15
            }}
          />
        </button>
        {/* <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
          Open dialog
        </Button> */}
        <Dialog onClose={handleClose} onClick={handleDialClick}
         aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Delete project
          </DialogTitle>
          <DialogContent dividers style = {{padding: 20 }}>
            
            <div className = "delDialog-content">
              <p>Are you sure you want to delete project "Use your wolf" ?</p>
            </div>

          </DialogContent>
          <DialogActions style = {{
            justifyContent: "space-between"
          }}>
            <Button autoFocus onClick={handleClose} style = {{
              borderRadius: 25,
              border: "2px solid #2196f3",
              color: "#2196f3",
              padding: 5,
              float: "right",
              fontSize: 10,
              fontWeight: 900,
              width: 90,
              margin: 5
            }}>
              Cancel
            </Button>
            <Button autoFocus onClick={handleClose} style = {{
              backgroundColor: "#2196f3",
              border: "2px solid #2196f3",
              borderRadius: 25,
              color: "white",
              padding: 5,
              float: "left",
              fontSize: 10,
              fontWeight: 700,
              width: 90,
              margin: 5
            }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
  