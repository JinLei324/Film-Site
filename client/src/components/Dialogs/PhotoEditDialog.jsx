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
import CreateIcon from '@material-ui/icons/Create';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';


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
  
  export default function PhotoEditDialog(){
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
        <button id="photoBtn" type="submit"  onClick={handleClickOpen}>
          <PhotoCameraIcon
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
            Edit photo
          </DialogTitle>
          <DialogContent dividers style = {{padding: 20 }}>
            <Typography gutterBottom style = {{fontSize: 10}}>
              YOUR PHOTO
            </Typography>
            <div style = {{textAlign: "center", padding: "0 40px", backgroundColor: "#eee"}}>
              <img
                className=""
                src={require("../../assets/VideoPlay/images/video.png")}
                alt="upload a photo"
                style={{width: 480}}
              />
            </div>
            
            <Button autoFocus onClick={handleClose} 
            style={{color: "#2196f3",
                    fontSize: 10,
                    fontWeight: 900
            }}>
              upload differnet photo
            </Button>
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
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
  