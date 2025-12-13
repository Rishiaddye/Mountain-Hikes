// firebase-config.js
// Keep this file as an ES module and import it with `import { db, auth } from './firebase-config.js'`

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Replace these values with the exact values from your Firebase console (Project settings).
  const firebaseConfig = {
    apiKey: "AIzaSyAhHfsDfEg5NDNSy8YPKdEp8VCKNFR_aQ8",
    authDomain: "mountain-hikes-4d094.firebaseapp.com",
    projectId: "mountain-hikes-4d094",
    storageBucket: "mountain-hikes-4d094.firebasestorage.app",
    messagingSenderId: "712204349758",
    appId: "1:712204349758:web:0d195c59b991139f593c6f"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
