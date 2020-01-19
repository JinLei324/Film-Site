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
import AddIcon from '@material-ui/icons/Add';

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
  
  export default function AddProjectDialog(){
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
        <button id="createBtn" type="submit"  onClick={handleClickOpen}>
          <AddIcon
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
            Add new project
          </DialogTitle>
          <DialogContent dividers style = {{padding: 20 }}>
            <div id="optionContainer" class="grid-container">
              <div>
                <p>Project Title</p>
                <input className="opt-item1" type="text" placeholder="Story about wolf"/>
              </div>
              <div>
                <p>Category</p>
                <select className="opt-item2" name="" id="">
                  <option value="">Film1</option>
                  <option value="">Film2</option>
                  <option value="">Film3</option>
                  <option value="">Film4</option>
                  <option value="">Film5</option>
                </select>
              </div>
              <div>
                <p>Genre</p>
                <select className="opt-item3" name="" id="">
                  <option value="">Drama1</option>
                  <option value="">Drama2</option>
                  <option value="">Drama3</option>
                  <option value="">Drama4</option>
                  <option value="">Drama5</option>
                </select>
              </div>
              <div>
                <p>Rating System</p>
                <select className="opt-item4" name="" id="">
                  <option value="">PG-17</option>
                  <option value="">PG-18</option>
                  <option value="">PG-19</option>
                  <option value="">PG-20</option>
                  <option value="">PG-21</option>
                </select>
              </div>
              
            </div>

            <div id="filmContainer">
              <p>File name</p>
              <input type="text" placeholder="Use your wolf"/>
              
              <p>Film</p>
              <div style = {{textAlign: "center", padding: "0 40px", backgroundColor: "#eee"}}>
                <img
                  className=""
                  src={require("../../assets/VideoPlay/images/video.png")}
                  alt="upload a photo"
                  style={{width: 480}}
                />
              </div>

            </div>

            <div id="dscrtContainer">
              <div className="dscrt-item1">
                <p>Description</p>
                <div id="dscrtContent">
                  kath Holden is an artist of the everyday. Inspired by the world around her.
                  Kath's creations are whimisical yet keenly abserved and a far cry from the genteel
                  meseum pieces that her contenporaries are producing.
                  Kath Holden is an artist of the everyday.
                </div>
              </div>
              <div className="dscrt-item2">
                <p>Thumbnail</p>
                <img
                  className="dscrtThumbnail"
                  src={require("../../assets/VideoPlay/images/video.png")}
                  alt="upload a photo"
                  style={{width: 150}}
                />
              </div>
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
              Publish
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
  