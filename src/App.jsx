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
  
    this.componentDidMount = this.componentDidMount.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
    this.onPost = this.onPost.bind(this);
  }

  sendToServer = message => {
    this.socket.send(JSON.stringify(message));
    console.log("Message sent to server");
  }

  onPost = message => {
    const newMessage = {
      username: message.username,
      content: message.content
    }
    this.sendToServer({message: newMessage});
  }
  
  componentDidMount() {
    console.log('componentDidMount <App />');
    // setTimeout(() => {
      
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }  
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={ this.state.currentUser.name } onPost={ this.onPost } />
      </div>  
    );
  }
}
export default App;
