"use strict";
const div = document.getElementById('contactForm');
div?.addEventListener('submit', () => {
    const nameInput = document.getElementById('singleLineInput');
    const messageInput = document.getElementById('message');
    if (nameInput && messageInput) {
        messageInput.value = nameInput.value + ': ' + messageInput.value;
    }
});
