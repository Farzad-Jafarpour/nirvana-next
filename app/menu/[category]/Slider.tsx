// "use client";

// import "swiper/css";
// import { FreeMode, Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { useMenuItems } from "@/hooks/useMenuItems";
// import { SectionType } from "@/types/section";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import CategoryItemRenderer from "./Categories/_components/CategoryItemRenderer";
// import useMenuStore from "../../stores/menuStore";
// import { useState } from "react";
// import { useSearchParams } from "next/navigation";

// const Slider = () => {
//   const searchParams = useSearchParams(); // Hook to access query parameters
//   const category = searchParams.get("food");
//   const { data, error, isLoading } = useMenuItems();

//   const [activeIndex, setActiveIndex] = useState(0);

//   let foodItems: SectionType[] = [];

//   switch (category) {
//     case "breakfast":
//       foodItems = data?.filter((section) => section.category === "breakfast")!;
//       break;
//     case "food":
//       foodItems = data?.filter((section) => section.category === "food")!;
//       break;
//     case "cold":
//       foodItems = data?.filter((section) => section.category === "cold")!;
//       break;
//     case "hot":
//       foodItems = data?.filter((section) => section.category === "hot")!;
//       break;
//     default:
//       foodItems = data!;
//   }
//   const items = foodItems;

//   console.log("foods", data);
//   return (
//     <Swiper
//       dir="rtl"
//       modules={[FreeMode, Navigation]}
//       style={{ height: "auto", marginTop: "5px" }}
//       spaceBetween={20}
//       breakpoints={{
//         320: { slidesPerView: 3, spaceBetween: 10 },
//         640: { slidesPerView: 3, spaceBetween: 20 },
//         768: { slidesPerView: 4, spaceBetween: 30 },
//         1024: { slidesPerView: 5, spaceBetween: 40 },
//       }}
//       centeredSlides={true}
//       loop={true}
//       autoplay={{
//         delay: 2500,
//         disableOnInteraction: false,
//       }}
//       pagination={{
//         clickable: true,
//         hideOnClick: true,
//         type: "custom",
//       }}
//       keyboard={{
//         enabled: true,
//       }}
//       onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track the active slide
//       className="mySwiper"
//     >
//       {items.map((item, index) => (
//         <SwiperSlide key={item.id}>
//           <div
//             style={{
//               transform: activeIndex === index ? "scale(1.1)" : "scale(1)", // Scale the active slide
//               transition: "transform 0.3s ease",
//             }}
//           >
//             <CategoryItemRenderer
//               img={item.icon}
//               index={index}
//               title={item.title}
//               color="white"
//               height="120px" // Adjust for proper height consistency
//               width="120px" // Ensure consistent size
//               linkToSrc={`${item.id}`}
//             />
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default Slider;


"use client";

import "swiper/css";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMenuItems } from "@/hooks/useMenuItems";
import { SectionType } from "@/types/section";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import CategoryItemRenderer from "./Categories/_components/CategoryItemRenderer";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";

const Slider = () => {
  const searchParams = useSearchParams(); // Access query parameters
  const category = searchParams.get("food");
  const { data = [], error, isLoading } = useMenuItems(); // Ensure `data` has a default value

  const [activeIndex, setActiveIndex] = useState(0);

  // Helper function to filter items based on the category
  const getFilteredItems = (category: string | null, data: SectionType[]) => {
    if (!data || data.length === 0) return [];
    if (!category || category === "منوی کلی") return data; // Return all items for "منوی کلی" or no category
    return data.filter((section) => section.category === category);
  };

  // Get filtered items
  const items = getFilteredItems(category, data);

  if (isLoading) {
    return <Loading/>; // Display loading state
  }

  if (error) {
    return <p>Error loading items.</p>; // Display error state
  }

  return (
    <Swiper
      dir="rtl"
      modules={[FreeMode, Navigation]}
      style={{ height: "auto", marginTop: "5px" }}
      spaceBetween={20}
      breakpoints={{
        320: { slidesPerView: 3, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 20 },
        768: { slidesPerView: 4, spaceBetween: 30 },
        1024: { slidesPerView: 5, spaceBetween: 40 },
      }}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        hideOnClick: true,
        type: "custom",
      }}
      keyboard={{
        enabled: true,
      }}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track the active slide
      className="mySwiper"
    >
      {items.map((item, index) => (
        <SwiperSlide key={item.id}>
          <div
            style={{
              transform: activeIndex === index ? "scale(1.1)" : "scale(1)", // Scale the active slide
              transition: "transform 0.3s ease",
            }}
          >
            <CategoryItemRenderer
              img={item.icon}
              index={index}
              title={item.title}
              color="white"
              height="120px" // Adjust height as needed
              width="120px" // Adjust width as needed
              linkToSrc={`${item.id}`} // Assuming linkToSrc needs the item's ID
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
