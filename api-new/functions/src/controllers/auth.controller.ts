import {Request, Response} from "express";
import {auth, db} from "../config/config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {RESPONSE_STATUS} from "../models/enums";
import {User} from "../models/types";

export const AuthController = {
  Login: async (req: Request, res: Response) => {
    try {
      const {email, password} = req.body;

      const credential = await signInWithEmailAndPassword(auth, email, password);

      if (!credential || !credential.user) return res.status(401).json({status: RESPONSE_STATUS.FAILURE, message: "errors.login.wrongcredential"});

      const user = await db.doc(`/users/${ email }`).get();

      if (!user.exists) return res.status(401).json({status: RESPONSE_STATUS.FAILURE, message: "errors.login.wrongcredential"});

      const token = await credential.user.getIdToken();

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "login.success",
        data: {
          ...user.data(),
          token,
        },
      });
    } catch (error) {
      console.log("login =========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "login.error",
        error,
      });
    }
  },

  Register: async (req: Request, res: Response) => {
    try {
      const user: User = {...req.body};

      const exist = await db.doc(`/users/${ user.email }`).get();

      if (exist.exists) return res.status(400).json({status: RESPONSE_STATUS.FAILURE, message: "register.exist.user"});

      const data = await createUserWithEmailAndPassword(auth, user.email, user.password || "");

      user.userId = data.user.uid;
      user.createdAt = new Date().toISOString();
      user.updatedAt = new Date().toISOString();

      await db.doc(`/users/${ user.email }`).create(user);

      const token = await data.user.getIdToken();

      user.token = token;

      delete user.password;

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "register.success",
        data: {...user},
      });
    } catch (error) {
      console.log("register ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "register.error",
        error,
      });
    }
  },
};
