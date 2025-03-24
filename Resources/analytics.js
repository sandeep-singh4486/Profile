// analytics.js
import { db, get, ref } from "./firebase.js";

function displayAnalytics() {
    get(ref(db, 'quizResponses/')).then((snapshot) => {
        if (snapshot.exists()) {
            const responses = Object.values(snapshot.val());

            document.getElementById('totalParticipants').innerText = responses.length;
            const avgScore = (responses.reduce((sum, entry) => sum + (parseInt(entry.score) || 0), 0) / responses.length).toFixed(1);
            document.getElementById('averageScore').innerText = avgScore;
        }
    });
}

window.displayAnalytics = displayAnalytics;
