const httpServer = require('http-server');

const server = httpServer.createServer({
    root: './',
    open: true,
    cors: true,
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});