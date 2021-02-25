const _ = require('underscore');

let jokes = {
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

const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const respond = (request, response, content, type, status) => {
  const headers = {
    'Content-Type': type,
  };
  response.writeHead(status, headers);
  response.write(content);
  response.end();
};

const respondMeta = (request, response, status, size, type) => {
  const headers = {
    'Content-Type': type,
    'Content-Length': size,
  };
  response.writeHead(status, headers);
  response.end();
};

const notFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write('<p>ERROR!</p');
};

const getRandomJokesJSON = (params = 1) => {
  let limit = Number(params);
  limit = !limit ? 1 : limit;
  limit = limit < 1 ? 1 : limit;
  limit = limit > jokes.length ? jokes.length : limit;

  jokes = _.shuffle(jokes);

  const responseObj = [];
  for (let i = 0; i < limit; i += 1) {
    responseObj.push(jokes[i]);
  }
  return responseObj;
};

const getRandomJoke = (request, response, acceptedTypes, httpMethod) => {
  const number = Math.floor(Math.random() * 10);
  const responseObj = jokes[number];

  if (httpMethod === 'GET') {
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `
      <joke>
        <q>${responseObj.q}</q>
        <a>${responseObj.a}</a>
      </joke>
      `;
      return respond(request, response, responseXML, 'text/xml', 200);
    }

    const jokeString = JSON.stringify(responseObj);
    return respond(request, response, jokeString, 'application/json', 200);
  } if (httpMethod === 'HEAD') {
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `
      <joke>
        <q>${responseObj.q}</q>
        <a>${responseObj.a}</a>
      </joke>
      `;
      const size = getBinarySize(responseXML);

      return respondMeta(request, response, 200, size, 'text/xml');
    }

    const size = getBinarySize(JSON.stringify(responseObj));
    return respondMeta(request, response, 200, size, 'application/json');
  }

  return notFound(request, response);
};

const getRandomJokes = (request, response, acceptedTypes, httpMethod, params) => {
  const responseObj = getRandomJokesJSON(params);
  const { length } = responseObj;

  if(httpMethod === 'GET'){
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<jokes>';
      for (let i = 0; i < length; i += 1) {
        responseXML += `
          <joke>
            <q>${responseObj[i].q}</q>
            <a>${responseObj[i].a}</a>
          </joke>`;
      }
      responseXML += '</jokes>';
      return respond(request, response, responseXML, 'text/xml', 200);
    }

    const jokesString = JSON.stringify(responseObj);
    return respond(request, response, jokesString, 'application/json', 200);
  } else if(httpMethod === 'HEAD'){
    if(acceptedTypes[0] === 'text/xml'){
      let responseXML = '<jokes>';
      for (let i = 0; i < length; i += 1) {
        responseXML += `
          <joke>
            <q>${responseObj[i].q}</q>
            <a>${responseObj[i].a}</a>
          </joke>`;
      }
      responseXML += '</jokes>';
      const size = getBinarySize(responseXML);

      return respondMeta(request, response, 200, size, 'text/xml');
    }

    const size = getBinarySize(JSON.stringify(responseObj));

    return respondMeta(request, response, 200, size, 'application/json');
  }

  return notFound(request, response);
};

module.exports = {
  getRandomJoke, getRandomJokes,
};
