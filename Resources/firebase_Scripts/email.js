// email.js
function sendEmailNotification(userName, userEmail) {
    emailjs.init("YOUR_PUBLIC_KEY");

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_name: userName,
        to_email: userEmail,
        message: `Congratulations ${userName}, you completed the MATLAB LMS quiz!`
    })
    .then(() => alert(`Email sent to ${userEmail}`))
    .catch(error => console.error('Email error:', error));
}

export { sendEmailNotification };
