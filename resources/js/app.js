// if(module.hot) {
//   module.hot.accept('./common/navbar', function () {
//     require('./common/navbar');
//   });
// }
window.$ = window.jQuery = require('jquery');
window.slick = require('slick-carousel');

import { svg } from './utils/svg';
require('./modules/browserDetect');
// require('./components/modal');
// require('./bootstrap/transition');
// require('./bootstrap/collapse');
// require('./bootstrap/dropdown');
// require('./bootstrap/tab');

const imagesContext = require.context('images', true, /\.(png|jpg|jpeg|gif|ico|svg|webp)$/);
imagesContext.keys().forEach(imagesContext);


import '../sass/main.scss';

if(NODE_ENV === 'development') {
  require('../views/pages/index.twig');
}

(function ($) {
  $(document).ready(function () {
  });
$(window).on('load', function () {
  // toggle view
  // require('./modules/view-toggle');

  // slider index
  // let sliderTestimonials = $('.slider-testimonials-js');
  // let sliderFeatured = $('.slider-featured-js');

  // sliderTestimonials.slick({
  //   infinite: true,
  //   slidesToShow: 1,
  //   speed: 300,
  //   // adaptiveHeight: true,
  // });

  // sliderFeatured.slick({
  //   infinite: true,
  //   slidesToShow: 1,
  //   speed: 300,
  //   dots: true
  //   // adaptiveHeight: true,
  // });

  // // slider nav append custom icons
  // $('.slick-next').html(svg({"name": "slider-next"}));
  // $('.slick-prev').html(svg({"name": "slider-prev"}));
});
})(jQuery);
