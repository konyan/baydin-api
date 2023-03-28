import * as functions from "firebase-functions";
import * as express from "express";
import {addUserHistoryEyes} from "./userController";

const app = express();

app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/user/history/eyes", addUserHistoryEyes);

export const helloWorld = functions.https.onRequest(app);
