
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ScrollAnimation from 'react-animate-on-scroll';
import { FreeMode, Thumbs, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

const ProductSlide = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Безпечний доступ до слайдів
  const slides = product?.imageCollection?.items || [];

  // Якщо немає слайдів — не рендеримо
  if (!slides.length) return null;

  const renderSlides = (className) =>
    slides.map((img, id) => (
      <SwiperSlide key={id}>
        <img
          className={className}
          src={img.url}
          alt={img.title || `Фото ${id + 1}`}
        />
      </SwiperSlide>
    ));

  return (
    <ScrollAnimation
      animateIn="fadeInLeft"
      animateOut="fadeOutLeft"
      offset={260}
      className="product__slide"
    >
      {/* Основний слайдер */}
      <Swiper
        spaceBetween={10}
        {...(thumbsSwiper ? { thumbs: { swiper: thumbsSwiper } } : {})}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {renderSlides('product__slide-img')}
      </Swiper>

      {/* Прев'ю слайдер (якщо є >1 фото) */}
      {slides.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={Math.min(slides.length, 4)}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="mySwiper"
        >
          {renderSlides('product__slide-img')}
        </Swiper>
      )}

      {/* Мобільний горизонтальний перегляд */}
      <Swiper
        slidesPerView={1.5}
        spaceBetween={10}
        centeredSlides={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper3"
        breakpoints={{
          320: { slidesPerView: 1.5 },
          375: { slidesPerView: 1.5 },
          555: { slidesPerView: 1.2 },
          650: { slidesPerView: 1.5 },
        }}
      >
        {renderSlides('product__slide-img')}
      </Swiper>
    </ScrollAnimation>
  );
};

export default ProductSlide;
