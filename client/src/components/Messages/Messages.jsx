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

var userReply, componentThis;
class Messages extends Component {
  state = {
    messages: [],
    visible: false,
    currentReplyMessage: {}
  };

  showModal = messageObj => {
    this.setState(prevState => ({
      ...prevState,
      visible: true,
      currentReplyMessage: messageObj
    }));
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  onSumbitReplyForm = e => {
    e.preventDefault();
    userReply = getTextValue("replyContent");
    let unRepliedMessages = 0;
    disableButton("replyFormButton");
    let updatedMessage = this.state.messages.map(message => {
      if (
        message.userId === this.state.currentReplyMessage.userId &&
        message.userMessage === this.state.currentReplyMessage.userMessage
      ) {
        return {
          ...message,
          replied: true
        };
      } else {
        return message;
      }
    });
    updatedMessage.forEach(message => {
      if (!message.replied) {
        unRepliedMessages++;
      }
    });
    this.setState(prevState => ({
      ...prevState,
      messages: updatedMessage
    }));
    return this.setCurrentUserMessage(
      this.props.user.userId,
      updatedMessage,
      unRepliedMessages
    );
  };
  setCurrentUserMessage = (userId, updatedMessage, unRepliedMessages) => {
    //Doing to check if there are other unreplied messages in the db
    let updates = {};
    if (unRepliedMessages <= 0) {
      this.props.setAuth({
        ...this.props.user,
        newMessage: false,
        messages: JSON.stringify(updatedMessage)
      });
      updates = {
        newMessage: false,
        messages: JSON.stringify(updatedMessage)
      };
    } else {
      this.props.setAuth({
        ...this.props.user,
        newMessage: true,
        messages: JSON.stringify(updatedMessage)
      });
      updates = {
        newMessage: true,
        messages: JSON.stringify(updatedMessage)
      };
    }
    database
      .ref(`users/${userId}`)
      .update(updates)
      .then(() => {
        return componentThis.getOtherUser();
      });
  };

  getOtherUser = () => {
    database
      .ref(`users/${this.state.currentReplyMessage.userId}`)
      .once("value")
      .then(userObjFirebase => {
        let userObj = userObjFirebase.val();
        let otherUserMessagesArr = JSON.parse(userObj.messages);
        return componentThis.createMessageToSend(otherUserMessagesArr);
      });
  };
  createMessageToSend = messageArr => {
    const message = {
      userName: this.props.user.name,
      userId: this.props.user.userId,
      userMessage: userReply,
      replied: false
    };
    let updatedMessagesArr = messageArr.concat([message]);
    return this.sendMessageToOther(updatedMessagesArr);
  };
  sendMessageToOther = updatedMessagesArr => {
    database
      .ref(`users/${this.state.currentReplyMessage.userId}`)
      .update({
        newMessage: true,
        messages: JSON.stringify(updatedMessagesArr)
      })
      .then(() => {
        componentThis.setState(prevState => ({
          ...prevState,
          visible: false
        }));
        enableButton("replyFormButton");
        success("Replied Successfully");
      });
  };
  componentDidMount() {
    let messages = JSON.parse(this.props.user.messages);
    componentThis = this;
    this.setState({
      messages: messages.reverse()
    });
  }
  render() {
    return (
      <div className="mainMessages mainDiv">
        <h1>Main Messages Component</h1>
        <div id="messageDisplayDiv">
          {this.state.messages.length !== 0 ? (
            this.state.messages.map((message, i) => {
              return (
                <div key={i} className='message'>
                  <h3>
                    {message.userName} {message.replied ? null : <sup>*</sup>}
                  </h3>
                  <p>{message.userMessage}</p>
                  <button
                    className="btn"
                    onClick={() => this.showModal(message)}
                  >
                    Reply
                  </button>
                </div>
              );
            })
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
              description={<span>No Messages</span>}
            />
          )}
        </div>

        <Modal
          title={`Send Reply`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <form onSubmit={this.onSumbitReplyForm} id="replyForm">
            <FormField
              type="description"
              name="replyContent"
              id="replyContent"
              title="Write Reply"
              required={true}
              placeholder="Start Writing Reply"
            />
            <button className="btn" type="submit" id="replyFormButton">
              Send Reply
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  setAuth: user => dispatch(setAuth(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
