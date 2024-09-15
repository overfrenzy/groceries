import CategoryList from "@/app/_components/CategoryList";
import Footer from "@/app/_components/Footer";
import ProductList from "@/app/_components/ProductList";
import Slider from "@/app/_components/Slider";
import GlobalApi from "@/utils/GlobalApi";
import Image from "next/image";

export default async function Home() {
  const [sliderList, categoryList, productList] = await Promise.all([
    GlobalApi.getSliders(),
    GlobalApi.getCategories(),
    GlobalApi.getProducts(),
  ]);

  return (
    <div className="p-10 px-16">
      {/* Slider */}
      <Slider sliderList={sliderList} />

      {/* Category List */}
      <CategoryList categoryList={categoryList} />

      {/* Product List */}
      <ProductList productList={productList} categoryList={categoryList} />

      {/* Banner */}
      <Image
        src="/banner.webp"
        width={1000}
        height={300}
        alt="banner"
        className="w-full h-[400px] object-contain"
      />
      <Footer />
    </div>
  );
}
