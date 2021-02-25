console.log('First web service starting up ...');

const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/random-joke': responseHandler.getRandomJoke,
  '/random-jokes': responseHandler.getRandomJokes,
  '/default-styles.css': htmlHandler.getCSS,
  notFound: htmlHandler.get404Response,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  console.log(acceptedTypes);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);
  const { limit } = params;
  const httpMethod = request.method;

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, acceptedTypes, httpMethod, limit);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
