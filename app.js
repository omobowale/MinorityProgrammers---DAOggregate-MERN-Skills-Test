const express = require("express");
const mongoose = require("mongoose");
const daoRouter = require("./routes/daos")
const socialmediaRouter = require("./routes/socialmedia")
const path = require("path")

const cors = require("cors");

require("dotenv/config")

const app = express();

//middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
//connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

mongoose.connection.once('open', () => {
    console.log("Connected successfully to database");
});

//routes
app.use("/", daoRouter);

app.use("/socialmedia", socialmediaRouter);


//serving static pages
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

//listen at the port
const PORT  = process.env.PORT || 3009
app.listen(PORT);