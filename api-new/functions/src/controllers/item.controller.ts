import {Request, Response} from "express";
import {db} from "../config/config";
import {RESPONSE_STATUS} from "../models/enums";
import {Item} from "../models/types";

const collection = "items";

export const ItemController = {
  Retrieve: async (req: Request, res: Response) => {
    try {
      const data = await db.doc(`/${ collection }/${ req.params.id }`).get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.item.notfound"});

      const item: Item = data.data() as Item;

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "item.retrieve.success",
        data: {...item},
      });
    } catch (error) {
      console.log("Tag Create ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "item.retrieve.error",
        error,
      });
    }
  },
  List: async (req: Request, res: Response) => {
    try {
      const items: Item[] = [];
      const data = await db.collection(collection).where("transId", "==", req.params.transId).get();

      data.forEach((doc) => {
        if (doc.exists) items.push(doc.data() as Item);
      });

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "item.list.success",
        data: items,
      });
    } catch (error) {
      console.log("Tag Create ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "item.list.error",
        error,
      });
    }
  },
  Create: async (req: Request, res: Response) => {
    try {
      if (!req.body.name) return res.status(400).json({status: RESPONSE_STATUS.FAILURE, message: "error.item.badname"});
      if (!req.body.transId) return res.status(400).json({status: RESPONSE_STATUS.FAILURE, message: "error.item.misstransid"});

      const item: Item = {...req.body};

      item.createdAt = new Date().toISOString();
      item.updatedAt = new Date().toISOString();
      item.userId = req.headers["userId"] as string;

      const doc = db.collection(collection).doc();

      item.id = doc.id;

      await doc.create(item);

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "item.create.success",
        data: {...item},
      });
    } catch (error) {
      console.log("Tag Create ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "item.create.error",
        error,
      });
    }
  },
  Update: async (req: Request, res: Response) => {
    try {
      const doc = db.doc(`/${ collection }/${ req.params.id }`);
      const data = await doc.get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.item.notfound"});

      const item: any = data.data();

      for (const i in req.body) {
        if (req.body[i] || req.body[i] === 0) {
          item[i] = req.body[i];
        }
      }
      item.updatedAt = new Date().toISOString();

      await doc.update(item);

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "item.update.success",
      });
    } catch (error) {
      console.log("Tag Create ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "item.update.error",
        error,
      });
    }
  },
  Delete: async (req: Request, res: Response) => {
    try {
      const doc = db.doc(`/${ collection }/${ req.params.id }`);
      const data = await doc.get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.item.notfound"});

      const item: Item = data.data() as Item;

      if (item.userId !== req.headers["userId"]) return res.status(401).json({status: RESPONSE_STATUS.FAILURE, message: "error.item.unauth"});

      await doc.delete();

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "item.delete.success",
      });
    } catch (error) {
      console.log("Tag Create ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "item.delete.error",
        error,
      });
    }
  },
};
