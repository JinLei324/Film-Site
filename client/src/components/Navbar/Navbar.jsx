import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchBar from "./SearchBar.jsx";
import { connect } from "react-redux";
import {
  setVideos,
  signOut,
  setAuth,
  setAdmin,
  startLoading,
  stopLoading,
  updateVideos
} from "../../store/action";
import { database } from "../../Helper/Firebase";
import filmLyfeLogo from "../../images/logo.svg";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBarStyle: {
    paddingLeft: 10,
    paddingRight: 10
  },
  logo: {
    marginRight: theme.spacing(5),
    width: 50,
    height: 50
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  menuButton: {
    margin: theme.spacing(1),
    textTransform: "none"
  },
  otherMenuButton: {
    flexGrow: 1
  }
});

class Navbar extends React.Component {
  state = {
    width: "0px"
  };
  openNav = () => {
    this.setState({
      width: "270px"
    });
  };

  closeNav = () => {
    this.setState({
      width: "0px"
    });
  };


  componentWillMount() {
    let componentThis = this;
    let userObjString = localStorage.getItem("userObjLogin");
    // Checking if the admin has checked keeped logged in
    let admin = localStorage.getItem("7Yg83Jh");
    if (userObjString) {
      this.props.setAuth(JSON.parse(userObjString));
    } else if (admin) {
      this.props.setAdmin();
    }
    // Starding the loading
    this.props.startLoading();
    // Setting up the all videos from the the firebase
    database.ref("videos").on("value", function() {
      componentThis.props.updateVideos();
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          color="inherit"
          className={classes.appBarStyle}
        >
          <Toolbar>
            <Typography variant="h5" color="inherit">
              <img
                src={filmLyfeLogo}
                alt="FilmLyfe Logo"
                className={classes.logo}
              />
            </Typography>

            <Button
              component={Link}
              to="/"
              id="HomeNavButton"
              className={classes.menuButton}
              color="primary"
              disableFocusRipple={true}
              disableRipple={true}
            >
              Home
            </Button>
            
              <Button
                component={Link}
                id="CategoryNavButton"
                to="/category"
                className={classes.menuButton}
                disableFocusRipple={true}
                disableRipple={true}
              >
                Categories
              </Button>
            
            <div className={classes.otherMenuButton}>
              <Button
                component={Link}
                id="MessagesButton"
                to="/message"
                className={classes.menuButton}
                disableFocusRipple={true}
                disableRipple={true}
              >
                Messages
                <span style={{color: "#00AEEF",marginLeft:4,marginBottom:4}}>+1</span>
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <SearchBar />
            </div>
            
            <div id="namedpContainer">
                <div className="dpContainer" style={{display:"flex"}}>    
                
                <Link
                  to={{
                    pathname: `/user/info/1`,
                    //userObj: `${JSON.stringify(this.state.userObj)}`,
                    state: { fromDashboard: true }
                  }} style={{display:"flex",alignItems:"center" }}
                >
                  <span id="uploaderName" style={{marginRight:20,width: "max-content"}}>John Doe</span>
                  <img
                    className="dp"
                    src={require("../../assets/VideoPlay/images/dp.png")}
                    alt=""
                    style={{width: 50}}
                  />
                  
                </Link>
                
                </div>
              </div>
            {/* Hamburger Navbar for small screens */}
            <div
              id="mySidenav"
              className="sidenav"
              style={{ width: this.state.width }}
            >
              <div>
                <a
                  href="javascript:void(0)"
                  className="closebtn"
                  onClick={this.closeNav}
                >
                  &times;
                </a>
              </div>
              <Link className="list" to="/">
                Home
              </Link>
              <Link className="list" to="/category">
                Categories
              </Link>
              <Link className="list" to="/message">
                Messages
              </Link>
              <Link className="list" to="/signin">
                Sign In
              </Link>
              
              {/* <Button
            variant="outlined"
            color="primary"
            style={{ borderRadius: 30 }}
            disableFocusRipple={true}
            disableRipple={true}
          >
            SUBMIT FILM
          </Button> */}
              {/* <Link className="list" to="/blogPage/">
              {this.props.language.navbar.blog}
            </Link>
            <Link className="list" to="/aboutUs/">
              {this.props.language.navbar.about}
            </Link> */}
            </div>

            <span
              className="openNavBtn"
              style={{ fontSize: "30px", cursor: "pointer", float: "right" }}
              onClick={this.openNav}
            >
              &#9776;
            </span>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    auth: state.auth,
    admin: state.admin
  };
};

const mapDispatchToProps = dispatch => ({
  signOut: _ => dispatch(signOut()),
  setAuth: user => dispatch(setAuth(user)),
  setAdmin: _ => dispatch(setAdmin()),
  setVideos: videos => dispatch(setVideos(videos)),
  startLoading: () => dispatch(startLoading()),
  stopLoading: () => dispatch(stopLoading()),
  updateVideos: () => dispatch(updateVideos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navbar));

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   setVideos,
//   signOut,
//   setAuth,
//   setAdmin,
//   startLoading,
//   stopLoading,
//   updateVideos
// } from "../../store/action";
// import { database } from "../../Helper/Firebase";

// class Navbar extends Component {
//   changeClass = () => {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//   };
//   componentWillMount() {
//     let componentThis = this;
//     let userObjString = localStorage.getItem("userObjLogin");
//     let admin = localStorage.getItem("7Yg83Jh");
//     if (userObjString) {
//       this.props.setAuth(JSON.parse(userObjString));
//     } else if (admin) {
//       this.props.setAdmin();
//     }
//     this.props.startLoading();
//     database.ref("videos").on("value", function() {
//       componentThis.props.updateVideos();
//     });
//   }
//   render() {
//     return (
//       <div className="topnav" id="myTopnav">
//         {/*  Forget about these styles and commment all that */}
//         <div>
//           {this.props.auth || this.props.admin ? (
//             <Link
//               to="/"
//               className="rightOrient"
//               onClick={() => {
//                 this.changeClass();
//                 localStorage.removeItem("userObjLogin");
//                 localStorage.removeItem("7Yg83Jh");
//                 this.props.signOut();
//               }}
//             >
//               Sign Out
//             </Link>
//           ) : null}
//           <Link
//             to="/contact"
//             onClick={this.changeClass}
//             className="rightOrient"
//           >
//             Contact us
//           </Link>
//           <Link to="/upload" onClick={this.changeClass} className="rightOrient">
//             submit your video
//           </Link>
//           <Link
//             to="/category"
//             onClick={this.changeClass}
//             className="rightOrient"
//           >
//             Categories
//           </Link>
//           {this.props.auth || this.props.admin ? (
//             <Link
//               to={this.props.auth ? "/user/account" : "/admin"}
//               onClick={this.changeClass}
//               className="rightOrient"
//             >
//               {this.props.auth ? this.props.currentUser.name : "Admin"}
//             </Link>
//           ) : (
//             <Link
//               to="/signin"
//               onClick={this.changeClass}
//               className="rightOrient"
//             >
//               Login
//             </Link>
//           )}
//           <Link to="/" onClick={this.changeClass} className="rightOrient">
//             Home
//           </Link>
//         </div>
//         <Link to="/" onClick={this.changeClass} className="leftOrient">
//           <i className="fa fa-facebook" />
//         </Link>
//         <Link
//           to="/"
//           onClick={this.changeClass}
//           aria-label="Facebook"
//           className="leftOrient"
//         >
//           <i className="fa fa-twitter" />
//         </Link>
//         <Link
//           to="/"
//           onClick={this.changeClass}
//           aria-label="Instagram"
//           className="leftOrient"
//         >
//           <i className="fa fa-instagram" />
//         </Link>
//         <Link
//           to="/"
//           onClick={this.changeClass}
//           aria-label="Youtube"
//           className="leftOrient"
//         >
//           <i className="fa fa-youtube" />
//         </Link>

//         <span className="icon" onClick={this.changeClass}>
//           <i className="fa fa-bars" />
//         </span>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     currentUser: state.currentUser,
//     auth: state.auth,
//     admin: state.admin
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   signOut: _ => dispatch(signOut()),
//   setAuth: user => dispatch(setAuth(user)),
//   setAdmin: _ => dispatch(setAdmin()),
//   setVideos: videos => dispatch(setVideos(videos)),
//   startLoading: () => dispatch(startLoading()),
//   stopLoading: () => dispatch(stopLoading()),
//   updateVideos: () => dispatch(updateVideos())
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Navbar);
