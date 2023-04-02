import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
console.log(formEl);
const loginInputEL = formEl.querySelector('input[type="email"]');
console.log(loginInputEL);
const messageLabelEL = formEl.querySelector('textarea[name="message"]');
console.log(messageLabelEL);
const buttonEl = formEl.querySelector('button[type="submit"]');
console.log(buttonEl);

const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onInput, 500));

fillFormFields();

// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
function onFormSubmit(event) {
  event.preventDefault();
  const { email, message } = event.currentTarget.elements;
  if (!email.value || !message.value) {
    alert('Please fill in all the fields!');
    return;
  }
  event.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  localStorage.removeItem(STORAGE_KEY);
}

// Відстежуй на формі подію input,
// і щоразу записуй у локальне сховище об'єкт з полями email і message,
// у яких зберігай поточні значення полів форми.
// Нехай ключем для сховища буде рядок "feedback-form-state".
function onInput() {
  const data = {
    email: loginInputEL.value,
    message: messageLabelEL.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Під час завантаження сторінки перевіряй стан сховища,
// і якщо там є збережені дані, заповнюй ними поля форми.
// В іншому випадку поля повинні бути порожніми.
function fillFormFields() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    loginInputEL.value = savedMessage.email;
    messageLabelEL.value = savedMessage.message;
  }
}
