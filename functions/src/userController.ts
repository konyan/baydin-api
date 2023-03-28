import {Response} from "express";

import {database} from "./config/firebase";

type HistoryType = {
	question_id: string;
	answers: string[];
	question_title: string;
};

type UserType = {
	user_id: string;
	is_anonymous: boolean;
	history_eyes: HistoryType;
};

type Request = {
	body: UserType;
	params: { entryId: string };
};

export const addUserHistoryEyes = async (
    request: Request,
    response: Response
) => {
  const {user_id} = request.body;

  try {
    const usersDBRef = await database.ref("users");

    const currentUserRef = await usersDBRef.child(user_id);

    if (!currentUserRef) {
      return response.status(400).json({
        message: "User not found",
      });
    } else {
      return response.status(200).json({
        message: "success",
        data: currentUserRef,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: "SERVER ERROR",
    });
  }
};
