const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "yyg-accounting",
        "private_key_id": "6534bd3401f03de1b581fae00bf580dd542713ab",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKqgNlmxZYMrCi\nuBoghWWQZzE6hD/q/JOc05tGZ1hmd2g3F2bnlFy9vO+Gt2+gqswtWZ6oh5VUU0nT\nT2NFwNWwxe+tbiDx6mE2uciI7RVa8hLPtwinSctkHDIowcBwl/UBiRwwMXNtvwUP\nGKFczZx0uP5CfqcR4jA1oefqGez1rPcLODncVdx9ASP2nrcEUtz4Fcpbb84pAX16\nivdGNr2totmgcK0jbqgGjtpxJpK2eFEUdiBU6C0FnJbUUZKc2S3X9TZ/4F/wYSFC\nBGECIsiqAPjxbS+ZdIapFUjyzmpFBwvUaKecbTL9ZodaKDbPo4bPWfZXNH79XNt2\nGoiuI0NNAgMBAAECggEAGnRSYLE7m7Q0M+1htbSMAytBNRD90fP55csGdgx38Not\n36EdpOWMLJVM0/I+b0PURqgv6nJWVw1PMfbnL7wB+OMBjAs34DQ2z+C08VC3TKmU\nNIqBJesfUlhO4NyXvOrNB9AIvq650U3RwHx31cgeH+tk/zOOpeo3Xkzd28RaFuBq\n+1MSCSzHIuz+SaclHxS5zZIyGEcWJHl76E++8kniyf766cLhQZfYStilm4AKHCVi\nHbiczUZUf2e6N+1QMafHftJwQEnOj6m+F9oiItyqEaRWZf9+/7i/8Imfe/FdAE+i\nyY1yFe2CxYYJFskLFzazywq1zahtfzx4Pu5rXGIiuQKBgQD/pTfyiD9qrijKKc17\ndFUH0w6nsq6pKgnGvLO911iMia5FTYb2hkaJ/oD1rBYI2eVmOam5KoboY9LUpBNW\nI7SqwgVPTVzaYBG0g+aLyszEUw8p9vChFrgVqGfopeBywJKluCghxSEpDWxn7C7x\npgYv2H6od4Ub1Bb2i5QXh9eRhQKBgQDK8fsPl+7YOEgXaEWMzUKFbF5tx2oh/oHr\nAvKa+s8q1loh2pso80M3vRvzxdDY+jy1/T4d7YBUV86aSVWNNDvfFEsRLsGme2Qh\n8zQ5esrtmFNmXa7ps0Y5zC38OOJq4zruwbrQcpMNVyBe81ZoWqFbXvNHVtESFvuA\nXxXNrQCxKQKBgQDXnpatrVUvuW0V9mQluFzvmIhH0WGXtKlCQm6ntDYvcwDV2yn2\nTBK62ToT++0p0f62VfRdBQ18fJWaXDki8kKzs6me1XV3iofkZUvSpF5JSHUFxA35\nEJx7R+s8QowovVvzAnx23zm00mmYzZBaqNmXCVbq6MQQULZ9hASIRD8BsQKBgGR2\nKOvtMATEx5seuN8cdMOLg6sgPf+Z90IY8XOamJcCCRgdGRXKZgnfiUjBMcNXDFqi\ng+9YtGAMH2/swXbm1oR1jTtyQ9Zf2o+bzsxtZqr67r4Lvhxd7HOMCW+D0UFMPs4W\nBJ5POVAvQwz9tFZwFtQeSpuT9GbaDaHcb/SioWcRAoGBAIyyOH1+5uQYeErGQ8kF\nzXZAw1k3liy/p16mAIe/Cz0D4yG9iFuOOmhR+uStcbQKIr2NA6vzlyzxDVO09W00\n/ILR1r4C5dvXhEGpPGdNouC3gU10shrBvgLifAHyb9948M/PqUDif8sgL/8MasZn\nLtysywuq1YL/SJQ3B7PULxSU\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-dnxq0@yyg-accounting.iam.gserviceaccount.com",
        "client_id": "113588202895444467724",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dnxq0%40yyg-accounting.iam.gserviceaccount.com"
    }),
    apiKey: "AIzaSyBpTfLFYrtrJ7nYh5bOIPpwrmK4Zc0MvWU",
    authDomain: "yyg-accounting.firebaseapp.com",
    projectId: "yyg-accounting",
    storageBucket: "yyg-accounting.appspot.com",
    messagingSenderId: "19842034040",
    appId: "1:19842034040:web:9d5b618f3edcc5cf5ac08d"
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = { admin, db, storage };