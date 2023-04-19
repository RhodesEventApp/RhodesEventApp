import { 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

import { 
    collection,
    addDoc
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import { auth } from '../common/firebase.js';
import { showElement } from '../common/ui.js';

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
            updateProfile(auth.currentUser, {
                displayName: username,
            }).then(() => {
                addDatabaseEntry(username, email, auth.currentUser.uid);
                window.location.reload();
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

const addDatabaseEntry = async (username, email, uid) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            uid: uid,
            username: username,
            email: email,
            posts: [],
            starred: [],
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export {auth, loginEmailPassword, createAccount, logout};