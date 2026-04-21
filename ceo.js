const ceoBtn = document.getElementById('ceo-btn');
const ceoModal = document.getElementById('ceo-modal');
const ceoClose = document.getElementById('ceo-close');
const ceoMessages = document.getElementById('ceo-messages');
const ceoInput = document.getElementById('ceo-input');
const ceoSend = document.getElementById('ceo-send');

let chatHistory = [];
let isWaiting = false;

ceoBtn.addEventListener('click', () => {
  ceoModal.classList.add('open');
  if (chatHistory.length === 0) {
    appendMessage('assistant', 'よう。何が聞きたい？');
    chatHistory.push({ role: 'assistant', content: 'よう。何が聞きたい？' });
  }
  setTimeout(() => ceoInput.focus(), 100);
});

ceoClose.addEventListener('click', closeModal);
ceoModal.addEventListener('click', (e) => {
  if (e.target === ceoModal) closeModal();
});

ceoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

ceoSend.addEventListener('click', sendMessage);

function closeModal() {
  ceoModal.classList.remove('open');
}

function appendMessage(role, text) {
  const div = document.createElement('div');
  div.className = `ceo-msg ceo-msg--${role}`;
  div.textContent = text;
  ceoMessages.appendChild(div);
  ceoMessages.scrollTop = ceoMessages.scrollHeight;
}

function setWaiting(val) {
  isWaiting = val;
  ceoSend.disabled = val;
  ceoInput.disabled = val;
}

async function sendMessage() {
  const text = ceoInput.value.trim();
  if (!text || isWaiting) return;

  ceoInput.value = '';
  appendMessage('user', text);
  chatHistory.push({ role: 'user', content: text });

  setWaiting(true);
  const typing = document.createElement('div');
  typing.className = 'ceo-msg ceo-msg--assistant ceo-typing';
  typing.textContent = '...';
  ceoMessages.appendChild(typing);
  ceoMessages.scrollTop = ceoMessages.scrollHeight;

  try {
    const res = await fetch('/api/ceo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory }),
    });

    typing.remove();

    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    appendMessage('assistant', data.reply);
    chatHistory.push({ role: 'assistant', content: data.reply });
  } catch {
    typing.remove();
    appendMessage('assistant', '繋がらなかった。もう一度頼む。');
  } finally {
    setWaiting(false);
    ceoInput.focus();
  }
}
