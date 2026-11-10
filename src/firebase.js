import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAaWnUFQr9fv9Qi2waX0CtNGEjuSNK7-2Q",
  authDomain: "musa-456e7.firebaseapp.com",
  projectId: "musa-456e7",
  storageBucket: "musa-456e7.firebasestorage.app",
  messagingSenderId: "1045354354038",
  appId: "1:1045354354038:web:25d6417b33be55fd5e1657",
  measurementId: "G-6GTBFWTEPH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
