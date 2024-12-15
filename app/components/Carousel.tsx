"use client";

import React, { useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation"; // For programmatic navigation
import Link from "next/link";

const Carousel = () => {
  const router = useRouter();

  const slides = [
    {
      id: 1,
      title: "نوشیدنی های گرم",
      image: "http://nirvanacafe.ir/uploads/land.webp",
      path: "/menu/hot",
    },
    {
      id: 2,
      title: "صبحانه",
      image: "http://nirvanacafe.ir/uploads/land.webp",
      path: "/menu/breakfast",
    },
    {
      id: 3,
      title: "بار سرد",
      image: "http://nirvanacafe.ir/uploads/land.webp",
      path: "/menu/cold",
    },
    {
      id: 4,
      title: "غذا و پیش غذا",
      image: "http://nirvanacafe.ir/uploads/land.webp",
      path: "/menu/food",
    },
    {
      id: 5,
      title: "تمام آیتم ها",
      image: "http://nirvanacafe.ir/uploads/land.webp",
      path: "/menu/menuitems",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      modules={[Autoplay]}
      style={{ height: "auto", marginTop: "20px" }}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      centeredSlides={true}
      spaceBetween={20}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 40 },
      }}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.id}>
          {/* Slide Link */}
          <Link href={slide.path}>
            <Box
              sx={{
                width: "100%",
                height: ["150px", "180px", "200px", "220px"], // Responsive heights
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.5s ease, opacity 0.5s ease",
                transform: activeIndex === index ? "scale(1.1)" : "scale(0.9)",
                opacity: activeIndex === index ? 1 : 0.6,
                boxShadow: "lg",
                cursor: "pointer",
              }}
            >
              {/* Slide Content */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: "0",
                  width: "100%",
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  textAlign: "center",
                  py: 2,
                }}
              >
                <Text fontSize={["md", "lg", "xl"]} fontWeight="bold">
                  {slide.title}
                </Text>
              </Box>
            </Box>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
