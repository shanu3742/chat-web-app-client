import React from 'react'
import Message from '../Message/Message'
import { getUserContext } from '../../context/userContext';

const Chat = () => {
  const {user,setUser} = getUserContext();
  // console.log(userData)
  return (
   <Message />
  )
}

export default Chat