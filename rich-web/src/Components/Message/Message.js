import React from 'react';
import './Message.css';
import profile from "../../img/profile.png";

function GetMessage (props) {
  const date = new Date(props.content.timestamp);

  return (
    <div className="Message">
      <div className="GetMessage">
        <img
          className="GetMessage-img"
          alt="host-profile"
          src={props.profile}
        />
        <p className="GetMessage-content">
          {props.content.text}
        </p>
      </div>
      <div className="GetMessage-time">
        {date.getHours() + ":" + date.getMinutes()}
      </div>
    </div>
  );
}

function SendMessage (props) {
  const date = new Date();

  return (
    <div className="Message">
      <div className="SendMessage">
        <img
          className="SendMessage-img"
          alt="profile"
          src={profile}
        />
        <p className="SendMessage-content">
          {props.content}
        </p>
        <span>
          <div className="SendMessage-time">
            {date.getHours() + ":" + date.getMinutes()}
          </div>
        </span>
      </div>
    </div>
  );  
}

export { SendMessage, GetMessage } ; 
