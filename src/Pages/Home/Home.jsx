import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import { CoinContext } from '../../Context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

    const {allCoin, currency} = useContext(CoinContext);
    const [displayCoin,setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');

    const inputHandler = (event)=>{
        setInput(event.target.value);
        if (event.target.value === "") {
            setDisplayCoin(allCoin);
        }
    }

    const searchHandler =async (event)=>{
        event.preventDefault();
        const coins = await allCoin.filter((item)=>{
          return  item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins);
    }

    useEffect(()=>{
        setDisplayCoin(allCoin);
    },[allCoin])

  return (
    <div className='home py-0 px-[10px] pb-[100px] '>
        <div className="hero max-w-[600px] my-[80px] mx-auto flex flex-col items-center text-center gap-[30px]">
            <h1 className='text-[max(4vw,36px)]'>Largest <br /> Crypto MarketPlace</h1>
            <p className='w-[75%] text-[#e3e3e3] text-sm'>Welcome the world's largest cryptocurrency marketplace, Sign up to explore more about cryptos.</p>
            <form onSubmit={searchHandler} className='p-2 w-[80%] min-w-fit bg-white rounded-[5px] text-xl flex justify-between items-center gap-[10px]'>
                <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto...' className='flex-[1] text-[16px] text-black outline-none border-none pl-[10px]' required/>

                <datalist id='coinlist'>
                    {allCoin.map((item,index)=>(<option key={index} value={item.name} />))}
                </datalist>

                <button type='submit' className='border-none bg-[#7927ff] text-white text-[16px] py-[10px] px-[30px] rounded-[5px] cursor-pointer'>Search</button>
            </form>
        </div>
        <div className="crypto-table ">
            <div className="table-layout ">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:"center"}}>24H Change</p>
                <p className='market-cap'>Market Cap</p>
            </div>
            {
                displayCoin.slice(0,10).map((item,index)=>(
                    <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt="" />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h>0 ? "text-green-500" : "text-red-500"}>
                            {Math.floor(item.price_change_percentage_24h*100)/100}
                        </p>
                        <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default Home