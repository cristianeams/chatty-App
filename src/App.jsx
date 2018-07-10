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
    // in App.jsx
  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
