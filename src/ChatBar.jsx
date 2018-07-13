import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: this.props.currentUser.name, 
      content: ''
    }
    this.handleMessage = this.handleMessage.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    
  }

  handleNameChange = e => {
    if (e.key === 'Enter') {
      let currentUser = e.target.value;
      if (!currentUser) {
        currentUser = 'Anonymous';
      }
   
    this.props.onUser(currentUser);
    }
  }
  
  handleMessage = e => {
    if (e.key === 'Enter') {
      let newMessage = { 
        content: e.target.value,
         username: this.props
      };
  
      if (!newMessage) {
        e.target.value = '';
      } else {
        this.props.onPost(newMessage);
        e.target.value = '';
      }
    }
  }

  render() {
    const { currentUser } = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={ currentUser } onKeyPress= { this.handleNameChange } placeholder='Enter a name and hit ENTER'/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ this.handleMessage }/>
      </footer>
    );
  }
}

export default ChatBar;
