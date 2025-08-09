// firebase.js (Inside /configs folder)
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Correct path to service account key

// Initialize Firebase Admin SDK with service account credentials and storage bucket name
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'bg-remover-ef704.firebasestorage.app',
});

const storage = admin.storage(); // Firebase Storage instance
const firestore = admin.firestore(); // Firestore instance

module.exports = { storage, firestore };