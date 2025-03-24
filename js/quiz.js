// quiz.js
import { auth, db } from "./firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

document.getElementById("submit-quiz").addEventListener("click", submitQuiz);

async function loadQuiz(chapter) {
    if (!auth.currentUser) {
        alert("You need to log in to take the quiz.");
        return;
    }

    const quizData = {
        1: { question: "What is MATLAB used for?", options: ["Cooking", "Math & Engineering", "Dancing", "Gaming"], answer: 1 },
        2: { question: "How to create a matrix in MATLAB?", options: ["matrix()", "[1 2; 3 4]", "create_matrix()", "mat()"], answer: 1 },
        3: { question: "Which function is used for plotting in MATLAB?", options: ["draw()", "plot()", "graph()", "figure()"], answer: 1 }
    };

    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h3>${quizData[chapter].question}</h3>`;
    quizData[chapter].options.forEach((option, index) => {
        quizContainer.innerHTML += `<input type='radio' name='quiz' value='${index}'> ${option}<br>`;
    });
    document.getElementById("quiz-section").style.display = "block";
}

async function submitQuiz() {
    const user = auth.currentUser;
    if (!user) {
        alert("You need to log in to submit the quiz.");
        return;
    }

    const selected = document.querySelector("input[name='quiz']:checked");
    if (!selected) {
        alert("Please select an answer.");
        return;
    }

    const chapter = 1; // Replace this dynamically based on the chapter
    const correctAnswer = 1; // Get this dynamically from the quizData
    let score = 0;

    if (parseInt(selected.value) === correctAnswer) {
        score = 10;
        alert("Correct answer! 🎉");
    } else {
        alert("Wrong answer. Try again! ❌");
    }

    await setDoc(doc(db, "scores", user.uid), { chapter: chapter, score: score }, { merge: true });
    alert("Your score has been recorded!");
}
