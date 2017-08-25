import React, {Component} from 'react';
import store from '../store'

export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(messageId, content) {
    axios.put(`messages/${messageId}`, {content: "helloworld"})
    .then(res => {
      console.log(res.data)
    })
  }

  render() {
    const message = this.props.message;
    return (
      <li className="media">
      <div className="media-left">
      <a href="#">
      <img className="media-object" src={message.author.image} alt="image" />
      </a>
      </div>
      <div className="media-body">
      <h4 className="media-heading">{ message.author.name }</h4>
      { message.content }
      <button className="btn" onSubmit={this.handleSubmit(message.id, 'helloworld')}>Edit</button>
      </div>
      </li>
    )
  }
}
