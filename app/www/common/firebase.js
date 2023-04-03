import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';

import { 
    getStorage,
    ref
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js';

import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyCBlUCVYlX8eDsq3HrY8FNyLW-n7W8a-f8",
    authDomain: "rhodes-event-app.firebaseapp.com",
    projectId: "rhodes-event-app",
    storageBucket: "rhodes-event-app.appspot.com",
    messagingSenderId: "971156122604",
    appId: "1:971156122604:web:18693652d87e028413aec9",
    measurementId: "G-97KDY6FCG8",
    storageBucket: "gs://rhodes-event-app.appspot.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const db = getFirestore(app);


export {app, auth, storage, storageRef, db};