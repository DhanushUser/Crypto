import React, { useContext } from "react";
import "./nav.css";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext);

  const currencyHandler = (event)=>{
    switch (event.target.value){
      case "usd": {
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
      case "eur": {
        setCurrency({name: "eur", symbol: " € "});
        break;
      }
      case "inr": {
        setCurrency({name: "inr", symbol: "₹"});
        break;
      }
      default: {
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
    }
  }

  return (
    <div className="navbar">
      <Link to={'/'}>
        <img src={logo} alt="" className="logo" /> 
      </Link>
      <ul className="lg:flex md:flex sm:flex-[hidden] lg:gap-10 md:gap-8 sm:gap-5 list-none min-w-fit">
       <Link to={'/'}> <li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right flex items-center gap-[max(1vw,12px)]">
        <select onChange={currencyHandler} className="bg-transparent py-[5px] px-2 rounded-[6px] border-[2px] border-[white] text-white">
          <option value="usd">USD</option>
          <option value="eur">EURO</option>
          <option value="inr">INR</option>
        </select>
        <button className="flex items-center gap-[10px] py-[10px] px-[25px] rounded-[20px] text-[15px] font-[500] text-[#393939] bg-white border-none cursor-pointer">
          Sign Up <img src={arrow_icon} alt="" className="w-[13px]"/>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
