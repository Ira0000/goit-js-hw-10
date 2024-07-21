//add libraries
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import pathSprite from '../img/icons.svg';

let userSelectedDate;
let dateDiff;

const inputDateField = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('.data-start-btn');
buttonDisabled();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    let currentDate = new Date();

    if (userSelectedDate.getTime() - currentDate.getTime() > 0) {
      buttonEnabled();
    } else {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        iconColor: '#fff',
        icon: '',
        iconUrl: '../img/bi_x-octagon.png',
        progressBarColor: '#B51B1B',
        // iconUrl: '${pathSprite}#icon-close-octagon',
      });
      buttonDisabled();
    }
  },
};

let timer = flatpickr(inputDateField, options);

function buttonDisabled() {
  startButton.disabled = true;
  inputDateField.classList.add('input-disabled');
  return;
}

function buttonEnabled() {
  inputDateField.classList.remove('input-disabled');
  startButton.disabled = false;
}

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
  return value.toString().padStart(2, '0');
}

function updateTimer(days, hours, minutes, seconds) {
  const timerDaysField = document.querySelector('.value[data-days]');
  const timerHoursField = document.querySelector('.value[data-hours]');
  const timerMinutesField = document.querySelector('.value[data-minutes]');
  const timerSecondsField = document.querySelector('.value[data-seconds]');

  timerDaysField.textContent = addLeadingZero(days);
  timerHoursField.textContent = addLeadingZero(hours);
  timerMinutesField.textContent = addLeadingZero(minutes);
  timerSecondsField.textContent = addLeadingZero(seconds);
}

function startTimer() {
  buttonDisabled();
  inputDateField.disabled = true;

  let intervalTimer = setInterval(() => {
    const now = new Date();

    dateDiff = userSelectedDate.getTime() - now.getTime();

    if (dateDiff <= 0) {
      clearInterval(intervalTimer);
      console.log('Time is up');
      inputDateField.disabled = false;
      iziToast.success({
        title: 'OK',
        titleColor: '#fff',
        message: 'Time is up!',
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        iconColor: '#fff',
        icon: '',
        iconUrl: '../img/bi_check2-circle.png',
        progressBarColor: '#326101',
      });
    } else {
      const { days, hours, minutes, seconds } = convertMs(dateDiff);
      console.log({ days, hours, minutes, seconds });
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);
  //   if (!inputDateField.disabled) {

  //   }
}

startButton.addEventListener('click', startTimer);
