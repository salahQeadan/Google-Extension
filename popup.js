document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.type === "error") {
      const messagesDiv = document.getElementById('messages');
      const messagePara = document.createElement('p');
      messagePara.classList.add('message');
      messagePara.textContent = msg.message;
      messagesDiv.appendChild(messagePara);
      messagesDiv.style.display = 'block';
    }
  });
});
