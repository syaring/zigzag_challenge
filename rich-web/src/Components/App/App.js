import React, { Component } from 'react';
import { Route } from "react-router-dom";

import ChatRoom from '../ChatRoom/ChatRoom';
import Home from '../Home/Home';
import { getChatListData } from '../../lib/chatting.js';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      chatData: []
    };
  }

  componentDidMount() {
    getChatListData().then((res) => {
      this.setState({
        chatData: res
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={()=>{
            return (
              <Home
                chatData={this.state.chatData}
              />
            );
          }}
        />
        <Route
          path="/chat/:hostId"
          component={ChatRoom}
        />
      </div>
    );
  }
}

export default App;
