import React, { Component } from 'react';
import axios from 'axios';
import store, {writeNewMessage, gotNewMessageFromServer, gotMessagesFromServer, postMessage} from '../store';
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

    store.dispatch(postMessage(this.state.newMessage, this.props.channelId, this.state.username))
    store.getState().newMessage = ''
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
            value={this.state.newMessage}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
