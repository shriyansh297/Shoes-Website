// set year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// simple button click
document.getElementById('changeTextBtn').addEventListener('click', () => {
  alert('Hello guys apne button daba diya h acha kiya.');
});

// fake "send" for the form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const result = document.getElementById('formResult');
  result.textContent = 'Sending...';
  // simulate "sending"
  setTimeout(() => {
    result.textContent = 'Thanks! Your message was received.';
    e.target.reset();
  }, 800);
});