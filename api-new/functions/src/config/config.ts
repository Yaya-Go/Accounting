import * as admin from "firebase-admin";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import * as account from "./service_account.json";
import * as security from "./security_auth.json";

admin.initializeApp({
  credential: admin.credential.cert(account as admin.ServiceAccount),
  ...security,
});

const db = admin.firestore();
const storage = admin.storage();

const firebaseApp = initializeApp(security);
const auth = getAuth(firebaseApp);

export {admin, db, storage, auth};

// lsof -i :8080
