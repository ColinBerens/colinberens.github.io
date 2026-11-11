const div =  document.getElementById('contactForm') as HTMLFormElement | null;

div?.addEventListener('submit', () => {
    const nameInput = document.getElementById('singleLineInput')as HTMLInputElement | null;
    const messageInput = document.getElementById('message') as HTMLInputElement | null;

  if (nameInput && messageInput) {
    messageInput.value = nameInput.value + ': ' + messageInput.value;
  }
  });