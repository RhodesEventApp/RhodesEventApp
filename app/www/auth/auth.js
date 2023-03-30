import { 
    getAuth,
    onAuthStateChanged, 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    connectAuthEmulator
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

import { app } from '../../firebase.js';

const auth = getAuth(app);

// let username = null;

// Login using email/password
const loginEmailPassword = async () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch(error) {
        console.log(`There was an error: ${error}`)
        showLoginError(error)
    }
}

// Create new account using email/password
const createAccount = async () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(`email ${email}, password ${password}`)
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    }
    catch(error) {
        console.log(`There was an error: ${error}`)
        showLoginError(error)
    } 
}

// Log out
const logout = async () => {
    await signOut(auth);
}

const enableLocalDebug = () => {
    connectAuthEmulator(auth, "http://localhost:9099");
}

const showLoginError = () => {
    document.getElementById("error-message").style.display = "block";
}

export {auth, loginEmailPassword, createAccount, logout, enableLocalDebug};