import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCke0Mq5CZ0yaaHY2VEeobIWNIKl2_9DGE",
    authDomain: "bg-remover-ef704.firebaseapp.com",
    projectId: "bg-remover-ef704",
    storageBucket: "bg-remover-ef704.firebasestorage.app",
    messagingSenderId: "594197006916",
    appId: "1:594197006916:web:1e8c749e582004eddd0a11",
    measurementId: "G-B63DMJ8WCJ"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)
const storage = getStorage(app);

export { auth, firestore, storage }