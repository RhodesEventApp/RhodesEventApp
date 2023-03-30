import { 
    getStorage,
    ref,
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
            console.log(user);
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

enableLocalDebug();
monitorAuthState();
