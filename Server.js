const { Server } = require('net');

const server = new Server();

//Significa que alguien se conecto al server y sacamos su IP y puerto
server.on("connection", (socket) => {
    //Se puso porque como tal en el socket mandamos bits y esos los tenemos que poner en utf-8
    socket.setEncoding("utf-8")

    console.log(`New Connection from ${socket.remoteAddress}:${socket.remotePort}`);

    //Este va a ser cuando tenga que leerse algo de información del socket
    socket.on("data", (data) => {
        console.log(data)
        //Mandamos el mismo mensaje al cliente
        socket.write("Reenviando mensaje del cliente desde el servidor al cliente " + data);
    })
})

server.listen({host:'0.0.0.0', port: 3000}, ()=>{
    console.log("Server is RUNNING IN PORT 3000")
}) 

