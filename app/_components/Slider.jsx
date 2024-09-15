import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Slider({ sliderList }) {
  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((slider) => (
          <CarouselItem key={slider.id}>
            <div className="relative w-full h-[200px] md:h-[400px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${slider.image}`}
                alt="slider"
                fill 
                style={{ objectFit: "contain" }}
                className="rounded-2xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;
