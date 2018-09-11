import throttle from 'lodash/throttle.js';
//Init $(window).scrollWay();
//data-scrollWay-wr="who"
//data-scrollWay-target="who, background-position-y, 0, 100, %, linear, 500"

(function ($) {
    const settings = {
        wr: '[data-scrollWay-wr]',
        target: '[data-scrollWay-target]'
    };

    const methods = {
        init: function (param) {
            const options = $.extend({}, settings, param);

            return this.each(function () {
                let $this = $(this),
                    data = $(this).data('scrollWay');

                if (!data) {
                    //init

                    $(this).data('scrollWay', {
                        target: $this
                    });

                    let $window = $(window),
                        view = options.view === undefined ? 1.5 : options.view,
                        windowCenter = $window.height() / view;


                    function getSegment(arg) {
                        let wr = $('[data-scrollWay-wr =' + arg + ']')[0],
                            wrOffset = $(wr).offset().top,
                            wrHeight = $(wr).outerHeight(true);
                        return {startOffset: wrOffset, endOffset: wrOffset + wrHeight, height: wrHeight};
                    }

                    let arr = [];
                    let selectors = $(options.wr).find(options.target);

                    let isTransform = function (arg) {
                        return arg.slice(0, 9) === 'transform'
                    };

                    let setStart = (target, animationName, start, units ) => {
                        if (isTransform(animationName) === true) {
                            $(target).css({
                                transform: animationName.slice(10, animationName.length) + '(' + start + units + ')'
                            });
                        } else {
                            $(target).css({
                                [animationName]: start + units
                            })
                        }
                    };

                    $(selectors).map(function (index, item) {
                        let attrs = $(item).attr('data-scrollWay-target').split(', ');

                        let animationName = attrs[1],
                            timingFunc = attrs[5] === undefined ? 'linear' : attrs[5],
                            animationDuration = attrs[6] === undefined ? '1000ms' : attrs[6] + 'ms',
                            start = parseInt(attrs[2]),
                            units = attrs[4];

                        arr.push({
                            target: $(item),
                            container: attrs[0],
                            animation: animationName,
                            start: start,
                            path: parseInt(attrs[3]),
                            units: units,
                            timingFunc: timingFunc, //optional
                            duration: animationDuration, //optional
                            segment: getSegment(attrs[0])
                        });

                        if(isTransform(attrs[1]) === true) {
                            $(item).css({transition: 'transform ' + timingFunc + ' ' + animationDuration});
                        } else {
                            $(item).css({transition: animationName + ' ' + timingFunc + ' ' + animationDuration,});
                        }

                        setStart(item, animationName, start, units)
                    });


                    $window.on('scroll.scrollWay', throttle(function () {
                        let $st = $window.scrollTop(),
                            $stCenter = $st + windowCenter,
                            $percent = 0;

                        $(arr).each(function (index, item) {
                            let segment = item.segment,
                                animationName = item.animation;

                            if ($stCenter >= segment.startOffset && $stCenter <= segment.endOffset) {
                                $percent = Math.floor(($stCenter - segment.startOffset) / segment.height * 100);

                                if (isTransform(animationName) === true) {
                                    $(this.target).css({
                                        transform: animationName.slice(10, animationName.length) + '(' + item.start + (item.path/100 *  $percent) + item.units + ')'
                                    });
                                } else {
                                    $(this.target).css({
                                        [animationName]: item.start + (item.path/100 *  $percent) + item.units
                                    });
                                }
                            } else if ($stCenter < segment.startOffset) {
                                setStart(item.target, animationName, item.start, item.units);
                            } else if ($stCenter > segment.endOffset) {
                                if (isTransform(animationName) === true) {
                                    $(this.target).css({
                                        transform: animationName.slice(10, animationName.length) + '(' + (item.start + item.path) + item.units + ')'
                                    });
                                } else {
                                    $(this.target).css({
                                        [animationName]: (item.start + item.path) + item.units
                                    })
                                }
                            }
                        });
                    }, 200));
                }

            });

        }
    };

    $.fn.scrollWay = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.scrollWay');
        }

    };


})(jQuery);