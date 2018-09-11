      
// Define data for the popup
var data = [
    {
      id: 1,
      product_img: '/assets/images/product/1.jpg' 
    },
    {
      id: 2,
      product_img: '/assets/images/product/2.jpg' 
    },
    {
      id: 3,
      product_img: '/assets/images/product/3.jpg' 
    },
    {
      id: 4,
      product_img: '/assets/images/product/4.jpg' 
    },
    {
      id: 5,
      product_img: '/assets/images/product/5.jpg' 
    }
  ];
  
let popup;

$('[data-nav="slide"]').on('click', function(e) {
  e.preventDefault();

  let $that = $(this);

  if($that.hasClass('active')) return false;
  else {
    $('[data-nav="slide"]').removeClass('active');
    $that.addClass('active');
  }

  let activeImg;
  let $gallery = $('[data-gallery="magnific"]');
  let thatId= $that.attr('data-target-id');

  $(data).each(function(i, el) {
    if (el.id == thatId) {
      activeImg = data.splice(i, 1);      
      data.unshift(activeImg[0]);
      $gallery.attr('src', data[0]['product_img']);
      
      return false; 
    }
  });

});


$('[data-gallery="magnific"]').on('click', function() { 
    popup = $('[data-gallery="magnific"]').magnificPopup({ 
    key: 'my-popup', 
    items: data,
    type: 'inline',
    inline: {
      // Define markup. Class names should match key names.
      markup: '<div class="white-popup"><div class="mfp-close"></div>'+
                '<a class="mfp-userWebsite">'+
                  '<div class="mfp-product"></div>'+
                  '<h2 class="mfp-username"></h2>'+
                '</a>'+
              '</div>'
    },
    gallery: {
      enabled: true 
    }
  });

  setTimeout(function() {
    popup.magnificPopup('open');
  }, 300)
});