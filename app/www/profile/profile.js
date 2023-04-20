import { 
    onAuthStateChanged, 
    connectAuthEmulator
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

import { 
    connectFirestoreEmulator,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import { createAccount, loginEmailPassword, logout } from '../auth/auth.js';
import { showElement, hideElement } from '../common/ui.js';
import { auth, db } from '../common/firebase.js';

const showLoggedUser = (username, email) => {
    document.getElementById("email").innerHTML = `Email: ${email}`;
    document.getElementById("username").innerHTML = `Username: ${username}`;
}

// Monitor auth state
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            showLoggedUser(user.displayName, user.email);
            showElement("authorized");
            hideElement("unauthorized");
        }
        else {
            showElement("unauthorized");
            hideElement("authorized");
        }
    })
}

connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, "localhost", 8080);
monitorAuthState();