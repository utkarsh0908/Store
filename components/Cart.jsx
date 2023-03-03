import { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

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
      <div className="h-screen w-[600px] bg-white float-right px-[40px] py-[10px] relative">
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
          <div className="m-[40px] text-center">
            <div className="flex justify-center">
              <AiOutlineShopping size={150} />
            </div>
            <h3 className="font-semibold text-[20px]">
              Your shopping bag is empty
            </h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="w-full max-w-[400px] px-[10px] py-[12px] border-none rounded-[15px] text-[20px] mt-[10px] uppercase bg-[#f02d34] text-white cursor-pointer scale-100 transition duration-500 ease hover:scale-110"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-[15px] mt-[20px] w-full">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="flex gap-[30px] p-[20px]" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="w-[180px] h-[150px] rounded-[15px] bg-[#ebebeb]"
                />
                <div className="item-desc">
                  <div className="flex justify-between w-[350px] text-[#324d67] top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex justify-between w-[350px] text-[#324d67] mt-[60px]">
                    <div>
                      <p className="border-[1px] border-gray p-[6px]">
                        <span
                          className="border-r-[1px] border-[#808080d9] text-[#f02d34]"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="border border-r-[1px] border-[#808080d9]">
                          {item.quantity}
                        </span>
                        <span
                          className="text-[rgb(49, 168, 49)]"
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
                      className="remove-item"
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
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick="">
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
