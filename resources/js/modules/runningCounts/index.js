import throttle from 'lodash/throttle'

(function ($) {
    const settings = {
        wrapper: '[count-wrapper]',
        target: '[count-target]',
        duration: 3000,
        easing: 'swing'
    };

    const methods= {
        init: function (params) {
            const options = $.extend({}, settings, params);

            
            return $(options.wrapper).each(function () {
                let $this = $(this),
                    data = $this.data('runningCounts');

                if(!data) {
                    //init

                    const runCounts = () => {
                        if($(window).scrollTop() >= $this.offset().top - $(window).outerHeight() / 1.25) {
                            $this.find(options.target).each(function () {
                                $(this).prop('Counter',0).animate({
                                    Counter: $(this).attr('data-count')
                                }, {
                                    duration: options.duration,
                                    easing: options.easing,
                                    step: function (now) {
                                        $(this).text(Math.ceil(now));
                                    }
                                });

                                $(this).removeAttr('count-target');
                            });

                        }
                    };

                    $(window).on('scroll', throttle(runCounts, 500));

                    $(this).data('runningCounts', {
                        target: $this
                    });
                }
            });
        }
    };

    $.fn.runningCounts = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.runningCounts');
        }

    };
})(jQuery);