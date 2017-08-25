import React, { Component } from 'react';
import axios from 'axios';
import store, {writeNewMessage, gotNewMessageFromServer, gotMessagesFromServer} from '../store';
import socket from '../socket.js'


export default class NewMessageEntry extends Component {
  constructor (props) {
    super(props);
    //local state pertaining to MessagesList
    this.state = store.getState()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt){
    store.dispatch(writeNewMessage(evt.target.value));
  }

  handleSubmit(evt){
    evt.preventDefault();

    axios.post('/api/messages', {content: this.state.newMessage, channelId: this.props.channelId})
    .then(res => res.data)
    //changes the store state
    .then(message => {
      store.dispatch(gotNewMessageFromServer(message))
      socket.emit('new-message', message)
    })

  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  render () {
    return (
      <form 
        id="new-message-form"
        onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
