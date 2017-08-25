import {createStore} from 'redux'


//actions
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'
const WRITE_NEW_MESSAGE = 'WRITE_NEW_MESSAGE'
const GOT_NEW_MESSAGE_SERVER = 'GOT_NEW_MESSAGE_SERVER'

//initial state
const initialState = {
  messages: [],
  newMessage: ''
}
//reducer
function reducer(state=initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, {messages: action.messages})
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
export const gotNewMessageFromServer = message => ({type: 'GOT_NEW_MESSAGE_SERVER', message})

//create a store
const store = createStore(reducer)
export default store
