import React from 'react';

export default function Message(props) {
  console.log(props);
  return (
  <div className="message">
      <span className="message-username">{props.username.currentUser}</span>
      <span className="message-content">{props.content.content}</span>
    </div>
  );
}