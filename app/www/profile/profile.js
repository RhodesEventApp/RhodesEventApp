import { 
    onAuthStateChanged, 
    connectAuthEmulator,
    updateProfile,
    updateEmail,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

import { 
    collection,
    addDoc,
    connectFirestoreEmulator,
    getDoc,
    getDocs,
    updateDoc,
    doc,
    query,
    where,
    arrayUnion,
    arrayRemove
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import { logout } from '../auth/auth.js';
import { showElement, hideElement } from '../common/ui.js';
import { auth, db } from '../common/firebase.js';

let userRef = null;
let starredPosts = [];


// Monitor auth state
const monitorAuthState = () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            document.getElementById("update-email").value = auth.currentUser.email;
            document.getElementById("update-username").value = auth.currentUser.displayName;
            document.getElementById("update-password").value = auth.currentUser.password;
            showElement("authorized");
            hideElement("unauthorized");
            userRef = doc(db, "users", user.uid);
            await getStarredPosts();
            await displayPosts();
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

const getStarredPosts = async () => {
    let user = await getDoc(userRef);
    starredPosts = await user.get("starred");
    console.log(starredPosts);
}

const displayPosts = async () => {
    // const q = query(collection(db, "posts"), where("id", "in", starredPosts));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //     document.getElementById("feed").innerHTML +=
    //     `
    //     <article>
    //         <p class="username">${doc.get("username")}</p>
    //         <p class="caption">${doc.get("caption")}</p>
    //         <img class="poster" src="${doc.get("file")}">
    //     </article>
    //     `;
    // });

    starredPosts.forEach(async (postid) => {
        let postRef = doc(db, "posts", postid);
        let post = await getDoc(postRef);
        document.getElementById("feed").innerHTML +=
        `
        <article>
            <p class="username">${post.get("username")}</p>
            <p class="caption">${post.get("caption")}</p>
            <img class="poster" src="${post.get("file")}">
        </article>
        `;
    });
}

document.getElementById("logout-btn").addEventListener("click", logout);

connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, "localhost", 8080);

monitorAuthState();
