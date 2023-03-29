const admin = require("firebase-admin");

var serviceAccount = require("./fb.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://donation-887a7.firebaseio.com",
});

const database = admin.database();

module.exports = { admin, database };
