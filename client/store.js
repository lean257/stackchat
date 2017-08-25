import {createStore} from 'redux'


//actions
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'

//initial state
const initialState = {
  messages: []
}
//reducer
function reducer(state=initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, {messages: action.messages})
    default:
      return state
  }
}
//action creators
export const gotMessagesFromServer = messages => ({type: 'GOT_MESSAGES_FROM_SERVER', messages})

//create a store
const store = createStore(reducer)
export default store
