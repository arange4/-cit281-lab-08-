// #1 TODO: Declare fastify object from fastify, and execute
const fastify = require('fastify')({
    logger: true
  });
  
  // #2 TODO: Declare fetch object from node-fetch
  const fetch = require('node-fetch');
  
  fastify.get("/photos", (request, reply) => {
    // #3 TODO:
    // Adapt the following code to attempt to retrieve
    // all photos from JSONPlaceholder site
    // using fetch, and handle returned Promise using:
    // - two .then() chain methods, return 200
    // - single .catch() chain method, return 404
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(res => res.json())
      .then(photos => {
        reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "", statusCode: 200, photos: photos });
      })
      .catch(err => {
        reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: err.message, statusCode: 404, photos: [] });
      });
  });
  
  fastify.get("/photos/:id", (request, reply) => {
    // #4 TODO:
    // Adapt the following code to attempt to retrieve
    // a single photo from JSONPlaceholder site
    // using fetch, and handle returned Promise using:
    // - single .then() chain method, return 200
    // - single .catch() chain method, return 404
    // You may also try to use Object.keys() to 
    // ensure JSONPlaceholder returns an object with
    // properties. An empty object returned from 
    // JSONPlaceholder means that the passed photo ID
    // was invalid. Your server would also return
    // a 404 status code for an invalid Photo ID.
    const { id = "" } = request.params;
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then(res => res.json())
      .then(photo => {
        if (Object.keys(photo).length === 0) {
          throw new Error("Invalid ID");
        }
        reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "", statusCode: 200, photo: photo });
      })
      .catch(err => {
        reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: err.message, statusCode: 404, photo: {} });
      });
  });
  
  // Start server and listen to requests using Fastify
  const listenIP = "localhost";
  const listenPort = 8080;
  fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });
    