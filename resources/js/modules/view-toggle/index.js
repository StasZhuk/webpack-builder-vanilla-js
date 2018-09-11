let $viewToggle = $('.view-toggle');
let targetToggleItemClass = $viewToggle.attr('data-toggle-item');

let $targetToggleList = $('.' + $viewToggle.attr('data-toggle-list'));
let $targetToggleItems = $targetToggleList.find('.' + $viewToggle.attr('data-toggle-item'));

$viewToggle.on('click', (e) => {
    let $target = $(e.target);
    let targetAttr = 'data-toggle';
    let targetDataToggle = $target.attr(targetAttr);

    if (!$target.hasClass('active') && targetDataToggle) {
        $target.addClass('active');

        let $switchTarget = $target.parent().siblings().children();
        let switchTargetDataToggle = $switchTarget.attr(targetAttr);

        $switchTarget.removeClass('active');

       

        $targetToggleList.addClass('_' + targetDataToggle);
        $targetToggleList.removeClass('_' + switchTargetDataToggle);
        $targetToggleItems.addClass('_' + targetDataToggle);
        $targetToggleItems.removeClass('_' + switchTargetDataToggle);
    }
})