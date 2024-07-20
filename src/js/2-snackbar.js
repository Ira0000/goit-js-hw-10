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
          resolve(`✅ Fulfilled promise in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise in ${delay}ms`);
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
        });
      })
      .catch(error => {
        iziToast.error({
          icon: '',
          message: error,
          position: 'topRight',
        });
      });
  } else {
    iziToast.warning({
      title: 'Caution',
      message: 'You forgot to fill all the fields',
      position: 'topRight',
    });
  }
}
