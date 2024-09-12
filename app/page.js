import Slider from "@/components/Slider";
import GlobalApi from "@/utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  return (
    <div>
      <Slider sliderList={sliderList} />
    </div>
  );
}
