import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/stateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div
      className="flex 
    border
    justify-between
    my-[6px]
    mx-[18px]
    relative "
    >
      <p className="  text-gray-600  text-lg">
        <Link href="/">Store</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span
          className="absolute  mt-[-8px]  text-[12px]  text-[#eee]  bg-[#f02d34] w-[18px] h-[18px] font-semibold rounded-[50%]  text-center" >
          {totalQuantities}
        </span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
