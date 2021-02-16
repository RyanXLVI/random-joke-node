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

const getRandomJokeJSON = () => {
  const number = Math.floor(Math.random() * 10);
  const responseObj = jokes[number];
  return JSON.stringify(responseObj);
};

const getRandomJokeResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(getRandomJokeJSON());
  response.end();
};

module.exports = { getRandomJokeResponse };
