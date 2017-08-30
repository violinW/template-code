import RequestResultHandler from 'Modules/requestResultHandler';

module.exports = {
  saveAsDraft(data, callback){
    RequestResultHandler('/draft/addDraft', 'POST', data, function (result, status, xhr) {
      debugger

      callback()
    }, function (xhr, status, error) {
      debugger
    })
  }
}