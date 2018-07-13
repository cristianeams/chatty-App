import React from 'react';

export default function Message(props) {
 
  return (
  <div className='message'>
      <span className='message-username' style={{ color: props.color }}>{ props.username.currentUser }</span>
      <span className='message-content'>{ props.content.content }</span>
    </div>
  );
}