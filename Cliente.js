const { Socket } = require('net');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const socket = new Socket();
socket.connect({ host:'127.0.0.1', port:3000 })
socket.setEncoding("utf-8")

//socket.write("Hola")

readline.on("line", (line) =>{
    socket.write(line)
    if(line == 'END'){
        socket.end()
    }
})

socket.on("data", (data) => {
    console.log(data)
})

socket.on("close", ()=>{
    process.exit(0)
})