const http = require("http");
const mongoose = require("mongoose");

const access = require("./src/db/access.json");
const app = require("./app");

const PORT = 8000;

app.set("port", PORT);
const server = http.createServer(app);

server.listen(PORT);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://" +
      access.user +
      ":" +
      access.password +
      "@cluster0.xmslcaq.mongodb.net/Grappe?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion with MongoDB done"))
  .catch(() => console.log("Connexion with MongoDB done"));
