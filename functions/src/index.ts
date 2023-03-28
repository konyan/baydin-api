import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});

    const db = await admin.database();

    const snapShot = await db.ref("users").get();

    response.json({message: "Hello from Firebase!", data: snapShot});
  }
);
