const createConfig = require('./config');
const createServer = require('./server');

const config = createConfig();

const server = createServer(config);

server.listen(5004);
