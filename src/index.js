console.log('First web service starting up ...');

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 5 - here's our 404 page
const errorPage = `
<html>
    <head>
        <title>404 - File Not Found!</title>
    </head>
    <body>
        <h1>404 - File Not Found!</h1>
        <p>Check your URL, or your typing!</p>
        <p>:-)</p>
    </body>
</html>`;

const jokes = {
  0: { q: 'What do you call a very small valentine?', a: 'A valen-tiny!!!' },
  1: { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!!!!' },
  2: { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!!!!' },
  3: { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!!!!" },
  4: { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!!!!' },
  5: { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst!!!' },
  6: { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie!!!' },
  7: { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers!!!' },
  8: { q: 'Is this pool safe for diving?', a: 'It deep ends!!!' },
  9: { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me!!!' },
};

// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
const getRandomJokeJSON = () => {
  const number = Math.floor(Math.random() * 10);
  const responseObj = jokes[number];
  return JSON.stringify(responseObj);
};

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  console.log('parsedUrl=', parsedUrl);
  console.log('pathname=', pathname);

  if (pathname === '/random-joke') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getRandomJokeJSON());
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write(errorPage);
    response.end();
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
