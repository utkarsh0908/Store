import Link from "next/link";
import { urlFor } from "../lib/client"

const FooterBanner = ({ footerBanner: {discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image} }) => {
  return (
    <div className="px-12 py-8 md:px-[100px] md:py-[40px] bg-[#ffAA1D] rounded-lg relative leading-none text-white w-full mt-[120px]">
      <div className="flex justify-between items-center">
        <div className="left hidden md:flex md:flex-col">
          <p className="m-[25px]">{discount}</p>
          <h3 className="font-black text-7xl ml-[25px]">{largeText1}</h3>
          <h3 className="font-black text-7xl ml-[25px]">{largeText2}</h3>
          <p className="m-[25px]">{saleTime}</p>
        </div>
        <div className="leading-normal">
          <p className="text-base md:text-lg">{smallText}</p>
          <h3 className="font-extrabold  text-5xl md:text-6xl">{midText}</h3>
          <p className="text-lg">{desc}</p>
          <Link href={`/products/${product}`}>
            <button type="type" className="rounded-2xl px-3 py-2 md:px-4 md:py-3 bg-white text-[#ffAA1D] border-none mt-[40px] text-lg font-bold cursor-pointer">{buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image)} alt="headphones" className="hidden lg:flex absolute top-[-25%] left-[25%] "/>
      </div>
    </div>
  );
};

export default FooterBanner;