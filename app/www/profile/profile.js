import { 
    onAuthStateChanged, 
    connectAuthEmulator,
    updateProfile,
    updateEmail,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

import { 
    connectFirestoreEmulator,
    updateDoc,
    doc,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import { logout } from '../auth/auth.js';
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
            document.getElementById("update-email").value = auth.currentUser.email;
            document.getElementById("update-username").value = auth.currentUser.displayName;
            document.getElementById("update-password").value = auth.currentUser.password;
            showElement("authorized");
            hideElement("unauthorized");

        }
        else {
            showElement("unauthorized");
            hideElement("authorized");
        }
    })
}

const updateDatabaseEntry = async (username, email, uid) => {
    let userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        username: username,
        email: email,
    });
}

document.getElementById("update-btn").addEventListener("click", async (event) => {
    event.preventDefault();
    let email = document.getElementById("update-email").value;
    let username = document.getElementById("update-username").value;
    let password = document.getElementById("update-password").value;
    await updateProfile(auth.currentUser, {
        displayName: username,
        password: password,
    });
    await updateEmail(auth.currentUser, email);
    await updateDatabaseEntry(username, email, auth.currentUser.uid);
    window.location.reload();
});

document.getElementById("logout-btn").addEventListener("click", logout);

connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, "localhost", 8080);

monitorAuthState();