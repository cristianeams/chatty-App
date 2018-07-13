import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

const getRandomColor = () => { 
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      currentUser: {
        name: 'Anonymous', // optional. if currentUser is not defined, it means the user is Anonymous
        color: '#fff'
      }, 
      messages: [], // messages coming from the server are stored here as they arrive
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
    // Sends either notification or message to server
    this.socket.send(JSON.stringify(message));
    console.log(`Message sent to server`);
  }

  onUser = username => {
    // Updates username on name change
    const myUser = { name: username }
    this.setState({
      currentUser : myUser
    });
    // Send a postNotification to server is user changes name
    if(this.state.currentUser.name != username) { 
      const newNotification = {
        type: 'postNotification',
        content: `${ this.state.currentUser.name } has changed their name to ${ username }`
      }
    this.sendToServer(newNotification);
    } 
}

  onPost = message => {
  // Creates a new message
    const newMessage = {
      type: 'postMessage',
      username: message.username,
      content: message,
      color: this.state.color
    }
    this.sendToServer(newMessage);
  }  
  
  componentDidMount() {
    console.log('componentDidMount <App />');
    // Sets a random color for each user
    this.setState({
      color: getRandomColor()
    });

    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }  

    this.socket.onmessage = (event) => {
      let incomingData = JSON.parse(event.data);
      const messages = this.state.messages;
      let newMessages;
      // Gets number of online users from server
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