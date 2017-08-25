import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store, {fetchMessages} from '../store';
import axios from 'axios'

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1';
const GENERAL_CHANNEL = '/channels/2';
const DOGS_CHANNEL = '/channels/3';
const LUNCH_CHANNEL = '/channels/4';

export default class ChannelList extends Component {
  constructor () {
    super();
    //local state pertaining to ChannelsList
    this.state = store.getState();
    this.rows = []
  }
  componentDidMount(){
    store.dispatch(fetchMessages())
    axios.get('/api/channels')
    .then(res => res.data.forEach(row => this.rows.push(row.id)))
    //assigning store state to local state
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render () {
    let messages = this.state.messages
    console.log('rows', this.rows[0])
    return (
      <ul>
        <li>
          <NavLink
            to={`/channels/${this.rows[0]}`}
            activeClassName="active">
            <span># really_random</span>
            <span className="badge">{messages.filter(message => message.channelId === this.rows[0]).length}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={GENERAL_CHANNEL} activeClassName="active">
            <span># generally_speaking</span>
            <span className="badge">{messages.filter(message => message.channelId === 2).length}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={DOGS_CHANNEL} activeClassName="active">
            <span># dogs_of_fullstack</span>
            <span className="badge">{messages.filter(message => message.channelId === 3).length}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={LUNCH_CHANNEL} activeClassName="active">
            <span># lunch_planning</span>
            <span className="badge">{messages.filter(message => message.channelId === 4).length}</span>
          </NavLink>
        </li>
      </ul>
    );
  }
}
