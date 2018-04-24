let tls = require("tls");
let fs = require("fs");
let port;
let server;

let context = {
  key: fs.readFileSync('key.key'),
  cert: fs.readFileSync('cert.crt')
}

server = tls.createServer(context, (connection) => {
  let socket = connection;

  console.log('server connected',
              socket.authorized ? 'authorized' : 'unauthorized');

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

start(8443);
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
  let response = {
    ":status" : 200
  };
  let buf = Buffer.from(JSON.stringify(response));
  socket.write(buf);
  socket.pipe(socket);
}
