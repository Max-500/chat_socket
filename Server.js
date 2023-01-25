const { Server } = require("net");

const server = new Server();

function error(err) {
  console.error(err);
  process.exit(1);
}

function start(port) {
  //Significa que alguien se conecto al server y sacamos su IP y puerto
  server.on("connection", (socket) => {
    //Se puso porque como tal en el socket mandamos bits y esos los tenemos que poner en utf-8
    socket.setEncoding("utf-8");

    const remoteSocket = `${socket.remoteAddress}:${socket.remotePort}`;

    console.log(`New Connection from ${remoteSocket}`);

    //Este va a ser cuando tenga que leerse algo de información del socket
    socket.on("data", (data) => {
      if (data == "END") {
        socket.end();
      } else {
        socket.write(
          "Reenviando mensaje del cliente desde el servidor al cliente " + data
        );
      }
    });
  });

  server.listen({ host: "0.0.0.0", port: port }, () => {
    console.log(`Server is RUNNING IN PORT ${port}`);
  });

  server.on("error", (err)=>{
    error(err.message);
  })
}

const main = () => {
  if (process.argv.length !== 3) {
    error(`Ingresa lo siguiente \n node ${__filename} port`);
  } else {
    let port = process.argv[2];
    port = parseInt(port);
    if (isNaN(port)) {
      error("Escribe números");
    } else {
      console.log(port);
      start(port);
    }
  }
};

main();
