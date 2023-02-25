import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBlUCVYlX8eDsq3HrY8FNyLW-n7W8a-f8",
  authDomain: "rhodes-event-app.firebaseapp.com",
  projectId: "rhodes-event-app",
  storageBucket: "rhodes-event-app.appspot.com",
  messagingSenderId: "971156122604",
  appId: "1:971156122604:web:18693652d87e028413aec9",
  measurementId: "G-97KDY6FCG8"
};

// Login using email/password
const loginEmailPassword = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // step 1: try doing this w/o error handling, and then add try/catch
    await signInWithEmailAndPassword(auth, email, password)

    // step 2: add error handling
    // try {
    //   await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    // }
    // catch(error) {
    //   console.log(`There was an error: ${error}`)
    //   showLoginError(error)
    // }
}

// Create new account using email/password
const createAccount = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(`email ${email}, password ${password}`)
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  }
  catch(error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  } 
}

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      showApp()
      showLoginState(user)

      hideLoginError()
      hideLinkError()
    }
    else {
      showLoginForm()
      lblAuthState.innerHTML = `You're not logged in.`
    }
  })
}

// Log out
const logout = async () => {
  await signOut(auth);
}

const auth = getAuth(firebaseConfig);

const init = () => {
  connectAuthEmulator(auth, "http://localhost:9099");
  monitorAuthState();
}

// window.onload = init;
export {loginEmailPassword, createAccount, logout, init}