import { 
    getAuth,
    onAuthStateChanged, 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    connectAuthEmulator
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

import { auth, createAccount, loginEmailPassword, logout, enableLocalDebug } from './auth.js';
import { showElement, hideElement } from '../common/ui.js';

const showLoggedUser = (username, email) => {
    document.getElementById("logged-user").innerHTML = `You are logged in as ${username} (${email})`;
}

// Monitor auth state
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(user)
            showLoggedUser(user.displayName, user.email);
            showElement("logout");
            hideElement("form");
        }
        else {
            showElement("form");
            hideElement("logout");
        }
    })
}

document.getElementById("login-btn").addEventListener("click", function(event){
    event.preventDefault();
    loginEmailPassword();
});

document.getElementById("signup-btn").addEventListener("click", function(event){
    event.preventDefault();
    if (document.getElementById("username").value === "") {
        showElement("error-message");
        document.getElementById("error-message").innerHTML = "Please enter a username";
        return;
    }
    createAccount();
});

document.getElementById("logout-btn").addEventListener("click", logout);

document.getElementById("login-email").addEventListener("focus", function(){
    hideElement("error-message");
});

document.getElementById("login-password").addEventListener("focus", function(){
    hideElement("error-message");
});

document.getElementById("signup-email").addEventListener("focus", function(){
    hideElement("error-message");
});

document.getElementById("signup-password").addEventListener("focus", function(){
    hideElement("error-message");
});

document.getElementById("login-option").addEventListener("click", function(){
    showElement("login-form");
    hideElement("signup-form");
});

document.getElementById("signup-option").addEventListener("click", function(){
    showElement("signup-form");
    hideElement("login-form");
});

enableLocalDebug();
monitorAuthState();