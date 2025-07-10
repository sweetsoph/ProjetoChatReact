import { useState } from 'react'
import './App.css'
import Join from './components/Join/join'
import Chat from './components/Chat/chat'

function App() {
  const [chatVisibility, setChatVisibility] = useState(0)
  const [socket, setSocket] = useState(null)

  return (
    <>
      {chatVisibility === 0 ? (
        <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      ) : (
        <Chat socket={socket} />
      )}
    </>
  )
}

export default App
