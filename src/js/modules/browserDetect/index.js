const bowser = require('bowser');
const $body = $('body');

$body.addClass([bowser.osname, bowser.name, bowser.mobile || bowser.tablet ? 'mobile' : null]);