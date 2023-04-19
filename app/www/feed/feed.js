import { 
    ref,
    uploadBytes,
    getDownloadURL,
    connectStorageEmulator,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js';

import { 
    collection,
    addDoc,
    connectFirestoreEmulator,
    getDoc,
    getDocs,
    updateDoc,
    doc,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import {
    onAuthStateChanged,
    connectAuthEmulator,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

import { auth, storage, storageRef, db } from '../common/firebase.js';
import { hideElement, showElement } from '../common/ui.js';

let username = null;
let userid = null;

// Monitor auth state
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            showElement("post-form");
            hideElement("unauthorized");
            username = user.displayName;
            userid = user.uid;
        }
        else {
            hideElement("post-form");
            showElement("unauthorized");
        }
    })
}

const addDatabaseEntry = async (username, uid, fileurl, caption) => {
    const docRef = await addDoc(collection(db, "posts"), {
        username: username,
        file: fileurl,
        caption: caption,
        star: 0,
    });
    // const users = doc(db, "users", uid);
}

const uploadFile = () => {
    const caption = document.getElementById("caption").value;
    const file = document.getElementById("poster-file").files[0];
    const fileRef = ref(storageRef, file.name);
    uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(fileRef).then((url) => {
            addDatabaseEntry(username, url, caption).then(() => {
                window.location.reload();
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
}

const displayPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        document.getElementById("feed").innerHTML +=
        `
        <article>
            <p class="username">${doc.get("username")}</p>
            <p class="caption">${doc.get("caption")}</p>
            <img class="poster" src="${doc.get("file")}">
            <button class="star-btn" id="${doc.id}">Star</button><span class="stars">${doc.get("star")} people are interested in this event</span>
        </article>
        `
    });
}

const updateStar = async (id) => {
    let postRef = doc(db, "posts", id);
    let post = await getDoc(postRef);
    let curr = post.get("star");
    document.getElementById(id).nextElementSibling.innerHTML = `${curr + 1} people are interested in this event`;
    await updateDoc(postRef, "star", curr + 1);
}


const bindStarButtons = () => {
    [...document.getElementsByClassName("star-btn")].forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            updateStar(event.target.id);
        });
    });
}

document.getElementById("post-btn").addEventListener("click", function(event){
    event.preventDefault();
    uploadFile();
  });

connectStorageEmulator(storage, "localhost", 9199);
connectFirestoreEmulator(db, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099");
monitorAuthState();
displayPosts().then(() => {
    bindStarButtons();
});
