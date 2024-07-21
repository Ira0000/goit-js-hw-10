import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputFormField = document.querySelector('.number-input');
const fieldsetInputFullfilled = document.querySelector(
  'input[name="state"][value="fulfilled"]'
);
const fieldsetInputRejected = document.querySelector(
  'input[name="state"][value="rejected"]'
);
const createButton = document.querySelector('.submit-btn');

createButton.addEventListener('click', handleClick);

function handleClick(event) {
  event.preventDefault();

  let value = inputFormField.value;
  const isSuccess = fieldsetInputFullfilled.checked;
  const isFailed = fieldsetInputRejected.checked;

  if (value > 0 && (isSuccess === true || isFailed === true)) {
    let delay = value;

    // Create promise
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isSuccess) {
          resolve(`Fulfilled promise in ${delay}ms`);
        } else {
          reject(`Rejected promise in ${delay}ms`);
        }
      }, delay);
    });

    // Registering promise callbacks
    promise
      .then(value => {
        iziToast.success({
          icon: '',
          message: value,
          position: 'topRight',
          backgroundColor: '#59A10D',
          messageColor: '#fff',
          iconColor: '#fff',
          icon: '',
          iconUrl: '../img/bi_check2-circle.png',
          progressBarColor: '#326101',
        });
      })
      .catch(error => {
        iziToast.error({
          icon: '',
          message: error,
          position: 'topRight',
          backgroundColor: '#EF4040',
          messageColor: '#fff',
          iconColor: '#fff',
          icon: '',
          iconUrl: '../img/bi_x-octagon.png',
          progressBarColor: '#B51B1B',
        });
      });
  } else {
    iziToast.warning({
      message: 'You forgot to fill all the fields',
      position: 'topRight',
      backgroundColor: '#FFA000',
      messageColor: '#fff',
      iconColor: '#fff',
      icon: '',
      iconUrl: '../img/bi_exclamation-triangle.png',
      progressBarColor: '#BB7B10',
    });
  }
}
