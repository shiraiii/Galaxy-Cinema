import React from 'react'
import {CarouselProvider, Slider, Slide} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';
import  './advertisesection.css'
const Advertisesection = () => {
  return (
    <div className='advertise bg-[url(https://www.galaxycine.vn/_next/static/media/bg-icon-iphone-x.3b4bcdb7.svg)] h-full md:block hidden'>
        <div className='advertise__wrap my-0 mx-auto py-12 screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-6xl'>
            <div className='advertise__container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-6'>
                <div className='advertise__left my-auto mx-auto relative z-20 md:block hidden'>
                    <img alt='img-iphone' loading='lazy' className='img-atr relative z-50' width={'200'} height={'409'} src='https://www.galaxycine.vn/_next/static/media/Frame-iphone-x.78ef1223.svg'></img>
                    <div className='absolute z-1 top-[2.5%] left-[5%]'>
                        <CarouselProvider
                          className='carousel__custom'
                          naturalSlideHeight={390}
                          naturalSlideWidth={180}
                          totalSlides={4}
                          visibleSlides={1}
                          infinite={1}
                          isPlaying={true}
                        >
                          <Slider>
                            <Slide index={0} style={{}}>
                              <img width={'180'} height={'391'} loading='lazy' style={{color:'transparent'}} src=' https://www.galaxycine.vn/_next/static/media/Splash.de33f19c.png'></img>
                            </Slide>
                            <Slide index={1}>
                              <img width={'180'} height={'391'} loading='lazy' style={{color:'transparent'}} src=' https://www.galaxycine.vn/_next/static/media/screen-slider-iphone.3339b3ed.png'></img>
                            </Slide>
                            <Slide index={2}>
                              <img width={'180'} height={'391'} loading='lazy' style={{color:'transparent'}} src='https://www.galaxycine.vn/_next/static/media/Profile.767d60ee.png'></img>
                            </Slide>
                            <Slide index={3}>
                              <img width={'180'} height={'391'} loading='lazy' style={{color:'transparent'}} src='https://www.galaxycine.vn/_next/static/media/MovieDetail.52d031b0.png'></img>
                            </Slide>
                          </Slider>
                        </CarouselProvider>
                    </div>
                </div>
                <div className='advertise__right flex items-center px-7'>
                  <div className='advertise__right__content'>
                    <h1 className='text-3xl text-white mb-4'>Đặt Vé Online - Không Lo Trễ Nải</h1>
                    <p className='text-sm text-white mb-5'>
                      Gét đông đúc ồn ào? Lười xếp hàng mua vé? Hãy quên đi cách mua vé giấy truyền thông tốn thời gian hay xếp hàng lấy vé online phiền toái.
                    </p>
                    <div className='app__qr flex items-end'>
                      <span className='qr__code'>
                        <img src='https://www.galaxycine.vn/_next/static/media/glx-qr-code-1.218ae7da.svg' width={'150'} height={'150'}></img>
                      </span>
                      <span className='text-white text-sm m-4 font-light'>
                        <i>OR</i>
                      </span>
                      <ul className='list-none'>
                        <li className='inline-block'>
                          <a className='inline-block' target='_blank'href='https://apps.apple.com/vn/app/galaxy-cinema/id593312549'>
                            <img className='w-auto h-auto' src='https://www.galaxycine.vn/_next/static/media/icon-ios-app-store.65ed00df.svg'></img>
                          </a>
                        </li>
                        <li className='inline-block ml-1'>
                          <a className='inline-block' target='_blank' href='https://play.google.com/store/apps/details?id=com.galaxy.cinema&hl=vi&pli=1'>
                            <img className='w-auto h-auto' src='https://www.galaxycine.vn/_next/static/media/icon-google-app-store.f4c38402.svg'></img>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Advertisesection