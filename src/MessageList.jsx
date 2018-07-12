import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    console.log(this.props);
    // Checks if incoming data is a notification or a message
    return (
        <main className="messages">
          { this.props.messages.map(message => {
            if (message.type === "incomingNotification") {
              return <Notification  
                key={ message.id }
                content={ message.content }
                />
            } else {
              return <Message
                key={ message.id }
                username={ message.username }
                content={ message.content }
                />
            }
          })
          }
      </main>
    );
  }
}

export default MessageList;