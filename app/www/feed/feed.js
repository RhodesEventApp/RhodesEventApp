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
    getDocs,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import {
    onAuthStateChanged,
    connectAuthEmulator,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

import { auth, storage, storageRef, db } from '../common/firebase.js';
import { hideElement, showElement } from '../common/ui.js';

let username = null;

// Monitor auth state
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            showElement("post-form");
            hideElement("unauthorized");
            username = user.displayName;
        }
        else {
            hideElement("post-form");
            showElement("unauthorized");
        }
    })
}

const addDatabaseEntry = async (username, fileurl, caption) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            username: username,
            file: fileurl,
            caption: caption,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
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
        </article>
        `
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
displayPosts();
