import React from 'react'
import { useState, useEffect } from 'react'
import { CAlert, CCard, CCardBody, CCardImage, CCardTitle } from '@coreui/react'
import {Tabs, Tab, TabsList, TabPanel} from '../Tabs/Tabs'
import './moviecard.css'

const  Moviecard = () => {
  const [error, setError] = useState([]);
  const [movies, setMovies] = useState([]);
  const [lists, setLists] = useState([])
  useEffect (() => {
    const fectchData = async () => {
      try{
        const res = await fetch ("/api/movies");
        const data = (await res.json());
        setMovies(data);
      } catch (e){
        setError(e);  
      }   
    };
    fectchData();
  },[])
  useEffect(() => {
    fetch("/api/movieCats")
    .then(res => res.json())
    .then(data => setLists(data))
  }, []);
  return (
  <div className='movies'>
    <div className='movies__wrapper py-12 my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-6xl px-[16px]'>
      <Tabs>
      <div className='flex w-full md:justify-start justify-between gap-5 items-center mb-10'>
        <div className='flex'>
          <div className='hidden md:block'>
            <span className='border-l-4 border-solid border-[#034EA2] mr-2 '></span>
            <h1 className='mr-10 text-xl font-bold not-italic uppercase inline'>Phim</h1>
          </div>
          <div className='flex flex-wrap'> 
            <TabsList>
              {
                lists?.map((list,index) => {
                  return <li key={index} className='-mb-px mr-3 md:mr-8 text-[#333333] last:mr-0 flex-auto text-center hover:text-[#034EA2] transition-all duration-300 ease-in-out cursor-pointer relative '>
                    <Tab index = {index}>
                      {list?.name}
                    </Tab>
                  </li>
                })
              }
            </TabsList>
          </div>
        </div>
        <a className='text-[#034EA2] cursor-pointer md:text-base screen360:text-[12px] text-sm'>
          <i className="fa-solid fa-location-crosshairs"></i>
          <span className='inline-block ml-1'>Toàn quốc</span>
        </a>
      </div>
      <div className='tabs__content'>
        <div>
          <TabPanel index={0}>    {
            movies?.slice(0,14).map((movie, index) =>{
            return <CCard key={index}>
                    <CCardBody className='Card_Card__uVcCy'>
                      <div className='Card_card__header__Nq4zg '>
                        <div className='Card_card__hover__jJf4Q hidden xl:block'>
                          <div className='card__hover__content flex flex-col justify-center items-center w-full h-full gap-3'>
                            <a type='button' className='text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] '>
                              <img src='https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg' className='mr-2'></img>
                              Mua vé
                            </a>
                            <button type='button' className='text-white w-[120px] h-[40px] border border-white hover:bg-[#fb9440]/80 hover:border-transparent rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] '>
                              <i className="fa-solid fa-circle-play mr-2"></i>                  
                              Trailer
                            </button>
                          </div>
                        </div>
                        <CCardImage width={'300px'} height={'500px'} src={movie?.movieImg} color='transparent' className='object-cover duration-500 ease-in-out group-hover:opacity-100'></CCardImage>
                        <div className='votes'>
                          <p className='absolute right-[5px] bottom-10'>
                            <span>
                              <i className="fa-solid fa-star text-yellow-300 mr-5 text-[12px]"></i>
                              <span className='text-[18px] font-bold text-white'>{movie?.movieRating}</span>
                            </span>
                          </p>
                        </div>
                        <div className='age__limit absolute bottom-[6px] right-[6px]'>
                          <span className='inline-flex items-center justify-center w-[38px] h-7 bg-[#f26b38] rounded text-sm text-center text-white font-bold not-italic'>{movie?.ageLimit}</span>
                        </div>
                      </div>
                    </CCardBody>
                    <CCardTitle>
                      {movie?.name} 
                    </CCardTitle>
                </CCard>
                })
            }
          </TabPanel>
          <TabPanel index={1}>
            {
            movies?.slice(8,16).map((movie, index) =>{
            return <CCard key={index}>
                    <CCardBody className='Card_Card__uVcCy'>
                      <div className='Card_card__header__Nq4zg '>
                        <div className='Card_card__hover__jJf4Q hidden xl:block'>
                          <div className='card__hover__content flex flex-col justify-center items-center w-full h-full gap-3'>
                            <a type='button' className='text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] '>
                              <img src='https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg' className='mr-2'></img>
                              Mua vé
                            </a>
                            <button type='button' className='text-white w-[120px] h-[40px] border border-white hover:bg-[#fb9440]/80 hover:border-transparent rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] '>
                              <i className="fa-solid fa-circle-play mr-2"></i>                  
                              Trailer
                            </button>
                          </div>
                        </div>
                        <CCardImage width={'300px'} height={'500px'} src={movie?.movieImg} color='transparent' className='object-cover duration-500 ease-in-out group-hover:opacity-100'></CCardImage>
                        <div className='votes'>
                          <p className='absolute right-[5px] bottom-10'>
                            <span>
                              <i className="fa-solid fa-star text-yellow-300 mr-5 text-[12px]"></i>
                              <span className='text-[18px] font-bold text-white'>{movie?.movieRating}</span>
                            </span>
                          </p>
                        </div>
                        <div className='age__limit absolute bottom-[6px] right-[6px]'>
                          <span className='inline-flex items-center justify-center w-[38px] h-7 bg-[#f26b38] rounded text-sm text-center text-white font-bold not-italic'>{movie?.ageLimit}</span>
                        </div>
                      </div>
                    </CCardBody>
                    <CCardTitle>
                      {movie?.name} 
                    </CCardTitle>
                </CCard>
                })
            }
          </TabPanel>
          <TabPanel index={2}>
            {
            movies?.slice(0,8).map((movie, index) =>{
            return <CCard key={index}>
                    <CCardBody className='Card_Card__uVcCy'>
                      <div className='Card_card__header__Nq4zg '>
                        <div className='Card_card__hover__jJf4Q hidden xl:block'>
                          <div className='card__hover__content flex flex-col justify-center items-center w-full h-full gap-3'>
                            <a type='button' className='text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] '>
                              <img src='https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg' className='mr-2'></img>
                              Mua vé
                            </a>
                            <button type='button' className='text-white w-[120px] h-[40px] border border-white hover:bg-[#fb9440]/80 hover:border-transparent rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] '>
                              <i className="fa-solid fa-circle-play mr-2"></i>                  
                              Trailer
                            </button>
                          </div>
                        </div>
                        <div className='absolute z-100 right-1 top-1'>
                          <img src='https://www.galaxycine.vn/_next/static/media/film-tag.8f085a74.png' width={'34px'} height={'62px'}></img>
                        </div>
                        <CCardImage width={'300px'} height={'500px'} src={movie?.movieImg} color='transparent' className='object-cover duration-500 ease-in-out group-hover:opacity-100'></CCardImage>
                        <div className='votes'>
                          <p className='absolute right-[5px] bottom-10'>
                            <span>
                              <i className="fa-solid fa-star text-yellow-300 mr-5 text-[12px]"></i>
                              <span className='text-[18px] font-bold text-white'>{movie?.movieRating}</span>
                            </span>
                          </p>
                        </div>
                        <div className='age__limit absolute bottom-[6px] right-[6px]'>
                          <span className='inline-flex items-center justify-center w-[38px] h-7 bg-[#f26b38] rounded text-sm text-center text-white font-bold not-italic'>{movie?.ageLimit}</span>
                        </div>
                      </div>
                    </CCardBody>
                    <CCardTitle>
                      {movie?.name} 
                    </CCardTitle>
                </CCard>
                })
            }
          </TabPanel>
        </div>
      </div>
    </Tabs>   
  </div>
</div>
  )
}

export default Moviecard