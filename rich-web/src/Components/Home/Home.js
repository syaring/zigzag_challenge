import React from 'react';
import { Link } from 'react-router-dom';
import ChatListItem from '../ChatListItem/ChatListItem';

import './Home.css';

function Home (props) {
  return (
    <div>
      <header className="Home-header">
        CHAT
      </header>
      <div className="Home-Newmsg">
        +  New message
      </div>
      <div className="Home-list">
        {
          props.chatData &&
          props.chatData.map((data, index) => {
            return (
              <Link
                to={`/chat/${data.host.id}`}
                key={index}
              >
                <ChatListItem
                  imgUrl={data.host.profile_url}
                  name={data.host.name}
                  lastTime={new Date(data.last_msg.timestamp)}
                  lastMsg={data.last_msg.text}
                  now={new Date()}
                />
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}

export default Home;
