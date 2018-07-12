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
      messages: [] // messages coming from the server will be stored here as they arrive
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
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }  
    this.socket.onmessage = (event) => {
      let incomingData = JSON.parse(event.data).message;
      console.log(incomingData);
      const messages = this.state.messages;
      const newMessages = [...messages, incomingData];
      console.log(newMessages);
      this.setState({
        messages: newMessages
      });
     
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
