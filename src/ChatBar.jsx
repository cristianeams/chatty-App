import React, {Component} from 'react';
import { generateID } from './main.js';

class ChatBar extends Component {

  render() {
    const { currentUser} = this.props;
  
    const addMessage = event => {
      let content = event.target.value;
      const state = {
        error: ''
      };
  
      if (event.key === 'Enter') {
        if(!content) {
          state.error = 'You cannot post an empty message.';
        } else {
          const newMessage = {
            username: currentUser,
            id: generateID(),
            content: content,
            
          };
          state.content = '';
          this.props.addMessage(newMessage);
        }
      
      }
    
    }
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue= {currentUser} />
        {/* addMessage triggers the render method..*/}
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ addMessage }/>
      </footer>
    );
  }
}

export default ChatBar;
