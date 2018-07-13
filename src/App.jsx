import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      currentUser: {
        name: 'Anonymous'
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], // messages coming from the server will be stored here as they arrive
      count: 0 
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    const myUrl = window.location.hostname;
    this.socket = new WebSocket(`ws://${myUrl}:3001`);
    this.onPost = this.onPost.bind(this);
    this.onUser = this.onUser.bind(this);
  }

  sendToServer = message => {
    this.socket.send(JSON.stringify(message));
    console.log(`Message sent to server`);
  }

  onUser = username => {
    // Sends notification to server
    const myUser = { name: username }
    this.setState({
      currentUser : myUser
    });

    if(this.state.currentUser.name != username) {
      const newNotification = {
        type: 'postNotification',
        content: `${ this.state.currentUser.name } has changed their name to ${ username }`
      }
    this.sendToServer(newNotification);
    } 
}

  onPost = message => {
  // Sends message to server
    const newMessage = {
      type: 'postMessage',
      username: message.username,
      content: message
    }
    this.sendToServer(newMessage);
  }  
  
  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }  
    this.socket.onmessage = (event) => {
      let incomingData = JSON.parse(event.data);
      const messages = this.state.messages;
      let newMessages;
      if (incomingData.type === 'numberOfUsers') {
        this.setState({ counter: incomingData.counter})
      } else {
        switch(incomingData.type) {
          case 'incomingNotification':
            newMessages = [...messages, incomingData];
          break;
          case 'incomingMessage':
            newMessages = [...messages, incomingData];
          break;
          default:
            throw new Error(`Unknown event type: ${ incomingData.type }`);
        }
        this.setState({
          messages: newMessages 
        });  
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar counter={ this.state.counter } />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser.name } onPost={ this.onPost } onUser={ this.onUser } />
      </div>  
    );
  }
}
export default App;
