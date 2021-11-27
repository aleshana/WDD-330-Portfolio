import { makeRequest } from './authHelpers.js';
import Auth from './auth.js';

const auth = new Auth();

const button = document.querySelector("#button");
button.addEventListener("click", auth.login);

makeRequest('login', 'POST', {
  password: 'user1',
  email: 'user1@email.com', 
})
  ;