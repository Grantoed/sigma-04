import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

Swiper.use([Navigation]);

const swiper = new Swiper('.swiper', {
  slidesPerView: 2,
  spaceBetween: 90,
  // Optional parameters
  //   direction: 'vertical',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.testimonials__button_right',
    prevEl: '.testimonials__button_left',
  },
});
