function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyElement = document.querySelector('body');

let colorId = null;

startBtn.addEventListener('click', () => {
  colorId = setInterval(() => {
    bodyElement.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  clearInterval(colorId);
  colorId = null;

  startBtn.disabled = false;
});
