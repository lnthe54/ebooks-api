const server = require("./server");
const port = process.env.PORT || 80;

server.listen(port, () => console.log(`server is live on port ${port}`))