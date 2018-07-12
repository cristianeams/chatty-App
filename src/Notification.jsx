import React from 'react';

export default function Notification(props) {
  return (
    <div className="message-system">
      <span> { props.content } </span>
    </div>
  );
}
