const imagesContext = require.context('images', true, /\.(png|jpg|jpeg|gif|ico|svg|webp)$/);
imagesContext.keys().forEach(imagesContext);

import '../sass/main.scss';

if(NODE_ENV === 'development') {
  require('../views/pages/index.twig');
}

document.addEventListener('DOMContentLoaded', () => {

})