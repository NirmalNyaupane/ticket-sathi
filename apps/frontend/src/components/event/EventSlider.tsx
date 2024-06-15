"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "./swiper.css";
import Image from "next/image";

const EventSlider = ({ imageUrls }: { imageUrls: string[] }) => {
  console.log(imageUrls)
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {imageUrls.map((image) => {
        return (
          <SwiperSlide key={image}>
            {" "}
            <div className="h-full w-[90%]">
              <Image
                src={image}
                width={500}
                height={500}
                alt="slider"
                className="w-full h-[80vh] object-cover rounded-2xl"
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default EventSlider;
