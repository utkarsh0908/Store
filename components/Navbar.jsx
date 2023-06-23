import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/stateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div
      className="flex z-10 fixed justify-between py-[6px] px-[18px] w-screen">
      <p className="  text-gray-600  text-lg">
        <Link href="/">Store</Link>
      </p>
      <button
        type="button"
        className="text-gray-500 cursor-pointer relative transition-transform duration-400 border-none bg-transparent hover:scale-110"
        onClick={() => setShowCart(true)}
      >
        <span className="text-2xl">
          <AiOutlineShopping />
        </span>
        <span
          className="absolute mt-[-30px] text-[10px] text-[#eee] bg-[#f02d34] w-[15px] h-[15px] font-semibold rounded-full text-center" >
          {totalQuantities}
        </span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
