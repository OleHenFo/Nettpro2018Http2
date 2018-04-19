let net = require("net");

var server = net.createServer((socket) => {
 console.log('client connected');

 socket.on('end', function() {
    console.log('client disconnected');
 }).on('error',() => {
   console.log("Woooops");
 }).on('data',(data) => {
   // TODO: HANDLE DATA

   let string = "";
   for (const pair of data.entries()) {
     string += String.fromCharCode(pair[1]);
   }
   console.log(string);

 });

}).on('error', (err) => {
  console.log("woops");
});

server.listen(8080, () =>{
  console.log("Listening...");
});
