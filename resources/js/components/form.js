import 'jquery-validation';
import 'inputmask/dist/jquery.inputmask.bundle';
import 'jquery-form';

$.validator.addMethod('customphone', function (value, element) {
  let val = value.replace(/\D+/g, '');

  if(val.length !== 11) {
    return false;
  }

  return this.optional(element) || /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(val);
}, "Please enter a valid phone number");

$.validator.addMethod("alphabetic", function(value, element) {
  return this.optional(element) || /^[А-ЯЁа-яё ]*$/.test(value);
}, "Letters, numbers, and underscores only please");