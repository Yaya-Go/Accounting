import {Request, Response} from "express";
import {db} from "../config/config";
import {RESPONSE_STATUS} from "../models/enums";
import {Tag} from "../models/types";

const collection = "tags";

export const TagController = {
  Retrieve: async (req: Request, res: Response) => {
    try {
      const data = await db.doc(`/${ collection }/${ req.params.id }`).get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.tag.notfound"});

      const tag: Tag = data.data() as Tag;

      const list = await db.collection("category").where("tagId", "==", req.params.id).get();
      const category: any = {};
      const documents: any[] = [];
      const results: any[] = [];

      list.forEach((doc) => {
        if (doc.exists) {
          category[doc.id] = doc.data();
          documents.push(db.doc(`/metadata/category-${ doc.id }`));
        }
      });

      const metalist = await db.getAll(...documents);

      metalist.forEach((doc) => {
        const data = category[doc.id.split("-")[1]];
        data.metadata = doc.data();
        results.push(data);
      });

      const metadata = await db.doc(`/metadata/tag-${ tag.id }`).get();


      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "tags.retrieve.success",
        data: {
          ...tag,
          metadata: metadata.data(),
          category: results,
        },
      });
    } catch (error) {
      console.log("Tag Retrieve ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "tags.retrieve.error",
        error,
      });
    }
  },
  List: async (req: Request, res: Response) => {
    try {
      const tags: Tag[] = [];
      const data = await db.collection(collection).where("userId", "==", req.headers["userId"]).get();
      data.forEach((doc) => {
        if (doc.exists) tags.push(doc.data() as Tag);
      });

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "tags.list.success",
        data: tags,
      });
    } catch (error) {
      console.log("Tag List ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "tags.list.error",
        error,
      });
    }
  },
  Create: async (req: Request, res: Response) => {
    try {
      if (!req.body.name) return res.status(400).json({status: RESPONSE_STATUS.FAILURE, message: "error.tag.badname"});

      const tag: Tag = {...req.body};

      tag.createdAt = new Date().toISOString();
      tag.updatedAt = new Date().toISOString();
      tag.userId = req.headers["userId"] as string;

      const doc = db.collection(collection).doc();

      tag.id = doc.id;

      await doc.create(tag);

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "tags.create.success",
        data: {...tag},
      });
    } catch (error) {
      console.log("Tag Create ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "tags.create.error",
        error,
      });
    }
  },
  Update: async (req: Request, res: Response) => {
    try {
      const doc = db.doc(`/${ collection }/${ req.params.id }`);
      const data = await doc.get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.tag.notfound"});

      const tag: Tag = data.data() as Tag;

      if (tag.userId !== req.headers["userId"]) return res.status(401).json({status: RESPONSE_STATUS.FAILURE, message: "error.tag.unauth"});

      tag.name = req.body.name || tag.name;
      tag.updatedAt = new Date().toISOString();

      await doc.update(tag);

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "tags.update.success",
      });
    } catch (error) {
      console.log("Tag Update ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "tags.update.errpr",
        error,
      });
    }
  },
  Delete: async (req: Request, res: Response) => {
    try {
      const doc = db.doc(`/${ collection }/${ req.params.id }`);
      const data = await doc.get();

      if (!data.exists) return res.status(404).json({status: RESPONSE_STATUS.FAILURE, message: "error.tag.notfound"});

      const tag: Tag = data.data() as Tag;

      if (tag.userId !== req.headers["userId"]) return res.status(401).json({status: RESPONSE_STATUS.FAILURE, message: "error.tag.unauth"});

      await doc.delete();

      return res.json({
        status: RESPONSE_STATUS.SUCCESS,
        message: "tags.delete.success",
      });
    } catch (error) {
      console.log("Tag Delete ==========> ", error);
      return res.status(500).json({
        status: RESPONSE_STATUS.ERROR,
        message: "tags.delete.error",
        error,
      });
    }
  },
};
