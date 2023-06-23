import FooterBanner from "../components/FooterBanner"
import HeroBanner from "../components/HeroBanner"
import Product from "../components/Product"
import {client} from '../lib/client'

export default function Home({products, banner}) {
  return (
    <>
    <div className="py-16">
      <HeroBanner heroBanner={banner.length && banner[0]}/>
      <div className="text-center my-20 text-[#324d67]">
        <h2 className="text-4xl font-extrabold">Best Selling Headphones</h2>
        <p className="text-base font-light">Speakers of many variations</p>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mt-20 w-full">
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>
      <FooterBanner footerBanner={banner.length && banner[0]}/>
    </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const banner = await client.fetch(bannerQuery)

  return {
      props: {products, banner}
    }
}