(function ($) {
    const $window = $(window);

    const settings = {
        ghost: false,
        smartHide: false,
        breakpoint: null,
        media: 0,
        helperClass: null
    };

    const methods = {

        setHeight: (selector) => selector.parent().css('height', selector.outerHeight()),

        init: function (param) {
            const options = $.extend({}, settings, param);

            return this.each(function () {
                let $this = $(this),
                    data = $(this).data('fixed');

                if (!data) {

                    $(this).data('fixed', {
                        target: $this
                    });

                    if (options.ghost === true) {

                        let helper = options.helperClass === null ? '' : options.helperClass;

                        $this.wrap("<div class=" + helper  +  "></div>");

                        methods.setHeight($this);

                        $window.on('resize.fixed', () => {
                            methods.setHeight($this);
                        });
                    }


                    if(options.breakpoint === null && $window.outerWidth(true) >= options.media) {
                        $this.addClass('fixed');
                    } else if ($.isNumeric(options.breakpoint) && $window.outerWidth(true) >= options.media) {
                        let startPosition = $(this).position().top;

                        $(window).on('scroll.fixed', function () {
                            let st = $(window).scrollTop();
                            if(st >= options.breakpoint && st >= startPosition) {
                                $this.addClass('fixed');
                            } else {
                                $this.removeClass('fixed');
                            }
                        })
                    }


                    if (options.smartHide === true) {
                        let lastScrollTop = 0,
                            lastPosition = $(this).position().top;
                        $window.on('scroll.fixed', function () {
                            let st = $(window).scrollTop();

                            if (options.breakpoint !== null && $(options.breakpoint.coordinates).length > 0) {

                                if (st > options.breakpoint.coordinates.position().top) {
                                    $this.addClass(options.breakpoint.class);
                                } else {
                                    $this.removeClass(options.breakpoint.class);
                                }
                            }

                            if (st > lastScrollTop) {
                                $this.css('top', -$this.outerHeight(true));
                            } else {
                                $this.css('top', lastPosition);
                            }

                            lastScrollTop = st;

                        });

                    }
                }

            });

        }
    };

    $.fn.fixed = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.fixed');
        }

    };


})(jQuery);