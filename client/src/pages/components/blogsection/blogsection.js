import React, { useEffect, useState } from 'react'
import {Blogs, BlogTab, BlogPanel, BlogsList} from '../Tabs/Tabs'
const Blogsection = () => {
    const [lists, setLists] = useState([])
    const [blogLists, setBlogLists] = useState([])
    useEffect(() => {
        fetch("/api/blogType")
        .then(res => res.json())
        .then(data => setLists(data))
    }, [])
    useEffect(() => {
        fetch("/api/blogContent")
        .then(res => res.json())
        .then(data => setBlogLists(data))
    }, [])
return (
    <div className='my-0 mx-auto py-8 md:py-12 screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:px-4 sm:px-[45px] px-[16px]'>
        <div className='md:text-center transition-all duration-300'>
            <Blogs>     
                <div className='flex items-center w-full justify-between mb-10'>
                    <div className='flex items-center'>
                        <div className='hidden md:block'>
                            <span className='border-l-4 border-solid border-[#034EA2] mr-2'></span>
                            <h1 className='mr-10 text-xl font-bold uppercase not-italic inline'>Góc điện ảnh</h1>
                        </div>
                        <div className='flex flex-wrap'>
                            <BlogsList className='flex mb-0 list-none flex-wrap flex-row' role='tablist'>
                                {
                                    lists?.map((list, index) => {
                                        return <li key={index} className='-mb-px mr-6 md:mr-8 last:mr-8 flex-auto text-center transition-all duration-300 cursor-pointer ease-in-out relative'>
                                            <BlogTab index={index} className={index===0 ? 'text-base font-bold not-italic block leading-normal text-black-10 hover:text-blue-10 transition-all duration-300 ease-in-out text-[#034EA2] tab__active opacity-100': 'text-base font-bold not-italic block leading-normal text-black-10 hover:text-[#034EA2] transition-all duration-300 ease-in-out text-blue-30 opacity-50'}>
                                                {list?.name}
                                            </BlogTab>
                                        </li>
                                    })
                                }
                            </BlogsList>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <BlogPanel index={0} className='grid md:grid-cols-2 md:gap-x-6 gap-4'>
                        <article className='flex flex-col gap-y-4' >
                        {
                            blogLists?.slice(0,1).map((blog,index) =>{
                            return <aside key={index} className='max-h-[476px] group transition-all duration-300 ease-in-out md:hover:text-[#034EA2]'>
                                            <a>
                                                <img width={445} height={300} className='rounded-lg md:rounded md:w-full w-full h-[232px] md:h-[215px] lg:h-[300px] xl:h-full max-h-[400px] group-hover:md:scale-105 transition-all duration-300 object-cover object-cover duration-500 ease-in-out group-hover:opcity-100' src={blog.blogImg} ></img>
                                            </a>
                                            <aside className='descriptions text-left mt-4 md:mt-7'>
                                                <a className='text-xl font-bold md:hover:text-[#034EA2] transition-all duration-300 overflow-hidden'>
                                                    {blog.blogTitle}
                                                </a>
                                                <div className='flex mt-2'>
                                                    <button type='button' className='h-[20px] text-xs text-white hover:text-white mr-2 bg-[#4080FF] hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 rounded px-3'>
                                                    <i className="fa-solid fa-thumbs-up"></i>
                                                    Thích  
                                                    </button>
                                                    <button className='text-xs text-black bg-[#e9ecef] h-[20px] rounded mr-2 px-3 hover:text-black '>
                                                    <i className="fa-solid fa-eye"></i>
                                                    {blog.blogVote}
                                                    </button>
                                                </div>
                                            </aside>
                                        </aside>
                            })
                        }
                        </article>
                        <article className='flex flex-col gap-y-4'>
                        {
                            blogLists?.slice(1,4).map((blog,index) =>{
                                return <aside key={index} className='flex gap-x-2 w-full max-h-[80px] md:max-h-[150px] group transition-all duration-300 ease-in-out md:hover:text-[#034EA2]'>
                                    <a className='w-[30%] md:w-[35%]'>
                                        <img src={blog.blogImg} className='rounded-lg md:rounded md:w-[195px] md:h-full w-[120px] h-[75px] group-hover:md:scale-105 transition-all duration-300 object-cover object-cover duration-500 ease-in-out group-hover:opacity-100'></img>
                                    </a>
                                    <aside className='descriptions title__movie text-left w-[70%] md:w-[65%]' style={{marginTop: 0, lineHeight: '120%'}} >
                                        <a className='text-sm md:text-base xl:text-xl font-normal md:font-bold hover:text-[#034EA2] transition-all duration-300 overflow-hidden leading-normal'>
                                            {blog.blogTitle}
                                        </a>
                                        <div className='flex mt-2'>
                                            <button type='button' className='h-[20px] text-xs text-white hover:text-white mr-2 bg-[#4080FF] hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 rounded px-3'>
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            Thích  
                                            </button>
                                            <button className='text-xs text-black bg-[#E9ECEF] h-[20px] rounded mr-2 px-3 hover:text-black '>
                                            <i className="fa-solid fa-eye"></i>
                                                {blog.blogVote}
                                            </button>
                                        </div>
                                    </aside>
                                </aside>
                            })
                        }
                        </article>
                    </BlogPanel>
                    <BlogPanel index={1} className='grid md:grid-cols-2 md:gap-x-6 gap-4'>
                        <article className='flex flex-col gap-y-4' >
                        {
                            blogLists?.slice(4,5).map((blog,index) =>{
                            return <aside key={index} className='max-h-[476px] group transition-all duration-300 ease-in-out md:hover:text-[#034EA2]'>
                                            <a>
                                                <img width={445} height={300} className='rounded-lg md:rounded md:w-full w-full h-[232px] md:h-[215px] lg:h-[300px] xl:h-full max-h-[400px] group-hover:md:scale-105 transition-all duration-300 object-cover object-cover duration-500 ease-in-out group-hover:opcity-100' src={blog.blogImg} ></img>
                                            </a>
                                            <aside className='descriptions text-left mt-4 md:mt-7'>
                                                <a className='text-xl font-bold md:hover:text-[#034EA2] transition-all duration-300 overflow-hidden'>
                                                    {blog.blogTitle}
                                                </a>
                                                <div className='flex mt-2'>
                                                    <button type='button' className='h-[20px] text-xs text-white hover:text-white mr-2 bg-[#4080FF] hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 rounded px-3'>
                                                    <i className="fa-solid fa-thumbs-up"></i>
                                                    Thích  
                                                    </button>
                                                    <button className='text-xs text-black bg-[#e9ecef] h-[20px] rounded mr-2 px-3 hover:text-black '>
                                                    <i className="fa-solid fa-eye"></i>
                                                    {blog.blogVote}
                                                    </button>
                                                </div>
                                            </aside>
                                        </aside>
                            })
                        }
                        </article>
                        <article className='flex flex-col gap-y-4'>
                        {
                            blogLists?.slice(5,8).map((blog,index) =>{
                                return <aside key={index} className='flex gap-x-2 w-full max-h-[80px] md:max-h-[150px] group transition-all duration-300 ease-in-out md:hover:text-[#034EA2]'>
                                    <a className='w-[30%] md:w-[35%]'>
                                        <img src={blog.blogImg} className='rounded-lg md:rounded md:w-[195px] md:h-full w-[120px] h-[75px] group-hover:md:scale-105 transition-all duration-300 object-cover object-cover duration-500 ease-in-out group-hover:opacity-100'></img>
                                    </a>
                                    <aside className='descriptions title__movie text-left w-[70%] md:w-[65%]' style={{marginTop: 0, lineHeight: '120%'}} >
                                        <a className='text-sm md:text-base xl:text-xl font-normal md:font-bold hover:text-[#034EA2] transition-all duration-300 overflow-hidden leading-normal'>
                                            {blog.blogTitle}
                                        </a>
                                        <div className='flex mt-2'>
                                            <button type='button' className='h-[20px] text-xs text-white hover:text-white mr-2 bg-[#4080FF] hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 rounded px-3'>
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            Thích  
                                            </button>
                                            <button className='text-xs text-black bg-[#E9ECEF] h-[20px] rounded mr-2 px-3 hover:text-black '>
                                            <i className="fa-solid fa-eye"></i>
                                            {blog.blogVote}
                                            </button>
                                        </div>
                                    </aside>
                                </aside>
                            })
                        }
                        </article>
                    </BlogPanel>
                    <div className='text-center mt-7 transition-all duration-300 ease-in-out'>
                        <a className='text-[#f26b38] hover:text-white w-40 border border-[#fb9440] hover:bg-[#fb9440] transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] mr-2 mb-2 justify-center ' >
                            Xem thêm
                            <i className="fa-solid fa-angle-right ml-2"></i>
                        </a>
                    </div>
                </div>
            </Blogs>
        </div>
    </div>
  )
}

export default Blogsection