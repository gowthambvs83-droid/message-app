let userEmail = localStorage.getItem("email");

// LOGIN
function login() {
  const email = document.getElementById("email").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem("email", email);
      window.location = "chat.html";
    }
  });
}

// IF IN CHAT PAGE
if (window.location.pathname.includes("chat.html")) {
  document.getElementById("welcome").innerText = "Logged in as: " + userEmail;
  loadMessages();
}

// SEND MESSAGE
function sendMsg() {
  const receiver = document.getElementById("receiver").value;
  const message = document.getElementById("msg").value;

  fetch("http://localhost:3000/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: userEmail,
      receiver: receiver,
      message: message
    })
  })
  .then(res => res.json())
  .then(() => {
    alert("Message Sent!");
  });
}

// LOAD INBOX
function loadMessages() {
  fetch(`http://localhost:3000/messages/${userEmail}`)
    .then(res => res.json())
    .then(data => {
      const box = document.getElementById("messages");
      box.innerHTML = "";

      data.messages.forEach(msg => {
        box.innerHTML += `
          <p><b>${msg.sender}:</b> ${msg.message}</p>
        `;
      });
    });

  setTimeout(loadMessages, 3000); // auto refresh inbox
}
