import React from "react";
import Image from "next/image";

function Slider({ sliderList }) {
  return (
    <div className="carousel">
      {sliderList.map((slider) => (
        <div key={slider.id}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${slider.image}`}
            width={1000}
            height={400}
            alt="slider"
            className="w-full h-[400px] object-cover rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
}

export default Slider;
