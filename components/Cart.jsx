import { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import { useStateContext } from "../context/stateContext";
import { urlFor } from "../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  return (
    <div
      className="w-screen bg-[rgba(0, 0, 0, 0.5)] fixed right-0 top-0 z-[100] transition-all duration-1000 ease-in-out"
      ref={cartRef}
    >
      <div className="border h-screen w-[300px] md:w-[600px] bg-white float-right py-2  md:py-3 relative">
        <button
          type="button"
          className="flex items-center text-[18px] font-medium cursor-pointer gap-2 ml-[10px] bg-transparent mt-[35px]"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="ml-[10px]">Your Cart</span>
          <span className="ml-[10px] text-[#f02d34]">
            ({totalQuantities} items)
          </span>
        </button>

        {cartItems.length < 1 && (
          <div className="m-4 md:m-[40px] text-center">
            <div className="flex justify-center text-7xl md:text-[150px]">
              <AiOutlineShopping/>
            </div>
            <h3 className="font-semibold text-lg md:text-xl">
              Your shopping bag is empty
            </h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="w-full max-w-[400px] py-1 px-2 md:px-[10px] md:py-[12px] border-none rounded-[15px] text-sm md:text-xl mt-[10px] uppercase bg-[#f02d34] text-white cursor-pointer scale-100 transition duration-500 ease hover:scale-110"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-[15px] mt-[20px] w-full">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="flex w-full justify-between px-4 md:px-10" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="w-[70px] h-[70px] md:w-[180px] md:h-[150px] rounded-[15px] bg-[#ebebeb]"
                />
                <div className="flex flex-col ml-4">
                  <div className="flex justify-between w-[150px] md:w-[350px] text-[#324d67] top text-xl">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex justify-between w-[150px] md:w-[350px] text-[#324d67] md:mt-[60px]">
                    <div>
                      <p className="border-[1px] border-gray p-1 flex w-[100px] justify-between items-center">
                        <span
                          className="text-[#f02d34] border-r border-gray w-1/3 flex items-center justify-center"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span>
                          {item.quantity}
                        </span>
                        <span
                          className="text-[rgb(49, 168, 49)] border-l border-gray w-1/3 flex items-center justify-center"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-2xl text-[#f02d34] cursor-pointer bg-transparent border-none"
                      onClick={() => onRemove(item._id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="absolute bottom-0 p-8 w-full px-4 md:px-10">
            <div className="flex justify-between mb-3">
              <h3 className="text-xl font-semibold">Subtotal:</h3>
              <h3 className="text-xl">${totalPrice}</h3>
            </div>
            <div className="mx-auto">
              <button type="button" className="w-full px-4 py-2 rounded-3xl border-none text-xl text-white uppercase bg-red-500 transform transition-transform hover:scale-105">
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
