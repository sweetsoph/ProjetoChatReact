const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3001;

io.on('connection', socket => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });

  socket.on('join', username => {
    socket.data.username = username;
    console.log(`${socket.data.username} entrou no chat`);
  });

  socket.on('message', message => {
    io.emit('receive_message', {
      message,
      authorId: socket.id,
      authorName: socket.data.username,
    });
  });
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});