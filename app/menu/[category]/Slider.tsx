"use client";

import "swiper/css";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { colorPalette } from "@/assets/constants";
import { useMenuItems } from "@/hooks/useSections";
import { SectionType } from "@/types/section";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import CategoryItemRenderer from "./Categories/_components/CategoryItemRenderer";
import useMenuStore from "./store";

const Slider = () => {
  // const prm = params;
  const category = useMenuStore((state) => state.currentCategory);
  const { data, error, isLoading } = useMenuItems();
  console.log("slider data", data);

  let foodItems: SectionType[] = [];
  switch (category) {
    case "breakfast":
      foodItems = data?.filter((section) => section.category === "breakfast")!;
      break;
    case "food":
      foodItems = data?.filter((section) => section.category === "food")!;
      break;
    case "cold":
      foodItems = data?.filter((section) => section.category === "cold")!;
      break;
    case "hot":
      foodItems = data?.filter((section) => section.category === "hot")!;
      break;
    default:
      foodItems = data!;
  }
  const items = foodItems;

  const slides = items.length > 2 ? 3 : items.length;

  return (
    <Swiper
      dir="rtl"
      modules={[FreeMode, Navigation]}
      style={{ height: "140px" }}
      slidesPerView={slides}
      simulateTouch={true}
      shortSwipes={true}
      centeredSlides={true}
      spaceBetween={80}
      pagination={{
        clickable: true,
        hideOnClick: true,
        type: "custom",
      }}
      keyboard={{
        enabled: true,
      }}
      className="mySwiper"
      allowTouchMove={true}
      initialSlide={0}
      effect="coverflow"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        scale: 1,
        modifier: 1,
        slideShadows: false,
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={item.title}>
          {({ isActive }) => {
            return isActive ? (
              <CategoryItemRenderer
                img={item.icon}
                index={index}
                title={item.title}
                color={colorPalette.nav}
                height="130px"
                width="130px"
                linkToSrc={`${item.id}`}
              />
            ) : (
              <CategoryItemRenderer
                height="120px"
                width="120px"
                linkToSrc={`${item.id}`}
                img={item.icon}
                index={index}
                title={item.title}
              />
            );
          }}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
