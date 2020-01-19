import React, { Component } from "react";
import FormField from "../FormField/FormField";
import { connect } from "react-redux";
import { success, errorMessage } from "../../Helper/Message";
import { database } from "../../Helper/Firebase";
import { getTextValue, clearInput } from "../../Helper/getValue";
import uuid from "uuid";
//import cmntBtnIcon from "../../assets/VideoPlay/icons/comment.png";


class Comments extends Component {
  state = {
    comments: [{ name: "Amir Ali", value: "comment A" }],
    videoId: ""
  };
  componentDidMount() {
    this.setState({
      comments: this.props.comments,
      videoId: this.props.videoId
    });
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      comments: newProps.comments,
      videoId: newProps.videoId
    });
  }
  updateComments = commentObj => {
    let updatedComments = this.state.comments.concat([commentObj]);
    database
      .ref(`videos/${this.state.videoId}`)
      .update({
        comments: JSON.stringify(updatedComments)
      })
      .then(() => {
        success("Comment Posted Successfully");
        this.setState(prevState => {
          return {
            ...prevState,
            comments: updatedComments
          };
        });
        let videoObj = JSON.parse(localStorage.getItem("videoObj"));
        videoObj = {
          ...videoObj,
          comments: JSON.stringify(updatedComments)
        };
        localStorage.setItem("videoObj", JSON.stringify(videoObj));
      })
      .catch(err => {
        errorMessage(err.message);
      });
  };
  submitComment = e => {
    e.preventDefault();
    const userComment = getTextValue("commentInput");
    clearInput("commentInput");
    const commentObj = {
      name: this.props.user.name,
      value: userComment,
      userId: this.props.user.userId,
      commentId: uuid()
    };

    let again = false;
    this.state.comments.forEach(comment => {
      if (this.props.user.userId === comment.userId) {
        again = true;
      }
    });
    if (again === true) {
      return errorMessage("Sorry You Have Already Commented");
    } else {
      return this.updateComments(commentObj);
    }
  };

  render() {
    return (
      <div id="cmntsSection">
        <div id="cmntsTxtCntnr">
          <span id="noOfCmnts">26 &nbsp;comments</span>
        </div>
      
        <div className="fluidDiv">
          <div className="dpContainer alignTop">
            <img
              className="dp"
              src={require("../../assets/VideoPlay/images/user1.png")}
              alt=""
            />
          </div>
          <div className="cmntInptCntnr">
            <div className="newCmntTxt">
              <span>ADD NEW COMMENT</span>
            </div>
            <div>
              <form onSubmit={this.submitComment}>
                <span className="fullWidthInput">
                <input
                  style={{ fullWidth: true }}
                  id="commentInput"
                  type="text"
                  placeholder="Enter your comment"
                />
                </span>
                <button id="cmntBtn" type="submit">
                  
                  <img
                    id="cmntIcon"
                    src={require("../../assets/VideoPlay/icons/comment.png")}
                    alt=""
                  />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="fluidDiv">
          <div className="dpContainer alignTop topDpAlign">
            <img
              className="dp"
              src={require("../../assets/VideoPlay/images/user2.png")}
              alt=""
            />
          </div>
          <div className="cmntInptCntnr borderTop">
            <div className="CmntTxt">
              <span>Joanna Does</span>
              <span className="timeSince">1 day ago</span>
            </div>
          <div>
            <span>
              Kath Holden is an artist of the everyday. Inspired by the world
              around her. Kath's creations are whimsical yet keenly abserved.
            </span>
          </div>
          </div>
        </div>

        <div className="fluidDiv">
          <div className="dpContainer alignTop topDpAlign">
            <img
              className="dp"
              src={require("../../assets/VideoPlay/images/user3.png")}
              alt=""
            />
          </div>
          <div className="cmntInptCntnr borderTop">
            <div className="CmntTxt">
              <span>Britney Pitt</span>
              <span className="timeSince">2 days ago</span>
            </div>
          <div>
            <span>
              Kath Holden is an artist of the everyday. Inspired by the world
              around her.
            </span>
          </div>
          </div>
        </div>


        <div className="fluidDiv">
          <div className="dpContainer alignTop topDpAlign">
            <img
              className="dp"
              src={require("../../assets/VideoPlay/images/user4.png")}
              alt=""
            />
          </div>
          <div className="cmntInptCntnr borderTop">
            <div className="CmntTxt">
              <span>Wayne Lil</span>
              <span className="timeSince">1 week ago</span>
            </div>
          <div>
            <span>
              Norway is home to some of the most spectacular fjords on Earth.
              These v-shaped valleys carved by glaciers during the last ice
              age harbor sharp mountain ridges and long arms of sea water
              turning into a very dramatic landscape during both day and
              night.
            </span>
          </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(Comments);
