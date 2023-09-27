// require the http module which contains classes to provide functionality to implement an HTTP server
const HTTP = require('http');

// declare constant for a port number to use when listening for TCP connections
const PORT = 3000;

// createServer method returns a new instance of the http.Server class
// takes a callback in its simplest form
// req represents http.IncomingMessage object
// res represents http.ServerResponse object
const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(`${method} ${path}\n`);
    res.end();
  }
});

// listen method defined on the http.Server class
// takes a port number as an argument, and listens for incoming TCP connections on that port
// optional callback, in this case, logs a message when we run the program 
SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// at this point the server is listening for incoming TCP connections                                                                   