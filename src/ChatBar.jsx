import React, {Component} from 'react';
import { generateID } from './main.js';


class ChatBar extends Component {
  constructor (props) {
    super()
    this.state = {username: props.currentUser.name, content: ''}
    this.handleMessage = this.handleMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    
  }
  handleMessageChange = e => {
    const { currentUser} = this.props;
    this.setState({username: currentUser,
      content: e.target.value});
  }
  
  handleMessage = event => {
    const { currentUser} = this.props;
    if (event.key === 'Enter') {
      this.props.onPost(this.state);
      this.setState({
        username: currentUser, 
        content: ''
      })
    }
  }

  render() {
    const { currentUser} = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue= {currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value = {this.state.content} onChange = {this.handleMessageChange} onKeyPress={ this.handleMessage }/>
      </footer>
    );
  }
}

export default ChatBar;
