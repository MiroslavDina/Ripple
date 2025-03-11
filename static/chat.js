const socket = io();
let username = "";

// Function to set username
function setUsername() {
    username = document.getElementById("username").value.trim();
    if (username !== "") {
        document.getElementById("username-container").style.display = "none";
        document.getElementById("chat-interface").style.display = "block";
        document.getElementById("chat-box").style.display = "block";

        // Fetch all messages from the server
        fetch("/messages")
            .then(response => response.json())
            .then(messages => {
                messages.forEach(msg => {
                    appendMessage({
                        username: msg.username,
                        message: msg.message
                    });
                });
                scrollToLatestMessage(); // Scroll to the latest message after loading
            });
    } else {
        alert("Please enter your name!");
    }
}

// Handle Enter key for joining chat
document.getElementById("username").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        setUsername();
    }
});

// Function to send text messages
function sendMessage() {
    let messageInput = document.getElementById("message");
    let message = messageInput.value.trim();

    if (message !== "") {
        socket.send({ username: username, message: message });
        messageInput.value = "";  // Clear input
    }
}

// Handle Enter key for sending messages
document.getElementById("message").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Listen for messages
socket.on("message", (data) => {
    appendMessage(data);
});

// Append a message to the chat box
function appendMessage(data) {
    let chatBox = document.getElementById("chat-box");

    let messageHTML = `
        <div>
            <strong style="color: ${getRandomColor()};">${data.username}:</strong>
            <span class="message-text">${data.message}</span>
        </div>
    `;

    chatBox.innerHTML += messageHTML;
    scrollToLatestMessage(); // Auto-scroll to the latest message
}

// Scroll to the latest message
function scrollToLatestMessage() {
    let chatBox = document.getElementById("chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to generate random colors for usernames
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}