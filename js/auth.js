// auth.js
import { auth, db } from "./firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("signup-btn").addEventListener("click", signup);
document.getElementById("logout-btn").addEventListener("click", logout);
document.getElementById("subscribe-btn").addEventListener("click", subscribeUser);

onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("signup-btn").style.display = "none";
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().subscribed) {
            unlockContent();
        } else {
            document.getElementById("subscribe").style.display = "block";
        }
    } else {
        document.getElementById("logout-btn").style.display = "none";
        document.getElementById("login-btn").style.display = "block";
        document.getElementById("signup-btn").style.display = "block";
    }
});

async function login() {
    const email = prompt("Enter email:");
    const password = prompt("Enter password:");
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
    } catch (error) {
        alert("Login failed: " + error.message);
    }
}

async function signup() {
    const email = prompt("Enter email:");
    const password = prompt("Enter password:");
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), { subscribed: false });
        alert("Account created! Please subscribe.");
    } catch (error) {
        alert("Signup failed: " + error.message);
    }
}

async function logout() {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.reload();
}

async function subscribeUser() {
    const user = auth.currentUser;
    if (!user) {
        alert("You need to log in first.");
        return;
    }
    await setDoc(doc(db, "users", user.uid), { subscribed: true });
    alert("Subscription successful! You can now access all videos.");
    unlockContent();
}

function unlockContent() {
    document.getElementById("subscribe").style.display = "none";
    document.querySelectorAll(".restricted").forEach((chapter) => {
        const chapterNum = chapter.getAttribute("data-chapter");
        const videoLinks = [
            "https://youtu.be/0f-WC2Vz9hU", "https://youtu.be/CTZv-5AtDPk",
            "https://youtu.be/rnTENrxQ9tc", "https://youtu.be/gJ3vOlqFEPA",
            "https://youtu.be/2pzjZxWLdBE", "https://youtu.be/kIcky95QOBI"
        ];
        chapter.innerHTML = `<h2>Chapter ${chapterNum}</h2>
            <a href="${videoLinks[chapterNum - 2]}" target="_blank">
                <img src="https://img.youtube.com/vi/${videoLinks[chapterNum - 2].split("/").pop()}/0.jpg" alt="Thumbnail">
            </a>
            <button onclick="window.open('${videoLinks[chapterNum - 2]}', '_blank')">Watch</button>`;
    });
}
