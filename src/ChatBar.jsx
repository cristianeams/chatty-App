import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {currentUser} = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value= { currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
}

export default ChatBar;