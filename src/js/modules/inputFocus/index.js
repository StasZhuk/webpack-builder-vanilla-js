let fields = $('.js-placeholder-animate');

fields.on('blur', function() {
    let $that = $(this);

    $that.parent().removeClass('active');
    
    if ($that.val() !== '') $that.siblings().addClass('hide');
    else $that.siblings().removeClass('hide');
});

fields.on('focus', function() {
    $(this).parent().addClass('active');
});
