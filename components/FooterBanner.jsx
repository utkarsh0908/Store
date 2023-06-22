import Link from "next/link";
import { urlFor } from "../lib/client"

const FooterBanner = ({ footerBanner: {discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image} }) => {
  return (
    <div className="px-[100px] py-[40px] bg-[#f02d34] rounded relative h-[400px] leading-none text-white w-full mt-[120px]">
      <div className="flex justify-between">
        <div className="left">
          <p className="m-[25px]">{discount}</p>
          <h3 className="font-black text-7xl ml-[25px]">{largeText1}</h3>
          <h3 className="font-black text-7xl ml-[25px]">{largeText2}</h3>
          <p className="m-[25px]">{saleTime}</p>
        </div>
        <div className="leading-normal">
          <p className="text-lg">{smallText}</p>
          <h3 className="font-extrabold text-6xl">{midText}</h3>
          <p className="text-lg">{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="type" className="rounded-2xl px-[10px] py-[16px] bg-white text-[#f02d34] border-none mt-[40px] text-lg font-bold cursor-pointer">{buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image)} alt="headphones" className="absolute top-[-25%] left-[25%]"/>
      </div>
    </div>
  );
};

export default FooterBanner;