const { database } = require("../config/firebase");
const functions = require("firebase-functions");

const eyesDBRef = database.ref("eyes");

const getEyesList = (req, res) => {
	eyesDBRef
		.once("value")
		.then((snapshot) => {
			const eyes = snapshot.val();
			res.status(200).json(eyes);
		})
		.catch((err) => {
			res.status(500).json({ error: err.code });
		});
};

const getEyesResultByFilter = (req, res) => {
	const { type } = req.query;

	eyesDBRef
		.orderByChild("type")
		.once("value")
		.then((snapshot) => {
			const eyes = [];
			snapshot.forEach((childSnapshot) => {
				let childKey = childSnapshot.key;
				let childData = { ...childSnapshot.val(), childKey };
				if (+childData.type === +type) {
					eyes.push(childData);
				}
			});
			res.status(200).json(eyes);
		})
		.catch((err) => {
			res.status(500).json({ error: err.code });
		});
};

module.exports = { getEyesList, getEyesResultByFilter };
