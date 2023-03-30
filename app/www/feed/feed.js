import { 
    getStorage,
    ref,
    uploadBytes,
    connectStorageEmulator,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js';

import {
    onAuthStateChanged, 
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';


import { app } from '../../firebase.js';
import { auth, enableLocalDebug } from '../auth/auth.js';

const storage = getStorage(app);

const storageRef = ref(storage);

// Monitor auth state
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            showFeed();
            hideLoginMessage();
        }
        else {
            hideFeed();
            showLoginMessage();
        }
    })
}

const hideFeed = () => {
    document.getElementById("feed").style.display = "none";
}

const showFeed = () => {
    document.getElementById("feed").style.display = "block";
}

const showLoginMessage = (email) => {
    document.getElementById("unauthorized").style.display = "block";
}

const hideLoginMessage = (email) => {
    document.getElementById("unauthorized").style.display = "none";
}

const uploadFile = () => {
    const file = document.getElementById("poster").files[0];
    const fileRef = ref(storageRef, file.name);
    uploadBytes(fileRef, file).then((snapshot) => {
        console.log('File uploaded!');
    });
}

document.getElementById("post").addEventListener("click", function(event){
    // event.preventDefault();
    uploadFile();
  });

connectStorageEmulator(storage, "localhost", 9199);
enableLocalDebug();
monitorAuthState();
