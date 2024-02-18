import React, { createContext, useState } from 'react'
export const addResponseContext = createContext()
export const updateResponseContext = createContext()

function ContextShare({ children }) {
  const [addResponse, setaddResponse] = useState("")
  const [editRsponse, seteditResponse] = useState("")
  return (
    <>
      <addResponseContext.Provider value={{ addResponse, setaddResponse }}>
        <updateResponseContext.Provider value={{ editRsponse, seteditResponse }}>
          {children}
        </updateResponseContext.Provider>
      </addResponseContext.Provider>
    </>
  )
}

export default ContextShare