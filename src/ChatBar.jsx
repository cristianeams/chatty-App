import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super();

    this.state = {
      username: props.currentUser.name, 
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value= { this.state.username} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
}

export default ChatBar;