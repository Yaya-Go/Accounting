import {Request, Response} from "express";
import {db} from "../config/config";
import {RESPONSE_STATUS} from "../models/enums";
import {Item, Transaction} from "../models/types";

const collection = "transactions";

export const TransactionController = {
  Retrieve: async (req: Request, res: Response) => {
    try {
      const data = await db.doc(`/${ collection }/${ req.params.id }`).get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.transaction.notfound"});

      const trans: Transaction = data.data() as Transaction;

      const list = await db.collection("items").where("transId", "==", trans.id).get();
      const items: Item[] = [];

      list.forEach((doc) => {
        if (doc.exists) items.push(doc.data() as Item);
      });

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "transaction.retrieve.success",
        data: {
          ...trans,
          items,
        },
      });
    } catch (error) {
      console.log("Transaction Retrieve ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "transaction.retrieve.failure",
        error,
      });
    }
  },
  List: async (req: Request, res: Response) => {
    try {
      const trans: Transaction[] = [];
      const data = await db.collection(collection).where("categoryId", "==", req.params.categoryId).get();

      data.forEach((doc) => {
        if (doc.exists) trans.push(doc.data() as Transaction);
      });

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "transaction.list.success",
      });
    } catch (error) {
      console.log("Transaction List ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "transaction.list.failure",
        error,
      });
    }
  },
  Create: async (req: Request, res: Response) => {
    try {
      if (!req.body.name) return res.status(400).json({status: RESPONSE_STATUS.FAILURE, message: "error.transaction.badname"});
      if (!req.body.categoryId) return res.status(400).json({status: RESPONSE_STATUS.FAILURE, message: "error.transaction.misscateid"});

      const trans: Transaction = {...req.body};

      trans.createdAt = new Date().toISOString();
      trans.updatedAt = new Date().toISOString();
      trans.userId = req.headers["userId"] as string;

      const doc = db.collection(collection).doc();

      trans.id = doc.id;

      await doc.create(trans);

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "transaction.create.success",
        data: {...trans},
      });
    } catch (error) {
      console.log("Transaction Create ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "transaction.create.failure",
        error,
      });
    }
  },
  Update: async (req: Request, res: Response) => {
    try {
      const doc = db.doc(`/${ collection }/${ req.params.id }`);
      const data = await doc.get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.transaction.notfound"});

      const trans: any = data.data();

      if (trans.userId !== req.headers["userId"]) return res.status(401).json({status: RESPONSE_STATUS.FAILURE, message: "error.transaction.unauth"});

      for (const i in req.body) {
        if (req.body[i] || req.body[i] === 0) {
          trans[i] = req.body[i];
        }
      }

      trans.updatedAt = new Date().toISOString();

      await doc.update(trans);

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "transaction.update.success",
      });
    } catch (error) {
      console.log("Transaction Update ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "transaction.update.failure",
        error,
      });
    }
  },
  Delete: async (req: Request, res: Response) => {
    try {
      const doc = db.doc(`/${ collection }/${ req.params.id }`);
      const data = await doc.get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.transaction.notfound"});

      const trans: Transaction = data.data() as Transaction;

      if (trans.userId !== req.headers["userId"]) return res.status(401).json({status: RESPONSE_STATUS.FAILURE, message: "error.transaction.unauth"});

      await doc.delete();

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "transaction.delete.success",
      });
    } catch (error) {
      console.log("Transaction Retrieve ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "transaction.delete.failure",
        error,
      });
    }
  },
};
