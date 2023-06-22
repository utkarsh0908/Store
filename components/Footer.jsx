import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="text-[#324d67] text-center mt-[20px] px-[30px] py-[10px] font-bold flex flex-col items-center gap-2.5 justify-center">
      <p>2023 Store All Rights Reserved</p>
      <p className="text-2xl flex gap-2.5">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
