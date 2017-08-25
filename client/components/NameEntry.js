import React, {Component} from 'react'
import store, {postMessage, enterUsername} from '../store'

export default class NameEntry extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt){
    store.dispatch(enterUsername(evt.target.value));
  }

  handleSubmit(evt){
    evt.preventDefault();

    store.dispatch(postMessage(this.state.newMessage, this.props.messages[-1].channelId, this.state.username))
    store.getState().newMessage = ''
    store.getState().username = ''
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount(){
    this.unsubscribe()
  }
  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
      <label htmlFor="name">Your name:</label>
      <input
      type="text"
      name="name"
      placeholder="Enter your name"
      className="form-control"
      onChange={this.handleChange}
      value={this.state.username}
      />
      </form>
    )

  }
}
