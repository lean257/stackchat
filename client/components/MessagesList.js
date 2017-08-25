import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store, {gotMessagesFromServer} from '../store'

export default class MessagesList extends Component {

  constructor () {
    super();
    //local state pertaining to MessagesList
    this.state = store.getState()
  }

  componentDidMount () {
    axios.get('/api/messages')
      .then(res => res.data)
      //changes the store state
      .then(messages => store.dispatch(gotMessagesFromServer(messages)))
      //assigning store state to local state
      this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  render () {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry />
      </div>
    );
  }
}
