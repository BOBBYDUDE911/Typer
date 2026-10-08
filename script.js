const container = document.querySelector('.text-container');
const keyboardInput = document.querySelector('#keyboardInput');

// 📱 Open phone keyboard
document.addEventListener('click', () => {
  keyboardInput.focus();
});


// ✏️ Add ONE character
function addCharacter(char) {
  const span = document.createElement('span');

  if (char === ' ') {
    span.innerHTML = '&nbsp;';
  } else {
    span.textContent = char;
  }

  container.appendChild(span);

  checkCommands();
}


// 🔥 Check commands
function checkCommands() {
  const text = container.textContent;

  if (!text.endsWith('/67')) return;

  // Remove /67
  for (let i = 0; i < 3; i++) {
    if (container.lastChild) {
      container.removeChild(container.lastChild);
    }
  }

  const art = document.createElement('pre');

  art.textContent = `
 ██████╗    ███████╗
██╔════╝    ╚════██║
██║█████╗       ██╔╝
██║   ██║      ██╔╝
╚██████╔╝      ██║
 ╚═════╝       ╚═╝
`;

  container.appendChild(art);
}


// 📱 PHONE KEYBOARD
keyboardInput.addEventListener('input', () => {
  const value = keyboardInput.value;

  for (const char of value) {
    addCharacter(char);
  }

  keyboardInput.value = '';
});


// ⌨️ PHYSICAL KEYBOARD
document.addEventListener('keydown', (e) => {

  // Don't let the hidden input handle physical keyboard events
  if (document.activeElement === keyboardInput) {
    keyboardInput.blur();
  }

  if (e.key === 'Backspace') {
    e.preventDefault();

    if (container.lastChild) {
      container.removeChild(container.lastChild);
    }

    return;
  }

  if (e.key === 'Delete') {
    e.preventDefault();
    container.innerHTML = '';
    return;
  }

  if (e.key === 'Enter') {
    e.preventDefault();
    container.appendChild(document.createElement('br'));
    return;
  }

  const ignoredKeys = [
    'CapsLock',
    'Shift',
    'Control',
    'Alt',
    'Meta',
    'Tab',
    'Escape',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Insert',
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'ScrollLock',
    'Pause',
    'NumLock',
    'ContextMenu',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12'
  ];

  if (ignoredKeys.includes(e.key)) {
    e.preventDefault();
    return;
  }

  // Only add actual single characters
  if (e.key.length === 1) {
    e.preventDefault();
    addCharacter(e.key);
  }
});