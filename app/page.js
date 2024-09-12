import Slider from "@/components/Slider";
import GlobalApi from "@/utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  return (
    <div className="p-10 px-16">
      <Slider sliderList={sliderList} />
    </div>
  );
}
