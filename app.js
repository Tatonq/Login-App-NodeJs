const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const homeController = require("./controllers/home-controller");
const pageNotFoundController = require("./controllers/page-not-found-controller");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(authRoute);
app.get('/', homeController);
app.get("*", pageNotFoundController);

mongoose.connect("mongodb://localhost/login-app",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Database Connected!");
}).catch(() => {
    console.log("Cannot Connect to Database!!!!!");
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})