let net = require("net");
let fs = require("fs");
let host;
let port;
let server;

server = net.createServer((connection) => {
  let socket = connection;
 console.log('client connected');

 socket.on('end', function() {
    console.log('client disconnected');
 }).on('error',() => {
   console.log("Error connecting to socket");
 }).on('data',(data) => {

   ////////////////////
   // TODO: HANDLE DATA PLS HELP WHAT
   ////////////////////

   printData(data);
   sendHttp(socket);
   socket.end();
 });

}).on('error', (err) => {
  console.log("Error creating server");
});

start(8080);
function start(port){
  server.listen(port, () =>{
    console.log("Listening...");
  });
}

function printData(data){
  let string = "";
  for (const pair of data.entries()) {
    string += String.fromCharCode(pair[1]);
  }
  console.log(string);
}

function sendHttp(socket){
  let response = "HTTP/1.1 200 OK\r\n" +
                "Date: " + (new Date().toString()) + "\r\n" +
                "Server: " + server.address() + "\r\n" +
                "Content-Length: 13\r\n" +
                "Content-Type: text/html\r\n" +
                "Connection: Closed\r\n" +
                "\r\n" +
                "Hello World!\r\n"
  socket.write(response);
  socket.pipe(socket);
}
