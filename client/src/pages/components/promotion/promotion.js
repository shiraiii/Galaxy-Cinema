import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

const Promotion = () => {
  const settings =  {
    infinite: true,
    speed: 500,
    autoplay:true,
    autoplayspeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive:[
        {
            breakpoint: 1280,
            settings:{
                slidesToShow: 3,
                slidesToScroll: 1,  
                centerMode:true,
                infinite:true,
        }
        },
        {
            breakpoint: 1024,
            settings:{
                slidesToShow:3,
                slidesToScroll:1,
            }
        },
        {
            breakpoint: 480,
            settings:{
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
  }
  const [promoLists, setPromoLists] = useState([])
  useEffect(() => {
      fetch("/api/promoLists")
      .then(res => res.json())
      .then(data => setPromoLists(data))
  },[])
  return (
    <div className='md:py-12 py-0 my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:max-w-4xl md:px-4 sm:px-[45px] px-[16px] '>
        <div className='flex items-center w-full justify-between mb-10'>
            <div className='flex items-center'>
                <div className='hidden md:block'>
                    <span className='border-l-4 border-solid border-[#034EA2] mr-2'></span>
                    <h1 className='mr-10 text-xl font-bold not-italic uppercase inline'>tin khuyến mãi</h1>
                </div>
            </div>
        </div>
        <Slider className='cust center' {...settings}>
            {
                promoLists?.map((list,index) =>{
                    return <a key={index} className='text-center px-5 first:px-0 last:px-0 focus:outline-none'>
                        <img src={list?.promoImg} width={225} height={148} className='w-full rounded-md mb-2 px-5 object-cover duration-500 ease-in-out group-hover:opacity-100'></img>
                        <span className='mt-4 text-base font-bold'>{list?.promoTitle}</span>
                    </a>
                })
            }
        </Slider>
    </div>
  )
}

export default Promotion