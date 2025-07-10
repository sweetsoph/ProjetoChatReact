import React, { useRef } from 'react'
import io from 'socket.io-client'

export default function Join({ setSocket, setChatVisibility }) {
    const usernameRef = useRef()

    const handleSubmit = async () => {
        const username = usernameRef.current.value.trim()
        if (username) {
            const socket = io.connect('http://localhost:3001')
            socket.emit('join', username)
            setSocket(socket)
            setChatVisibility(true)
        } else {
            alert('Por favor, insira um nome de usuário.')
        }
    }

    return (
        <div>
            <h1>Join</h1>
            <input type="text" ref={usernameRef} placeholder="Nome de usuário" />
            <button onClick={()=>handleSubmit()}>Entrar</button>
        </div>
    )
}
