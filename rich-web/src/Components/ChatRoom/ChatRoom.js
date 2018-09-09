import React, { Component } from 'react';
import { SendMessage, GetMessage } from '../Message/Message';
import { Link } from 'react-router-dom'

import { getHostChatData } from '../../lib/chatting.js';

import './ChatRoom.css';

class ChatRoom extends Component {

  constructor(props) {
    super(props);

    this.chatRef = React.createRef();
    
    this.state = {
      chatText: '',
      chatList: [],
      hostChatData: {},
      isLoaded: false
    };
  }
  
  componentDidMount() {
    getHostChatData(this.props.match.params.hostId).then((res) => {
      this.setState({
        hostChatData: res,
        isLoaded: true
      });
    });

    this.scrollToBottom();
  }

  componentDidUpdate(preProps, preState) {
    if(preState.chatList.length !== this.state.chatList.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight;
  }

  handleChatText(ev) {
    this.setState({
      chatText: ev.target.value
    });
  }

  createNewMessage() {
    if(this.state.chatText) {
      const chatTextTmp = this.state.chatText;

      this.setState({
        chatList: [...this.state.chatList, chatTextTmp],
        chatText: ""
      });
    }
  }

  pressedEnter(ev){
    if(ev.keyCode === 13) {
      this.createNewMessage();
    }
  }

  render() {
    return (
      <div className="ChatRoom">
        <header className="ChatRoom-header">
          <Link to='/'>
            <button id="back">
              뒤로
            </button>
          </Link>
            { 
              this.state.isLoaded &&
              this.state.hostChatData.host.name
            }
        </header>

        <section ref={this.chatRef} className="ChatRoom-content">
           {
            this.state.isLoaded &&
            this.state.hostChatData.messages.map((data, index) => {
              return(
                <GetMessage
                  profile={this.state.hostChatData.host.profile_url}
                  content={data}
                  key={index}
                />
              );
            })
          }
          {
            this.state.chatList &&
            this.state.chatList.map((data, index) => {
              return(
                <SendMessage
                  content={data}
                  key={index}
                />
              );
            })
          }
        </section>
        
        <div className="ChatRoom-input">
          <input
            className="ChatRoom-text"
            type="text"
            placeholder="Type something to send..."
            value={this.state.chatText}
            onChange={this.handleChatText.bind(this)}
            onKeyDown={this.pressedEnter.bind(this)}
          />
          <input
            type="button"
            className="ChatRoom-send"
            value="send"
            onClick={this.createNewMessage.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default ChatRoom;
