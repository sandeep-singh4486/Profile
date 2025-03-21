// quiz.js
import { db, ref, push } from "./firebase.js";
import { sendEmailNotification } from "./email.js";
import { displayLeaderboard } from "./leaderboard.js";
import { displayAnalytics } from "./analytics.js";

function submitQuiz(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);

    const userName = formData.get('name');
    const userEmail = formData.get('email');
    const answer = formData.get('q1'); // Add more questions dynamically

    const quizResponse = {
        name: userName,
        email: userEmail,
        answer: answer,
        timestamp: new Date().toISOString()
    };

    push(ref(db, 'quizResponses/'), quizResponse)
        .then(() => {
            alert('Response submitted successfully!');
            sendEmailNotification(userName, userEmail);
            displayLeaderboard();
            displayAnalytics();
        })
        .catch(error => console.error('Error submitting quiz:', error));
}

window.submitQuiz = submitQuiz;
