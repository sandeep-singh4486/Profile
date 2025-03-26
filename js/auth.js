// auth.js - Handles User Authentication

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAVW5dcl1kQlbtv8rAAMKhyZVxp6qNJRM",
    authDomain: "matlab-learning-lms.firebaseapp.com",
    projectId: "matlab-learning-lms",
    storageBucket: "matlab-learning-lms.firebasestorage.app",
    messagingSenderId: "744980660607",
    appId: "1:744980660607:web:199284b0407cfa39cf9a4a",
    measurementId: "G-04M17F2TLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
