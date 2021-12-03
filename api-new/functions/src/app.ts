import * as express from "express";
import * as cors from "cors";
import {Request, Response, NextFunction} from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
}));
// app.options('*', cors);

app.use((req: Request, res: Response, next: NextFunction) => {
  // const origin = req.headers.origin;
  // console.log(origin);
  // if (origin && ["http://localhost:4200"].includes(origin)) {
  //   res.setHeader("Access-Control-Allow-Origin", origin);
  // }
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Here allow all the HTTP methods you want
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,HEAD,PUT,OPTIONS");
  // Here you allow the headers for the HTTP requests to your server
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/welcome", (req: Request, res: Response) => {
  return res.json({message: "Welcome"});
});

import {router} from "./routers/base.router";

app.use("/", router);

export {app};
