const HTTP = require('http');
const URL = require('url').URL;
const PORT = 3000;

// const myURL = new URL('/some/path?color=red', 'http://my-website');
// let params = myURL.searchParams;
// params.get('color'); // red

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;
  let baseURL = `http://localhost:${PORT}`;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');    

    try {
      const myURL = new URL(path, baseURL);
      let params = myURL.searchParams;
      let rolls = Number(params.get('rolls') ?? '1');
      let sides = Number(params.get('sides') ?? '6');
  
      if (sides && rolls) {
        new Array(rolls).fill(1).forEach((_side) => {
            res.write(`${randomNum(sides, 1)}\n`);
          });
        } else {
          res.write(`${randomNum(6, 1)}\n`);
        }
      } catch(error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }

    res.write(`${method} ${path}\n`);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

function randomNum(max, min) {
  return  Math.floor(Math.random() * (max - min + 1) + min);
}
