const { database } = require("../config/firebase");
const functions = require("firebase-functions");

const usersDBRef = database.ref("users");

const getUsers = (req, res) => {
	usersDBRef
		.once("value")
		.then((snapshot) => {
			const users = snapshot.val();
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json({ error: err.code });
		});
};

const createUserHistory = (req, res) => {
	const { user_id, is_anonymous, history_eyes } = req.body;

	usersDBRef
		.child(user_id)
		.once("value")
		.then((snapshot) => {
			if (snapshot.exists()) {
				const userHistoryRef = usersDBRef
					.child(user_id)
					.child("history_eyes")
					.push();
				userHistoryRef
					.set(history_eyes)
					.then(() => {
						res.status(200).json({ message: "NEW History updated" });
					})
					.catch((err) => {
						res.status(500).json({ error: err.code });
					});
			} else {
				usersDBRef
					.child(user_id)
					.set({
						is_anonymous: is_anonymous,
						user_id: user_id,
					})
					.then(() => {
						usersDBRef
							.child(user_id)
							.child("history_eyes")
							.push()
							.set(history_eyes)
							.then(() => {
								res.status(200).json({
									message: "New User Created! and New History Created!",
								});
							})
							.catch((err) => {
								res.status(500).json({ error: err.code });
							});
					})
					.catch((err) => {
						res.status(500).json({ error: err.code });
					});
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err.code });
		});
};

module.exports = { getUsers, createUserHistory };
