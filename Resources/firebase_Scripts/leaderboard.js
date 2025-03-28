// leaderboard.js
import { db, get, ref, query, orderByChild, limitToLast } from "./firebase.js";

function displayLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    get(query(ref(db, 'quizResponses/'), orderByChild('timestamp'), limitToLast(5)))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const scores = Object.values(snapshot.val()).sort((a, b) => b.score - a.score);

                scores.forEach(entry => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${entry.name} - Score: ${entry.score}`;
                    leaderboardList.appendChild(listItem);
                });
            } else {
                leaderboardList.innerHTML = '<li>No scores available yet.</li>';
            }
        });
}

window.displayLeaderboard = displayLeaderboard;
