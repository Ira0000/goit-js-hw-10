// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

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

let userSelectedDate;
const inputDateField = document.querySelector('input#datetime-picker');
// console.dir(inputDateField);
const startButton = document.querySelector('.data-start-btn');
// console.dir(startButton);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    handleSelectedDate(userSelectedDate);
  },
};
let timer = flatpickr(inputDateField, options);

function handleSelectedDate(userSelectedDate) {
  console.log(`This is : ${userSelectedDate}`);
  // Get current date and time
  let currentDate = new Date();
  console.log(`Current date: ${currentDate}`);
  // Calculate the difference in milliseconds
  const timeDifference = userSelectedDate.getTime() - currentDate.getTime();
  console.log(timeDifference);
  if (timeDifference > 0) {
    inputDateField.classList.remove('input-disabled');
    updateTimer(timeDifference);
  } else {
    window.alert('Please choose a date in the future');
    startButton.disabled = true;
    inputDateField.classList.add('input-disabled');
    return; // Exit the function if the date is older
  }
}

function updateTimer(timeDifference) {
  console.log('update Timer');
  console.log(timeDifference);
  const timerDaysField = document.querySelector('.value[data-days]');
  console.dir(timerDaysField);
  const timerHoursField = document.querySelector('.value[data-hours]');
  const timerMinutesField = document.querySelector('.value[data-minutes]');
  const timerSecondsField = document.querySelector('.value[data-seconds]');

  let timerObject = convertMs(timeDifference);
  console.log(timerObject);

  function addLeadingZero(value) {
    return value.padStart(2, '0');
  }

  timerDaysField.textContent = addLeadingZero(`${timerObject.days}`);
  timerHoursField.textContent = addLeadingZero(`${timerObject.hours}`);
  timerMinutesField.textContent = addLeadingZero(`${timerObject.minutes}`);
  timerSecondsField.textContent = addLeadingZero(`${timerObject.seconds}`);

  // Call this function again after 1 second to update the time
  setTimeout(updateTimer, 1000);
}

startButton.addEventListener('click', handleStart);

function handleStart() {
  if (userSelectedDate && userSelectedDate.getTime() > new Date().getTime()) {
    setTimeout(updateTimer, 1000);
  } else {
    console.warn('No valid selected date available for timer update');
  }
}
