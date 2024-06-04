import { memo, useEffect, useState} from 'react'
import React from 'react';
import './style.css'
const Footer = () => {
  const [footer_itmes, setFooterItems] = useState([]);
  useEffect(() => {
    fetch('/api/footer_items')
    .then(res => res.json())
    .then(data => setFooterItems(data))
  },[])
  return (
    <footer id='footer' className='Footer_footer__pJUho'>
      <div className='Footer_footer__container__dTA60 screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:max-w-4xl md:px-4 sm:px-[45px] px-[16px]'>
        <div className='py-8'>
          <div className='grid grid-cols-2 gap-y-4 md:gap-y-0 sm:grid-cols-4 xl:grid-cols-4 '>
            {
              footer_itmes?.map((item, index) => {
                return <div key={index}>
                  <h3 className='Footer_footer__title__CRSrF mb-3 md:mb-6'>{item?.name}</h3>
                  <ul>
                    {
                      item.child &&(
                        item.child.map((child, childIndex) => (
                          <li key={`${index}-${childIndex}`} className='hover:text-[#FD841F] transition-all duration-300'>
                            <a className='Footer_footer__list__item__HP4Ou leading-10 text-[#d0d0d0] hover:text-[#FD941F] transition-all duration-300'>
                              {child.name}
                            </a>
                          </li>
                        ))
                      )
                    }
                  </ul>
                </div>             
              })
            }
            <div id='register' className='grid grid-cols-1 md:gird-cols-[300px_minmax(900px,1fr)_100px] xl:block'>
              <div id='connect' className='footer__connect'>
                <div className='footer__logo mb-5'>
                  <img src='https://www.galaxycine.vn/_next/static/media/galaxy-logo-footer.7a918263.svg' width={'94'} height={'42'} style={{color:'transparent'}}></img>
                </div>
                <ul className='Footer_connect__icon__9_xjQ'>
                  <li>
                    <a href='https://www.facebook.com/galaxycinevn' target='_blank'>
                      <i className="fa-brands fa-square-facebook fa-2x"></i>
                    </a>
                  </li>
                  <li>
                    <a href='https://www.facebook.com/galaxycinevn' target='_blank'>
                      <i className="fa-brands fa-youtube fa-2x"></i>
                    </a>
                  </li>
                  <li>
                    <a href='https://www.facebook.com/galaxycinevn' target='_blank'>
                      <i className="fa-brands fa-instagram fa-2x"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className='connect__trade mt-5'>
                <a href='http://online.gov.vn/Home/WebDetails/5005?AspxAutoDetectCookieSupport=1' target='_blank'>
                  <img src='https://www.galaxycine.vn/_next/static/media/glx_trade.61f6c35c.png' width={'150'} height={'57'} style={{color: 'transparent'}}></img>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='Footer_footer__bottom__Ro_Ls'>
          <div className='flex justify-start justify-items-start items-center gap-5'>
            <div className='footer__logo'>
              <img src='https://www.galaxycine.vn/_next/static/media/galaxy-logo-footer.7a918263.svg' width={'94'} height={'42'} style={{color: 'transparent'}}></img>
            </div>
            <div className='Footer_footer__bottom__content__154Qe'>
              <h3>CÔNG TY CỔ PHẦN PHIM THIÊN NGÂN</h3>
              <p>
                Tòa nhà Bitexco Nam Long, 63A Võ Văn Tần, Phường 6, Quận 3, Tp.Hồ Chí Minh, Việt Name
              </p>
              <p>
                <i className="fa-solid fa-mobile"></i>
                <a className='hover:text-[#FD841F] transition-all duration-300'>: 093.788.0608 - </a>
                <i className="fa-solid fa-phone"></i>
                <a className='hover:text-[#FD841F] transition-all duration-300'>: 19002224 (9:00 - 22:00) - </a>
                <i className="fa-solid fa-paper-plane"></i>
                <a className='hover:text-[#FD841F] transition-all duration-300'>: 2100009741@nttu.edu.vn </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default memo(Footer);