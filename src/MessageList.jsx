import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const messages= this.props.messages.map(message => {
      return <Message
        key={ message.id }
        username={ message.username }
        content={ message.content }
       />
    });

    return (
        <main className="messages">
          {messages}
         <div className="message system">
            Anonymous1 changed their name to nomnom.
          </div> 
        </main>
    );
  }
}

export default MessageList;