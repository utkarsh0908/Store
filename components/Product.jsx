import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/products/${slug.current}`}>
        <div className="cursor-pointer scale-100 transition-transform duration-500 ease-in-out text-[#324d67] hover:scale-[1.1]">
          <img src={urlFor(image && image[0])} width={250} height={250} className="rounded-[15px] bg-[#ebebeb] scale-100 transition-transform duration-500 ease-in-out"/>
          <p className="font-medium">{name}</p>
          <p className="font-bold mt-[6px] text-black">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
