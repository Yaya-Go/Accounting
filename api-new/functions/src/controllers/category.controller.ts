import {Request, Response} from "express";
import {Category, Transaction} from "../models/types";
import {db} from "../config/config";
import {RESPONSE_STATUS} from "../models/enums";

const collection = "category";

export const CategoryController = {
  Retrieve: async (req: Request, res: Response) => {
    try {
      const data = await db.doc(`/${ collection }/${ req.params.id }`).get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.category.notfound"});

      const category: Category = data.data() as Category;

      const transactions: Transaction[] = [];

      const list = await db.collection("transactions").where("categoryId", "==", category.id).get();

      list.forEach((doc) => {
        if (doc.exists) transactions.push(doc.data() as Transaction);
      });

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "category.retrieve.success",
        data: {
          ...category,
          transactions,
        },
      });
    } catch (error) {
      console.log("Category Retrieve ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "category.retrieve.error",
        error,
      });
    }
  },
  List: async (req: Request, res: Response) => {
    try {
      const category: Category[] =[];
      const data = await db.collection(collection).where("tagId", "==", req.params.tagId).get();

      if (!data.empty) {
        data.forEach((doc) => {
          if (doc.exists) category.push(doc.data() as Category);
        });
      }

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "category.list.success",
        data: category,
      });
    } catch (error) {
      console.log("Category List ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "category.list.error",
        error,
      });
    }
  },
  Create: async (req: Request, res: Response) => {
    try {
      if (!req.body.name) return res.status(400).json({status: RESPONSE_STATUS.FAILURE, message: "error.category.badname"});
      if (!req.body.tagId) return res.status(400).json({status: RESPONSE_STATUS.FAILURE, message: "error.category.misstagid"});

      const category: Category = {...req.body};

      category.updatedAt = new Date().toISOString();
      category.createdAt = new Date().toISOString();
      category.userId = req.headers["userId"] as string;

      const doc = db.collection(collection).doc();
      category.id = doc.id;

      await doc.create(category);

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "category.create.success",
        data: {...category},
      });
    } catch (error) {
      console.log("Category Create ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "category.create.error",
        error,
      });
    }
  },
  Update: async (req: Request, res: Response) => {
    try {
      const doc = db.doc(`/${ collection }/${ req.params.id }`);
      const data = await doc.get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "erorr.category.notfound"});

      const category: Category = data.data() as Category;

      if (category.userId !== req.headers["userId"]) return res.status(401).json({status: RESPONSE_STATUS.FAILURE, message: "error.category.unauth"});

      category.name = req.body.name || category.name;
      category.updatedAt = new Date().toISOString();

      await doc.update(category);

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "category.update.success",
      });
    } catch (error) {
      console.log("Category Update ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "category.update.error",
        error,
      });
    }
  },
  Delete: async (req: Request, res: Response) => {
    try {
      const doc = db.doc(`/${ collection }/${ req.params.id }`);
      const data = await doc.get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.category.notfound"});

      const category: Category = data.data() as Category;

      if (category.userId !== req.headers["userId"]) return res.status(401).json({status: RESPONSE_STATUS.FAILURE, message: "error.category.unauth"});

      await doc.delete();

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "category.delete.success",
      });
    } catch (error) {
      console.log("Category Delete ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "category.delete.error",
        error,
      });
    }
  },
};
