import RequestResultHandler from 'Modules/requestResultHandler';
import cookieMethods from 'Modules/cookie.js';

module.exports = {
  login(username, password, callback){
    RequestResultHandler('/user/login', 'POST', {
      username,
      password
    }, function (result, status, xhr) {
      cookieMethods.setCookie('token', result.token);
      callback();
    })
  }
}
