import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { 
    getAuth,
    onAuthStateChanged, 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    connectAuthEmulator
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyCBlUCVYlX8eDsq3HrY8FNyLW-n7W8a-f8",
    authDomain: "rhodes-event-app.firebaseapp.com",
    projectId: "rhodes-event-app",
    storageBucket: "rhodes-event-app.appspot.com",
    messagingSenderId: "971156122604",
    appId: "1:971156122604:web:18693652d87e028413aec9",
    measurementId: "G-97KDY6FCG8"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

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

const showLoginError = () => {
    document.getElementById("error-message").style.display = "block";
// console.log("debug");
}

const showLogoutButton = () => {
    document.getElementById("logout").style.display = "block";
}

const hideLoginForm = () => {
    document.getElementById("login-form").style.display = "none";
}

const showLoginForm = () => {
    document.getElementById("login-form").style.display = "block";
}

// Monitor auth state
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(user)
            showLogoutButton();
            hideLoginForm();
        }
        else {
            showLoginForm()
        }
    })
}

// Log out
const logout = async () => {
    await signOut(auth);
}

const enableLocalDebug = () => {
    connectAuthEmulator(auth, "http://localhost:9099");
}

document.getElementById("login").addEventListener("click", function(event){
    event.preventDefault();
    loginEmailPassword();
  });
document.getElementById("signup").addEventListener("click", function(event){
    event.preventDefault();
    createAccount();
  });
document.getElementById("logout").addEventListener("click", logout);

enableLocalDebug();
monitorAuthState();