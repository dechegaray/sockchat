import React, {Component} from 'react';
import io from 'socket.io-client';
import MessageList from './components/Messages/MessageList';
import MessageForm from './components/Messages/MessageForm';
import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import {WEBSOCKET_URL, WEBSOCKET_CHANNEL, WEBSOCKET_USERS_CHANNEL} from './utils/websockets';

class App extends Component {
  state = {
    status: 0,
    messages: [],
    users: [],
    user: null
  }

  componentDidMount() {
    this.socket = io(WEBSOCKET_URL);

    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on(WEBSOCKET_CHANNEL, this.streamMessage);
    this.socket.on(WEBSOCKET_USERS_CHANNEL, this.streamUser);
  }

  connect = () => {
    console.log('Connected on: ' + this.socket.id);
    this.setState({status: 1});
  }

  disconnect = () => {
    this.setState({status: 0});
  }

  streamMessage = (msg) => {
    const updatedMessages = this.state.messages.concat(msg);
    this.setState({messages: updatedMessages});
  }

  emitMessage = (payload) => {
    this.socket.emit(WEBSOCKET_CHANNEL, payload);
  }

  streamUser = (users) => {
    this.setState({users});
  }

  emitUser = (user) => {
    this.socket.emit(WEBSOCKET_USERS_CHANNEL, user);
    this.setState({user: user});
  }

  render() {
    const {messages, users, user} = this.state;
    const socketId = this.socket ? this.socket.id : null;

    let sectionToRender = '';
    if (user) {
      sectionToRender = (
        <div className="row">
            <div className="col-md-3">
              <UserList users={users} />
            </div>
            <div className="col-md-9">
              <MessageList messages={messages} />
              <MessageForm emit={this.emitMessage} />
            </div>
          </div>
      );
    } else {
      sectionToRender = <UserForm emit={this.emitUser} id={socketId} />
    }

    return (
      <div className="App">
        <header>My React Chat</header>
        <div className="container-fluid">
          { sectionToRender }
        </div>
      </div>
    );
  }
}

export default App;
