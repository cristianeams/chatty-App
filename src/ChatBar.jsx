import React, {Component} from 'react';

class ChatBar extends Component {
  

  render() {
    const { currentUser} = this.props;
    const addMessage = event => {
      if (event.key === 'Enter') {
        const newMessage = {
          username: currentUser,
          id: 4,
          content: event.target.value
        };

        this.props.addMessage(newMessage);
      }
    
    }
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue= {currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ addMessage }/>
      </footer>
    );
  }
}

export default ChatBar;
