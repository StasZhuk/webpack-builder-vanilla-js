(function ($) {
    const settings = {
        wrapper: '[data-sameHeight = "wr"]',
        elements: '[data-sameHeight = "target"]',
        breakpoint: 'data-sameHeight-breakpoint'
    };

    const methods = {

        reset: function () {
            return this.each(function () {

                let $this = $(this),
                    data = $this.data('sameHeight');

                $(data.options.wrapper).each(function () {
                    $(this).find($(data.options.elements)).each(function () {
                        $(this).css('height', 'auto');
                    })
                })
            });
        },

        setHeight: function () {
            return this.each(function () {
                let $this = $(this),
                    data = $this.data('sameHeight');

                $(data.options.wrapper).each(function () {

                    let breakpoint = $(this).attr(data.options.breakpoint);

                    if(breakpoint !== undefined && $(window).outerWidth(true) < parseInt(breakpoint)) {
                        return;
                    }

                    let array = [];
                    let $elements = $(this).find($(data.options.elements));

                    $elements.each(function () {
                        array.push($(this).outerHeight(true));
                    }).css('height', Math.max.apply(null, array));

                });

            });
        },

        init: function (param) {
            const options = $.extend({}, settings, param);

            return this.each(function () {

                let $this = $(this),
                    data = $this.data('sameHeight');


                if (!data) {
                    //init

                    //
                    $(this).data('sameHeight', {
                        target: $this,
                        options: options
                    });

                    $this.sameHeight('setHeight');

                    var resizeEvt;
                    $(window).bind('resize.sameHeight', function () {
                        clearTimeout(resizeEvt);
                        resizeEvt = setTimeout((function () {
                            $this.sameHeight('reset');
                            $this.sameHeight('setHeight');
                        }), 500);
                    });
                }

            });

        }
    };

    $.fn.sameHeight = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.sameHeight');
        }

    };


})(jQuery);