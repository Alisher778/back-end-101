import React, { Component } from 'react';
import socket from '../conf/socket';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [{ text: 'Message', name: 'Bob' }], data: { text: '', name: 'Bob' } };
  }

  componentDidMount() {
    socket.on('getMsg', (msg) => {
      this.setState(prevState => ({ messages: msg }));
    });
    socket.on('change', (msg) => {
      this.setState(prevState => ({ messages: [...prevState.messages, msg] }));
    });
  }

  onSend = () => {
    socket.emit('send', this.state.data);
  }

  inputHandler = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({ data: { ...prevState.data, [name]: value } }));
  }

  render() {

    return (
      <div>
        <div>
          <input type="text" name="name" onChange={this.inputHandler} />
          <input type="text" name="text" onChange={this.inputHandler} />
          <button onClick={this.onSend}>Send</button>
        </div>
        <ul>
          {this.state.messages.map((item, index) => {
            return <li key={index}>
              <h5>{item.name}</h5>
              <p>{item.text}</p>
            </li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
