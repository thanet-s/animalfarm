import fastify from 'fastify';
const app = fastify();

// Declare a route
app.get('/', async (request, reply) => {
    return { hello: 'world' };
});

// Run the server!
(async () => {
    try {
        await app.listen(3001);
        app.log.info(`Server is listening on ${app.server.address().port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
})();