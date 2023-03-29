const functions = require("firebase-functions");
const userRouter = require("./routes/user");
//setup express with firebase functions
const express = require("express");
const app = express();

//setup cors
const cors = require("cors");
app.use(cors({ origin: true }));

//setup routes
app.use("/users", userRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

exports.app = functions.https.onRequest(app);

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
