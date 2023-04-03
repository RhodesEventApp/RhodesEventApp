import { 
    getAuth,
    onAuthStateChanged, 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    connectAuthEmulator
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

import { app } from '../common/firebase.js';
import { showElement } from '../common/ui.js';

const auth = getAuth(app);

// let username = null;

// Login using email/password
const loginEmailPassword = async () => {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch(error) {
        showElement("error-message");
        document.getElementById("error-message").innerHTML = `${error.message}`;
    }
}

// Create new account using email/password
const createAccount = async () => {
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;
    var username = document.getElementById("username").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: username,
            }).then(() => {

            }).catch((error) => {
                showElement("error-message");
                document.getElementById("error-message").innerHTML = `${error.message}`;
            });
        })
        .catch((error) => {
            showElement("error-message");
            document.getElementById("error-message").innerHTML = `${error.message}`;
        });
}

// Log out
const logout = async () => {
    await signOut(auth);
}

const enableLocalDebug = () => {
    connectAuthEmulator(auth, "http://localhost:9099");
}

export {auth, loginEmailPassword, createAccount, logout, enableLocalDebug};