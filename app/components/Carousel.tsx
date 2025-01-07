"use client";

import { useMainItems } from "@/hooks/useMainItems";
import { useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselItemRenderer from "./common/CarouselItemRenderer";

const styles = {
  swiper: {
    height: "auto",
    marginTop: "20px",
  },
};

const Carousel = () => {
  const { data: slides = [] } = useMainItems();

  const staticData = {
    id: 0,
    title: "منوی کلی",
    isEnable: true,
    src: "http://nirvanacafe.ir/uploads/logo.webp",
    path: "menuitems",
  };

  const allSlides = [staticData, ...slides];

  const [activeIndex, setActiveIndex] = useState(0);

  const itemWidth = useBreakpointValue({
    base: "150px", // For small screens
    md: "180px", // For medium screens
    lg: "230px", // For large screens
  });

  const itemHeight = useBreakpointValue({
    base: "150px", // For small screens
    md: "180px", // For medium screens
    lg: "230px", // For large screens
  });

  return (
    <Swiper
      modules={[Autoplay]}
      style={styles.swiper}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      centeredSlides={true}
      spaceBetween={20}
      breakpoints={{
        320: { slidesPerView: 2, spaceBetween: 1 },
        640: { slidesPerView: 3, spaceBetween: 2 },
        768: { slidesPerView: 4, spaceBetween: 2 },
        1024: { slidesPerView: 4, spaceBetween: 2 },
      }}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
    >
      {allSlides.map((slide, index) => (
        <SwiperSlide key={slide.id}>
          <div
            style={{
              transform: activeIndex === index ? "scale(1.1)" : "scale(1)", // Scale the active slide
              transition: "transform 0.3s ease",
            }}
          >
            {slide.isEnable && (
              <CarouselItemRenderer
                src={slide.src}
                index={index}
                title={slide.title}
                height={itemHeight} // Adjust for proper height consistency
                width={itemWidth} // Ensure consistent size
                path={`${slide.title}`}
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
