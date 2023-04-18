const http = require("http");
const app = require("./APP");
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`server listening to port ${port}`));