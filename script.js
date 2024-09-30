import config from './config.js';

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
});

async function checkGmail() {
    const username = document.getElementById('mail').value;
    const resultMessage = document.getElementById('resultMessage');

    if (!username) {
        resultMessage.textContent = 'Please enter a Gmail ID.';
        return;
    }

    const url = 'https://gmail-username-availability-check.p.rapidapi.com/gusername';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': config.apiKey ,
            'x-rapidapi-host': 'gmail-username-availability-check.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        if (result.code == 200) {
            resultMessage.textContent = result.message;
            resultMessage.style.color = "white";
        } else {
            resultMessage.textContent = "Gmail ID is not available.";
            resultMessage.style.color = "red";
        }
    } catch (error) {
        console.error(error);
        resultMessage.textContent = 'There was an error checking the Gmail ID.';
        resultMessage.style.color = "red";
    }
}
