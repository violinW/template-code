import cookieMethods from './cookie.js';

module.exports = function (url, method, data, successMethod, errorMethod) {
  $.ajax({
    url: 'http://localhost:3004' + url,
    type: method,
    dataType: "json",
    cache: false,
    ContentType: "application/json; charset=utf-8",
    data,
    beforeSend: function (xhr) {
      let token = cookieMethods.getCookie('token');
      token && xhr.setRequestHeader("token", token);
    },
    success: function (result, status, xhr) {
      successMethod && successMethod(result, status, xhr)
    },
    error: function (xhr, status, error) {
      errorMethod && errorMethod(xhr, status, error)
    }
  })
}