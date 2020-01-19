import React, { Component } from "react";
import { disableButton, enableButton } from "../../Helper/buttonToggle";
import { connect } from "react-redux";
// import { errorMessage, success } from "../../Helper/Message";
import { database } from "../../Helper/Firebase";
import { setAuth } from "../../store/action";
import FormField from "../FormField/FormField";
import { getTextValue } from "../../Helper/getValue";
import { Modal, Empty } from "antd";
import { success } from "../../Helper/Message";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


class Message extends Component {
 
  render() {
    return (
      <div className="msg-container clearfix">
        <div className="left-container">
          <div className="person-search">
            <input type="text" placeholder="Enter user name"/>
          </div>
          <ul className="person-list">
            <li className="clearfix">
              <div className="person-item clearfix">
                <div className="person-img float-left">
                  <img src={require("../../assets/VideoPlay/images/user3.png")} alt=""/>
                  <span className="status online">
                    <FiberManualRecordIcon />
                  </span>
                </div>
                <div className="about float-left">
                  <span className="about-name">
                    Britney Pitt
                  </span>
                  <span className="about-time">
                    Yesterday
                  </span>
                  <div className="about-msg">
                    Kath Holden is an artist of the everyday. Inspired by the world
                    around her.
                  </div>
                </div>
              </div>
            </li>
            <li className="clearfix">
              <div className="person-item clearfix">
                <div className="person-img float-left">
                  <img src={require("../../assets/VideoPlay/images/user2.png")} alt=""/>
                  <span className="status offline">
                    <FiberManualRecordIcon />
                  </span>
                </div>
                <div className="about float-left">
                  <span className="about-name">
                    Joana Does
                  </span>
                  <span className="about-time">
                    a minute ago
                  </span>
                  <div className="about-msg">
                    Kath Holden is an artist of the everyday. Inspired by the world
                    around her.
                  </div>
                </div>
              </div>
            </li>
            <li className="clearfix">
              <div className="person-item clearfix">
                <div className="person-img float-left">
                  <img src={require("../../assets/VideoPlay/images/user4.png")} alt=""/>
                  <span className="status offline">
                    <FiberManualRecordIcon />
                  </span>
                </div>
                <div className="about float-left">
                  <span className="about-name">
                    Wayne Lil
                  </span>
                  <span className="about-time">
                    3 days ago
                  </span>
                  <div className="about-msg">
                    Kath Holden is an artist of the everyday. Inspired by the world
                    around her.
                  </div>
                </div>
              </div>
            </li>
            <li className="clearfix">
              <div className="person-item clearfix">
                <div className="person-img float-left">
                  <img src={require("../../assets/VideoPlay/images/user4.png")} alt=""/>
                  <span className="status online">
                    <FiberManualRecordIcon />
                  </span>
                </div>
                <div className="about float-left">
                  <span className="about-name">
                    Wayne Lil
                  </span>
                  <span className="about-time">
                    5:56 AM
                  </span>
                  <div className="about-msg">
                    Kath Holden is an artist of the everyday. Inspired by the world
                    around her.
                  </div>
                </div>
              </div>
            </li>
            <li className="clearfix">
              <div className="person-item clearfix">
                <div className="person-img float-left">
                  <img src={require("../../assets/VideoPlay/images/user1.png")} alt=""/>
                  <span className="status offline">
                    <FiberManualRecordIcon />
                  </span>
                </div>
                <div className="about float-left">
                  <span className="about-name">
                    Britney Pitt
                  </span>
                  <span className="about-time">
                    Yesterday
                  </span>
                  <div className="about-msg">
                    Kath Holden is an artist of the everyday. Inspired by the world
                    around her.
                  </div>
                </div>
              </div>
            </li>
          </ul>

        </div>
        
        <div className="right-container">
          <div className="chat-header">
            <div className="header-name">
              Britney Pitt
            </div>
            <div className="header-status">
              Online
            </div>
          </div>

          <div className="chat-history">
            <ul>
              <li className="clearfix">
                <div className="msg-info">
                  <span className="msg-info-img">
                    <img src={require("../../assets/VideoPlay/images/user3.png")} alt=""/>
                  </span>
                  <span className="msg-info-name">
                    Britney Pitt
                  </span>
                  <span className="msg-info-time">
                    13:43 PM
                  </span>

                </div>
                <div className="msg-content other-msg">
                  We have a website that neeeds some adjustments that Website html and 
                  bug fixes. and redign contact and blog section Photo android pics.
                  Also optime side speed.
                  Once all issues are find we need to ...
                </div>

              </li>

              <li className="clearfix">
                <div className="msg-info align-right">
                  <span className="msg-info-img">
                    <img src={require("../../assets/VideoPlay/images/user1.png")} alt=""/>  
                  </span>  
                  <span className="msg-info-name">
                    John Doe
                  </span>
                  <span className="msg-info-time">
                    0:12 PM
                  </span>

                </div>
                <div className="msg-content my-msg float-right">
                  We have a website that neeeds some adjustments that Website html and 
                  bug fixes. and redign contact and blog section Photo android pics.
                  Also optime side speed.
                  Once all issues are find we need to ...
                </div>

              </li>
            </ul>
          </div>

          <div className="chat-msg">
            <span className="fullWidthInput">
              <input
                style={{ fullWidth: true }}
                id="commentInput"
                type="text"
                placeholder="Type a message"
              />
            </span>
            <button id="cmntBtn" type="submit">
              <img
                id="cmntIcon"
                src={require("../../assets/VideoPlay/icons/comment.png")}
                alt=""
              />
            </button>
          </div>

        </div>
      </div>
    );
  }
}


export default Message;
