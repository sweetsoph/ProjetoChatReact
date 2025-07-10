import React, { useRef, useState, useEffect } from 'react'

export default function Chat({ socket }) {
    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])

    function sendMessage() {
        const message = messageRef.current.value.trim()
        if (message) {
            socket.emit('message', message);
            messageRef.current.value = '';
        }
    }

    useEffect(() => {
        socket.on('receive_message', ({ message, authorId, authorName }) => {
            setMessageList(prevMessages => [...prevMessages, {
                message,
                authorId,
                authorName
            }]);
        });
        return () => {
            socket.off('receive_message');
        };
    }, [socket]);

    return (
        <div>
            <h1>Chat</h1>
            <div id='message-list'>
                {messageList.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.authorName}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input type="text" ref={messageRef} placeholder="Mensagem..." />
            <button onClick={() => sendMessage()}>Enviar</button>
        </div>
    )
}
