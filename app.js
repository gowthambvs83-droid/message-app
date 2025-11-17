let userEmail = localStorage.getItem("email");
const API = ""; // empty means same domain

function login() {
  const email = document.getElementById("email").value;

  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("email", email);
    window.location = "chat.html";
  });
}

if (window.location.pathname.includes("chat.html")) {
  document.getElementById("welcome").innerText = "Logged in as: " + userEmail;
  loadMessages();
}

function sendMsg() {
  const receiver = document.getElementById("receiver").value;
  const message = document.getElementById("msg").value;

  fetch(`${API}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: userEmail, receiver, message })
  })
  .then(res => res.json())
  .then(() => alert("Message Sent!"));
}

function loadMessages() {
  fetch(`${API}/messages/${userEmail}`)
    .then(res => res.json())
    .then(data => {
      const box = document.getElementById("messages");
      box.innerHTML = "";

      data.messages.forEach(msg => {
        box.innerHTML += `<p><b>${msg.sender}:</b> ${msg.message}</p>`;
      });
    });

  setTimeout(loadMessages, 3000);
}
