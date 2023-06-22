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


  return (
    <div>
      <div className="flex gap-10 m-10 mt-16 text-[#324d67]">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} alt="productImg" className="rounded-[15px] bg-[#ebebeb] w-[400px] h-[400px] cursor-pointer transition-transform duration-300 ease-in-out hover:bg-[#f02d34]"/>
          </div>
          <div className="flex gap-2.5 mt-[20px]">
            {image?.map((item, ind)=>(
              <img src={urlFor(item)} key={ind} className={ind === index ? 'rounded-[8px] text-[#ebebeb] w-[70px] h-[70px] cursor-pointer bg-[#f02d34]' : 'rounded-[8px] text-[#ebebeb] w-[70px] h-[70px] cursor-pointer'} onMouseEnter={() => setIndex(ind)}/>
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div><AiFillStar /></div>
            <div><AiFillStar /></div>
            <div><AiFillStar /></div>
            <div><AiFillStar /></div>
            <div><AiOutlineStar /></div>
            <p>(20)</p>
          </div>
          <h4 className="mt-[10px]">Details</h4>
          <p className="mt-[10px]">{details}</p>
          <p className="font-bold text-2xl mt-[30px] text-[#f02d34]">${price}</p>
          <div className="flex gap-5 mt-[10px] items-center">
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
