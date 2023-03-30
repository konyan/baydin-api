const functions = require("firebase-functions");
const userRouter = require("./routes/user");
const eyesRouter = require("./routes/eyes");
//setup express with firebase functions
const express = require("express");
const app = express();

//setup cors
const cors = require("cors");
app.use(cors({ origin: true }));

//setup routes
app.use("/users", userRouter);
app.use("/eyes", eyesRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

exports.app = functions.https.onRequest(app);
