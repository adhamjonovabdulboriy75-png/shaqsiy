const chatMessages = document.querySelector('#chat-messages');
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const sendButton = document.querySelector('#send-button');

let conversationHistory = [];
let isLoading = false;

// Xabarni chatga chiqarish
function addMessage(text, sender) {
    const message = document.createElement('div');

    message.className = `message ${sender}`;

    const content = document.createElement('p');
    content.textContent = text;

    message.appendChild(content);
    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return message;
}

// Kutish xabari
function showTyping() {
    const typing = document.createElement('div');

    typing.className = 'message assistant typing';
    typing.textContent = 'Abdulboriy AI yozmoqda...';

    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return typing;
}

// AI bilan suhbat
async function sendMessage(messageText) {
    if (isLoading || !messageText.trim()) return;

    isLoading = true;
    sendButton.disabled = true;

    addMessage(messageText, 'user');

    conversationHistory.push({
        role: 'user',
        content: messageText,
    });

    chatInput.value = '';

    const typing = showTyping();

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: messageText,
                history: conversationHistory,
            }),
        });

        const responseText = await response.text();

        if (!responseText) {
            throw new Error('Server bo‘sh javob qaytardi.');
        }

        let data;

        try {
            data = JSON.parse(responseText);
        } catch {
            throw new Error('Server noto‘g‘ri formatda javob qaytardi.');
        }

        if (!response.ok) {
            throw new Error(data.error || 'Server bilan bog‘lanishda xatolik.');
        }

        if (!data.reply) {
            throw new Error(data.error || 'AI javobi topilmadi.');
        }

        typing.remove();

        addMessage(data.reply, 'assistant');

        conversationHistory.push({
            role: 'assistant',
            content: data.reply,
        });
    } catch (error) {
        typing.remove();

        addMessage('Xatolik: ' + error.message, 'assistant');

        console.error('AI xatosi:', error);
    } finally {
        isLoading = false;
        sendButton.disabled = false;
        chatInput.focus();
    }
}

// Xabar yuborish
chatForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const message = chatInput.value.trim();

    if (message) {
        sendMessage(message);
    }
});

// Enter orqali yuborish
chatInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        chatForm.requestSubmit();
    }
});

// Salomlashish
addMessage(
    'Assalomu alaykum! Men Abdulboriy AI yordamchisiman. 😊 Siz bilan suhbatlashishga tayyorman. Qanday yordam bera olaman?',
    'assistant'
);

// Yangi suhbat
document.querySelector('#new-chat').addEventListener('click', () => {
    conversationHistory = [];
    chatMessages.innerHTML = '';
    document.querySelector('#welcome-screen').style.display = 'block';

    addMessage('Assalomu alaykum! Yangi suhbatni boshlaymiz. Sizga qanday yordam bera olaman?', 'assistant');
});

// Tayyor savollar
document.querySelectorAll('.suggestion').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelector('#welcome-screen').style.display = 'none';
        sendMessage(button.dataset.message);
    });
});

// Birinchi xabardan keyin welcome oynasini yashirish
const originalSendMessage = sendMessage;

sendMessage = async function (message) {
    document.querySelector('#welcome-screen').style.display = 'none';
    return originalSendMessage(message);
};

// Mobil menyu
document.querySelector('#mobile-menu').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
});
