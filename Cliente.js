const { read } = require('fs');
const { Socket } = require('net');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const socket = new Socket();

socket.connect({ host:'127.0.0.1', port:3000 })

socket.setEncoding("utf-8")

socket.write("Hola")

readline.on("data", (line) =>{
    socket.write(line)
})

socket.on("data", (data) => {
    console.log(data)
})