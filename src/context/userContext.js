/* eslint-disable react-hooks/rules-of-hooks */

import React, { createContext, useContext, useState } from 'react'

const userContext = createContext()
const UserContext = ({children}) => {
    const [user,setUser] = useState(null)
  return (
    <userContext.Provider value={{user,setUser}}>{children}</userContext.Provider>
  )
}

export const getUserContext = () => {
    return useContext(userContext)
}

export default UserContext