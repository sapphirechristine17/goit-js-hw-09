import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetimePickerEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

// disable button by default
startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Date Selection
    const selectedDate = selectedDates[0];
    const dateNow = Date.now();

    if (selectedDate < dateNow) {
      Notify.failure('Please choose a date in the future');
      startBtnEl.disabled = true;
      return;
    }

    // if the date is in the future -> enable the button
    startBtnEl.disabled = false;

    // Begin Countdown
    let timerID = null;

    // Countdown Handler
    function handleCountdown() {
      startBtnEl.disabled = true;
      datetimePickerEl.disabled = true;

      //   run every 1000 ms (1 second)
      timerID = setInterval(() => {
        const currentTime = Date.now();

        // when countdown ends -> clear timer
        if (selectedDate < currentTime) {
          clearInterval(timerID);
          datetimePickerEl.disabled = false;
          return;
        }

        const timeDifference = selectedDate - currentTime;

        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        daysEl.textContent = addLeadingZero(days);
        hoursEl.textContent = addLeadingZero(hours);
        minutesEl.textContent = addLeadingZero(minutes);
        secondsEl.textContent = addLeadingZero(seconds);
      }, 1000);
    }
    startBtnEl.addEventListener('click', handleCountdown);
  },
};

// Create flatpickr
flatpickr('#datetime-picker', options);

// -----------------------------------------------------------------
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
