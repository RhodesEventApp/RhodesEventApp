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
}

const hideLoginError = () => {
    document.getElementById("error-message").style.display = "none";
}

const showLogoutButton = () => {
    document.getElementById("logout").style.display = "block";
}

const showLoggedUser = (email) => {
    document.getElementById("logged-user").innerHTML = `You are logged in as ${email}`;
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
            showLoggedUser(user.email);
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
document.getElementById("logout-btn").addEventListener("click", logout);
document.getElementById("email").addEventListener("focus", hideLoginError);
document.getElementById("password").addEventListener("focus", hideLoginError);

enableLocalDebug();
monitorAuthState();