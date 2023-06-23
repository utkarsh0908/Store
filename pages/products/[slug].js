import { client, urlFor } from "../../lib/client";
import { useState } from "react";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import Product from "../../components/Product"
import { useStateContext } from "../../context/stateContext"


const ProductDetails = ({ product, products }) => {
  const { image, details, name, price } = product;
  const [index, setIndex] = useState(0);
  const {decQty, incQty, qty, onAdd} = useStateContext()

  const fields = [];
  for (let i = 1; i <= 4; i++) {
    fields.push(<div><AiFillStar /></div>);
  }


  return (
    <div className="py-32">
      <div className="flex flex-col md:flex-row gap-10 text-[#324d67]">
        <div className="p-4">
          <div>
            <img src={urlFor(image && image[index])} alt="productImg" className="object-cover rounded-[15px] bg-[#ebebeb] w-screen h-auto md:w-[300px] md:h-[300px] cursor-pointer transition-transform duration-300 ease-in-out hover:bg-[#f02d34]"/>
          </div>
          <div className="flex gap-2.5 mt-[20px]">
            {image?.map((item, ind)=>(
              <img src={urlFor(item)} key={ind} className={ind === index ? 'rounded-[8px] text-[#ebebeb] w-[70px] h-[70px] cursor-pointer bg-[#f02d34]' : 'rounded-[8px] text-[#ebebeb] w-[70px] h-[70px] cursor-pointer'} onMouseEnter={() => setIndex(ind)}/>
            ))}
          </div>
        </div>
        <div className="p-4">
          <h1 className="text-xl md:text-3xl">{name}</h1>
          <div className="flex items-center gap-2 md:gap-5 mt-2 md:mt-10 text-[#f02d34]">
            {fields}
            <div><AiOutlineStar /></div>
            <p>(20)</p>
          </div>
          <h4 className="mt-[10px] text-lg">Details</h4>
          <p className="md:mt-[10px]">{details}</p>
          <p className="font-bold text-2xl mt-4 md:mt-[30px] text-[#f02d34]">${price}</p>
          <div className="flex gap-5 md:mt-[10px] items-center">
            <h3>Quantity:</h3>
            <p className="border border-gray-500 p-1 flex">
              <span className="text-base px-[12px] py-[6px] cursor-pointer border-r border-gray-500 flex items-center" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="text-base px-[12px] py-[6px] cursor-pointer border-r border-gray-500 flex items-center">{qty}</span>
              <span className="text-base px-[12px] py-[6px] cursor-pointer text-[#31A831] flex items-center" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="flex gap-8">
            <button type="button" className="px-[10px] py-[20px] border border-[#f02d34] mt-[40px] text-lg font-medium bg-white text-[#f02d34] cursor-pointer w-[200px] scale-100 transition-transform duration-500 ease-in-out hover:scale-110" onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button type="button" className="w-[200px] px-[10px] py-[20px] bg-[#f02d34] text-white border-none mt-[40px] text-lg font-medium cursor-pointer scale-100 transition-transform duration-500 ease-in-out hover:scale-110">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
          <h2 className="text-center m-[50px] text-[#324d67] text-2xl">You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products?.map((item)=>(
                <Product key={item._id} product={item}/>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};
