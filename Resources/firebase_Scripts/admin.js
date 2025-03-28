// admin.js - Manages quiz questions, scores, and users
import { db, ref, set, get, push, remove } from "./firebase.js";
import { auth, logout } from "./auth.js";

// Ensure Only Admins Access This Page
function checkAdmin() {
    const user = auth.currentUser;
    if (user) {
        get(ref(db, 'users/' + user.uid)).then((snapshot) => {
            if (snapshot.exists() && snapshot.val().role !== "admin") {
                alert("Access Denied! Only Admins can access this page.");
                window.location.href = "index.html";
            }
        });
    }
}

// Add New Quiz Question
function addQuestion() {
    const questionText = document.getElementById('new-question').value;
    if (questionText) {
        push(ref(db, 'questions/'), { text: questionText });
        alert("Question Added!");
    }
}

// Display User Scores
function displayScores() {
    get(ref(db, 'quizResponses/')).then((snapshot) => {
        if (snapshot.exists()) {
            const scoresList = document.getElementById('user-scores');
            scoresList.innerHTML = '';
            Object.values(snapshot.val()).forEach(entry => {
                const listItem = document.createElement('li');
                listItem.textContent = `${entry.name}: ${entry.score}`;
                scoresList.appendChild(listItem);
            });
        }
    });
}

// Display and Manage Users
function displayUsers() {
    get(ref(db, 'users/')).then((snapshot) => {
        if (snapshot.exists()) {
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';
            Object.entries(snapshot.val()).forEach(([userId, userData]) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `${userData.username} (${userData.role}) 
                    <button onclick="deleteUser('${userId}')">Delete</button>
                    <button onclick="assignAdmin('${userId}')">Make Admin</button>`;
                userList.appendChild(listItem);
            });
        }
    });
}

// Delete User
function deleteUser(userId) {
    remove(ref(db, 'users/' + userId));
    alert("User Deleted!");
}

// Assign Admin Role
function assignAdmin(userId) {
    set(ref(db, 'users/' + userId + '/role'), "admin");
    alert("User is now an Admin!");
}

// Call functions when dashboard loads
window.onload = function() {
    checkAdmin();
    displayScores();
    displayUsers();
};

window.addQuestion = addQuestion;
window.logout = logout;
window.deleteUser = deleteUser;
window.assignAdmin = assignAdmin;
