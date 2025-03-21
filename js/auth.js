// auth.js - Handles User Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Signup Function
function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const username = document.getElementById("signup-username").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            set(ref(db, 'users/' + userCredential.user.uid), {
                username: username,
                email: email,
                role: "student" // Default role
            });
            alert("Signup Successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => alert(error.message));
}

// Login Function
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => alert(error.message));
}

// Logout Function
function logout() {
    signOut(auth).then(() => {
        alert("Logged out!");
        window.location.href = "index.html";
    }).catch((error) => alert(error.message));
}

window.signup = signup;
window.login = login;
window.logout = logout;
