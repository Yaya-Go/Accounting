import * as functions from "firebase-functions";
import {app} from "./app";
import {CategroyHooks, TagHooks, TransactionHooks} from "./config/hooks";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.api = functions.region("us-east4").https.onRequest(app);

exports.onTagCreate = functions
    .region("us-east4")
    .firestore
    .document("/tags/{tagId}")
    .onCreate(async (snapshot, context) => {
      TagHooks.onCreate(snapshot, context);
    });

exports.onTagDeleted = functions
    .region("us-east4")
    .firestore
    .document("/tags/{tagId}")
    .onDelete(async (snapshot, context) => {
      TagHooks.onDelete(snapshot, context);
    });

exports.onCategoryCreate = functions
    .region("us-east4")
    .firestore
    .document("/category/{categoryId}")
    .onCreate(async (snapshot, context) => {
      CategroyHooks.onCreate(snapshot, context);
    });

exports.onCategoryDeleted = functions
    .region("us-east4")
    .firestore
    .document("/category/{categoryId}")
    .onDelete(async (snapshot, context) => {
      CategroyHooks.onDelete(snapshot, context);
    });

exports.onTransactionCreate = functions
    .region("us-east4")
    .firestore
    .document("/transactions/{transId}")
    .onCreate(async (snapshot, context) => {
      TransactionHooks.onCreate(snapshot, context);
    });

exports.onTransactionUpdate = functions
    .region("us-east4")
    .firestore
    .document("/transactions/{transId}")
    .onWrite(async (change, context) => {
      TransactionHooks.onWrite(change, context);
    });

exports.onTransactionDeleted = functions
    .region("us-east4")
    .firestore
    .document("/transactions/{transId}")
    .onDelete(async (snapshot, context) => {
      TransactionHooks.onDelete(snapshot, context);
    });

