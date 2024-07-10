<<<<<<< HEAD
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const socketController = require('./controllers/socketController');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials:true
  },
});

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

// Connect to MongoDB
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error", err));

app.use(bodyParser.json());

// Example route to check if server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});
// Socket.io connection handling
io.on("connection", (socket) => {
  socketController.handleConnection(socket, io); // Pass both socket and io to handleConnection
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
=======
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const socketController = require('./controllers/socketController');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials:true
  },
});

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

// Connect to MongoDB
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error", err));

app.use(bodyParser.json());

// Example route to check if server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});
// Socket.io connection handling
io.on("connection", (socket) => {
  socketController.handleConnection(socket, io); // Pass both socket and io to handleConnection
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
>>>>>>> e067ce3a85e851d7c05bd414b9b9a171320e60b7
