import 'jquery-modal';
import 'jquery-modal/jquery.modal.css';
import '../form';

let modalOptions = {
  closeClass: 'modal__close',
  closeText: '<span class="modal__close-icon"></span>',
  blockerClass: '_custom',
  fadeDuration: 300,
  modalClass: '_custom'
};

$('.js-modal-toggle').on('click', function () {
  const $this = $(this);
  const $target = $($this.attr('data-target'));

  $target.modal(modalOptions);
});

const options = {
  success: function () {
    $.modal.close();
    $('#modalSuccess').modal(modalOptions);
  },
  error: function () {
  },
  clearForm: true,
  resetForm: true
};

const requestRules = {
  name: {
    required: true,
    minlength: 2,
    'alphabetic': true
  },
  phone: {
    required: true,
    'customphone': true,
  }
};

$('#modalRequest').on($.modal.OPEN, function (e, modal) {
  const $this = $(this);
  const $form = $this.find('.js-request-form');

  $form.each(function () {
    const $this = $(this);

    $this.find('.js-form-phone').inputmask({"mask": "+7 (999) 999-99-99"});

    $this.validate({
      onclick: true,
      onfocus: true,
      rules: requestRules,
      errorPlacement: function (error, element) {
      },
      submitHandler: function (form) {
        $this.ajaxSubmit(options);
        return false;
      }
    });
    $this.submit(function () {
      return false;
    });
  });

  $this.find('.js-form-phone').inputmask({"mask": "+7 (999) 999-99-99"});
});