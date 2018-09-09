import React from 'react';
import './ChatListItem.css';
import { getDay } from '../../utils/dates.js'

function ChatListItem (props) {
  return (
    <div className="ChatListItem">
      <img 
        className="ChatListItem-img"
        alt="hostProfile"
        src={props.imgUrl}
      />
      <div className="ChatListItem-time">
          {
            (`${props.now.getYear()}-${props.now.getMonth()}-${props.now.getDate()}` >
            `${props.lastTime.getYear()}-${props.lastTime.getMonth()}-${props.lastTime.getDate()}`) ?
            (getDay(props.lastTime.getDay())) :
            (props.lastTime.getHours() + ":" + props.lastTime.getMinutes())
          }
      </div>
      <div className="ChatListItem-container">
        <div className="ChatListItem-name">
          {props.name}
        </div>
        <div className="ChatListItem-latest">
          {props.lastMsg}
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
