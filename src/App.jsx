import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import { generateID } from './main.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            username: 'Bob',
            id: generateID(),
            content: 'Has anyone seen my marbles?',
            error: ''
          },
          {
            username: 'Anonymous',
            id: generateID(),
            content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
            error: ''
          }
        ]
    }
    this.addMessage = this.addMessage.bind(this);
  }
  
  addMessage(message) {
    {/* Adds a new message to messages array and 
    updates the state of the app component.*/}

    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState({ 
      messages: newMessages });
  }
    // in App.jsx
  componentDidMount() {
    //console.log('componentDidMount <App />');
    setTimeout(() => {
      
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
        <ChatBar currentUser={ this.state.currentUser.name } addMessage={this.addMessage} />
      </div>  
    );
  }
}
export default App;
