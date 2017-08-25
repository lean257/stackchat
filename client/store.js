import {createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import socket from './socket.js'

//actions
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'
const WRITE_NEW_MESSAGE = 'WRITE_NEW_MESSAGE'
const GOT_NEW_MESSAGE_SERVER = 'GOT_NEW_MESSAGE_SERVER'
const FETCH_MESSAGES = 'FETCH_MESSAGES'
const NEW_USERNAME = 'NEW_USERNAME'
//initial state
const initialState = {
  messages: [],
  newMessage: '',
  username: '',
  editedMessage: ''
}
//reducer
function reducer(state=initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, {messages: action.messages})
    case NEW_USERNAME:
      return Object.assign({}, state, {username: action.name})
    case WRITE_NEW_MESSAGE:
      return Object.assign({}, state, {newMessage: action.message})
    case GOT_NEW_MESSAGE_SERVER:
      return Object.assign({}, state, { messages: state.messages.concat(action.message)})
    default:
      return state
  }
}
//action creators
export const gotMessagesFromServer = messages => ({type: 'GOT_MESSAGES_FROM_SERVER', messages})
export const writeNewMessage = message => ({type: 'WRITE_NEW_MESSAGE', message})
export const gotNewMessageFromServer = (message) => ({type: 'GOT_NEW_MESSAGE_SERVER', message})
export const enterUsername = name => ({type: 'NEW_USERNAME', name})

export function fetchMessages() {
  return function thunk (dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      //changes the store state
      .then(messages => {
        const action = gotMessagesFromServer(messages)
        dispatch(action)
      })
  }
}

export function postMessage(content, channelId, authorName) {
  return function thunk (dispatch) {
    return axios.post('/api/messages', {content: content, channelId: channelId, authorName})
    .then(res => res.data)
    //changes the store state
    .then(message => {
      const action = gotNewMessageFromServer(message)
      dispatch(action)
      socket.emit('new-message', message)
    })
  }
}

//create a store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
export default store
