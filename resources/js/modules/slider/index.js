import { svg } from '../../utils/svg';

const OPTIONS = {
    infinite: true,
    slidesToShow: 1,
    speed: 300,
    dots: true,
    arrows: true,
    adaptiveHeight: true,
};

const OPTIONSRESP = {
    infinite: true,
    slidesToShow: 1,
    speed: 300,
    dots: true,
    arrows: false,
    adaptiveHeight: true,
    responsive: [{
      breakpoint: 768,
    }]
};

const OPTIONSCATALOG = {
    infinite: true,
    slidesToShow: 1,
    speed: 300,
    dots: true,
    arrows: false,
    rows: 2,
    slidesPerRow: 2,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          rows: 2,
          slidesPerRow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          rows: 1,
          slidesPerRow: 1
        }
      }
    ]
};

let advantagesSlider = {
  target: $('.slider-advantages-js'),
  options: OPTIONSRESP,
  active: false,
};

let testimonialsSlider = {
  target: $('.slider-testimonials-js'),
  options: OPTIONS,
  active: false
};

let featuredSlider = {
  target: $('.slider-featured-js'),
  options: OPTIONS,
  active: false,
};

let workWithSlider = {
  target: $('.slider-workwith-js'),
  options: OPTIONSRESP,
  active: false
};

let catalogSlider = {
  target: $('.slider-catalog-js'),
  options: OPTIONSCATALOG,
  active: false
};

let productsSlider = {
  target: $('.slider-product-js'),
  options: OPTIONSCATALOG,
  active: false
};

let SLIDERS = [
  advantagesSlider,
  testimonialsSlider,
  featuredSlider,
  workWithSlider,
  catalogSlider,
  productsSlider
];

let SLIDERSRESPONSIVE = [];

$(SLIDERS).each((_, slider) => {
  let responsive = slider.options.responsive || null;

  if (responsive) {
    SLIDERSRESPONSIVE.push(slider);
    if (+responsive[0].breakpoint > $(window).width()) handeSlider(slider);
  } 
  else handeSlider(slider); 
});

var debounce = require('debounce');
window.onresize = debounce(resize, 50);

// slider nav append custom icons
$('.slick-next').html(svg({"name": "slider-next"}));
$('.slick-prev').html(svg({"name": "slider-prev"}));

function resize(e) {
  $(SLIDERSRESPONSIVE).each((_, slider) => {
    if (slider.active && ($(window).width() >= slider.options.responsive[0].breakpoint)) sliderDestroy(slider);
    else if (!slider.active) {
      if ($(window).width() < slider.options.responsive[0].breakpoint)
      handeSlider(slider);
      if (slider.options.responsive[1] && $(window).width() < slider.options.responsive[1].breakpoint)
      handeSlider(slider);
    }
  });
}

function handeSlider(slider) {
  slider.target.slick(slider.options);
  slider.active = true;
}

function sliderDestroy(slider) {
    slider.target.slick('unslick');
    slider.active = false;
}