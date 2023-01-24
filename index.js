// Node.js program to demonstrate the
// server.remoteAddress() method
 
// Importing dgram module
const dgram = require('dgram');
 
// Creating and initializing client
// and server socket
const client = dgram.createSocket("udp4");
const server = dgram.createSocket("udp4");
 
// Catching the message event
server.on("message", function (msg) {
 
    // Displaying the client message
    process.stdout.write("UDP String: " + msg + "\n");
 
    // Exiting process
    process.exit();
 
});
 
// Catching the listening event
server.on('listening', () => {
 
    // Getting address information for the server
    const address = server.address();
 
    // Display the result
    console.log(`server listening
        ${address.address}:${address.port}`);
 
});
 
// Binding server with port address
// by using bind() method
server.bind(1234, () => {
 
    // Connecting server with the port
    // and local host
    server.connect(1234, "localhost", () => {
        console.log("connected");
 
        // Getting remote address of server
        // by using remoteAddress() method
        const add = server.remoteAddress();
 
        // Display the result
        console.log(add);
    });
});
 
// Client sending message to server
client.send("Hello", 0, 7, 1234, "localhost");