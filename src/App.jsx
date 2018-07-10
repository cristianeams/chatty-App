import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

const data = {
  currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
      {
        username: 'Bob',
        id: 1,
        content: 'Has anyone seen my marbles?',
      },
      {
        username: 'Anonymous',
        id: 2,
        content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
      }
    ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
  }
  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={ this.state.currentUser } />
      </div>  
    );
  }
}
export default App;
