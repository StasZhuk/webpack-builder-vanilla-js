export default (params) => {

  let {anchor, offset = 0, offsetTarget, speed = 300, func} = params;

  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  const $windowTarget = $(currentHash);

  const getOffset = (target) => {
    if ($.isNumeric(parseInt(target))) {
      return parseInt(target);
    }

    let result;

    if ($(offsetTarget).length === 0) {
      result = $(target).offset().top - offset;
    } else {
      result = $(target).offset().top - $(offsetTarget).outerHeight() - offset;
    }

    return result;
  };

  const animate = (target) => $('html, body').animate({
    scrollTop: getOffset(target)
  }, speed, function () {
    if (func !== undefined) {
      func();
    }
  });

  if($windowTarget.length !==0) {
    animate($windowTarget);
  }

  $(anchor).on('click', function () {
    const $this = $(this);

    let target = $this.is('a') ? $this.attr('href') : $this.attr('data-target');
    let targetPath = $this.attr('data-page');

    if(targetPath !== undefined && currentPath !== targetPath) {
      window.location = window.location.origin + targetPath + target;
    }

    if ($(target).length === 0 && !$.isNumeric(parseInt(target))) {
      return false
    }

    animate(target);

  });
}