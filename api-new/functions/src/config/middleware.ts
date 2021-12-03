import {NextFunction, Request, Response} from "express";
import {RESPONSE_STATUS} from "../models/enums";
import {admin} from "./config";

export const AuthCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      !req.headers.authorization ||
            !req.headers.authorization.startsWith("YYG-Account ")
    ) {
      return res.status(401).json({status: RESPONSE_STATUS.FAILURE, message: "errors.unauthorized"});
    }

    const idToken = req.headers.authorization.split("YYG-Account ")[1];

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.headers.userId = decodedToken.uid;

    return next();
  } catch (error) {
    return res.status(500).json({
      status: RESPONSE_STATUS.FAILURE,
      message: "errors.unauthorized",
      error,
    });
  }
};
