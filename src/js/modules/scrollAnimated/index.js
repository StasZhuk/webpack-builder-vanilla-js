import throttle from 'lodash/throttle.js';

(function ($) {

    const settings = {
        target: '[data-scrollAnimated = "target"]',
        onStart: null
    };

    const methods = {

        init: function (params) {

            const options = $.extend({}, settings, params);


            let $this = $(this),
                data = $this.data('scrollAnimated');

            if (!data) {

                let $arr = $(options.target).map(function (index, item) {
                    return {
                        target: item,
                        top: $(item).offset().top
                    }
                });

                $(this).data('scrollAnimated', {
                    $this: $this,
                    onStart: options.onStart,
                    wrapper: options.wrapper,
                    target: options.target,
                    items: $arr
                });

                methods.animate(methods.checkPosition($arr));

                $(window).on('scroll.scrollAnimated', throttle(function () {
                    return methods.animate(methods.checkPosition($arr));
                }, 500));
            }
        },

        checkPosition: function ($arr) {
            let $st = $(window).scrollTop();

            $arr = $arr.filter(function (index, item) {
                item.status = $(item.target).hasClass('animated');
                return $st > item.top - $(window).outerHeight() / 1.5;
            });

            return $arr;
        },

        animate: function ($arr) {
            $arr.map(function (index, item) {
                if(!item.status) {
                    let data = $(window).data('scrollAnimated');
                    if(data.onStart !== null) {
                        data.onStart(item);
                    }
                    $(item.target).addClass('animated');
                }
            });
        },

        destroy: function () {
            let $this = $(this);

            $this.unbind('.scrollAnimated');
            $this.removeData('scrollAnimated');
        },
    };

    $.fn.scrollAnimated = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.scrollAnimated');
        }

    };

})(jQuery);