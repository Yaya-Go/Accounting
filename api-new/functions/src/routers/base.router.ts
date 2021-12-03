import * as express from "express";
import {AuthController} from "../controllers/auth.controller";
import {AuthCheck} from "../config/middleware";
import {TagController} from "../controllers/tag.controller";
import {CategoryController} from "../controllers/category.controller";
import {TransactionController} from "../controllers/transaction.controller";
import {ItemController} from "../controllers/item.controller";

const router = express.Router();

// Auth
router.post("/login", AuthController.Login);
router.post("/register", AuthController.Register);

// Tag
router.get("/tags", AuthCheck, TagController.List);
router.get("/tag/:id", AuthCheck, TagController.Retrieve);
router.post("/tag", AuthCheck, TagController.Create);
router.put("/tag/:id", AuthCheck, TagController.Update);
router.delete("/tag/:id", AuthCheck, TagController.Delete);

// Category
router.get("/tag/:tagId/category", AuthCheck, CategoryController.List);
router.get("/category/:id", AuthCheck, CategoryController.Retrieve);
router.post("/category", AuthCheck, CategoryController.Create);
router.put("/category/:id", AuthCheck, CategoryController.Update);
router.delete("/category/:id", AuthCheck, CategoryController.Delete);

// Transaction
router.get("/category/:categoryId/transactions", AuthCheck, TransactionController.List);
router.get("/transaction/:id", AuthCheck, TransactionController.Retrieve);
router.post("//transaction", AuthCheck, TransactionController.Create);
router.put("/transaction/:id", AuthCheck, TransactionController.Update);
router.delete("/transaction/:id", AuthCheck, TransactionController.Delete);

// Item
router.get("/transaction/:transId/items", AuthCheck, ItemController.List);
router.get("/item/:id", AuthCheck, ItemController.Retrieve);
router.post("/item", AuthCheck, ItemController.Create);
router.put("/item/:id", AuthCheck, ItemController.Update);
router.delete("/item/:id", AuthCheck, ItemController.Delete);


export {router};
