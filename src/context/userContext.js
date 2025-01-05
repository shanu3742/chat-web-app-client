/* eslint-disable react-hooks/rules-of-hooks */
//react import
import React, { createContext, useContext, useState } from 'react'

// create context
const userContext = createContext()
// context component
const UserContext = ({children}) => {
  // context value
  const [user,setUser] = useState(null)
  return (
    <userContext.Provider value={{user,setUser}}>{children}</userContext.Provider>
  )
}
//context value getter
export const getUserContext = () => {
    return useContext(userContext)
}

export default UserContext