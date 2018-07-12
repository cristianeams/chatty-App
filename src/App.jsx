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
      messages: [] // messages coming from the server will be stored here as they arrive
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    const myUrl = window.location.hostname;
    this.socket = new WebSocket(`ws://${myUrl}:3001`);
    this.onPost = this.onPost.bind(this);
    this.onUser = this.onUser.bind(this);
  }

  sendToServer = message => {
    // console.log(message)
    this.socket.send(JSON.stringify(message));
    console.log("Message sent to server");
  }

  onUser = username => {
    // console.log(username);
    const myUser = { name: username }
    this.setState({
      currentUser : myUser
    });

    if(this.state.currentUser.name != username) {
      const newNotification = {
        type: 'postNotification',
        content: `${ this.state.currentUser.name } has changed their name to ${ username }`
      }
      this.sendToServer({
        message: newNotification
      });
  }
}

  onPost = message => {
    // Sends notification to server
    console.log(message )
      // Sends message to server
      const newMessage = {
        type: 'postMessage',
        username: message.username,
        content: message
      }
      this.sendToServer({
        message: newMessage
      });
    }  
  
  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }  
    this.socket.onmessage = (event) => {
      let incomingData = JSON.parse(event.data).message;
      //console.log(incomingData);
      const messages = this.state.messages;
      let newMessages;
      console.log(incomingData);
      switch(incomingData.type) {
          case 'incomingNotification':
          newMessages = [...messages, incomingData];
            // console.log(newMessages);
          break;
          case 'incomingMessage':
            newMessages = [...messages, incomingData];
            // console.log(newMessages); 
          break;
          default:
            throw new Error(`Unknown event type: ${ incomingData.type }`);
      }
      this.setState({
        messages: newMessages
      });
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser.name } onPost={ this.onPost } onUser={ this.onUser } />
      </div>  
    );
  }
}
export default App;
