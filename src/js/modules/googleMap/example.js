// import {initMap, addMarker} from "../modules/googleMap";
//
// const initContactsMap = (center) => {
//   if($('#contactsMap').length !== 0) {
//
//     let map = initMap({
//       center: center,
//       target: 'contactsMap',
//       zoom: 15
//     });
//
//     // let resizeEvt
//     // $(window).bind('resize.gmap', function () {
//     //   clearTimeout(resizeEvt);
//     //   resizeEvt = setTimeout((function () {
//     //     google.maps.event.trigger(map, 'resize');
//     //     map.setCenter(location);
//     //   }), 500);
//     // });
//
//     return map;
//   }
// };
//
// const getCenter = (selector) => {
//   return {
//     lat: parseFloat(selector.attr('data-lat')),
//     lng: parseFloat(selector.attr('data-long'))
//   }
// };
//
//
// $('.js-contacts-offices').each(function () {
//
//   const $toggles= $(this).find('.js-contacts-toggle');
//
//   const $activeMap = $($toggles.filter('.active')[0]);
//
//   let map;
//
//   if($activeMap !== undefined) {
//     const center = getCenter($activeMap);
//     map = initContactsMap(center);
//   }
//
//
//   $toggles.each(function () {
//     const $this = $(this);
//
//     const center = getCenter($this);
//
//     let marker = addMarker({
//       location: {
//         lat: center.lat,
//         lng: center.lng
//       },
//       target: map,
//       markerSize: new google.maps.Size(51, 61),
//       markerImg: 'assets/images/mark.png'
//     });
//
//   });
//
//   $toggles.on('click', function () {
//
//     const $self = $(this);
//
//     const center = getCenter($self);
//
//     $toggles.removeClass('active');
//     $self.addClass('active');
//
//     let target = $self.attr('href');
//
//     if (target === undefined) {
//       return false;
//     }
//
//     map.panTo(center);
//
//     target = target.substr(1);
//
//     $('.js-contacts-target').each(function () {
//       const $this = $(this);
//
//       if($this.attr('data-contact') === target) {
//         $this.removeClass('hidden');
//       } else {
//         $this.addClass('hidden');
//       }
//     });
//   });
//
//
// });
