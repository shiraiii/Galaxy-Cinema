import { BlogProvider, TabsProvider,ShowtimeProvider, useBlogs, useTabs, useShowtime } from "./TabsContext";

export const Tabs = ({children, defaultIndex}) => {
    return <TabsProvider defaultIndex={defaultIndex}>{children}</TabsProvider>;
}

export const TabsList = ({children}) => {
    return <ul className="tabsList flex mb-0 list-none flex-wrap flex-row">{children}</ul>
}

export const Tab = ({index,children}) => {
    const {activeTab, setActiveTab} = useTabs(); 
    return (
        <a className={`tab ${activeTab === index ? 'tab__active md:text-base screen360:text-sm text-[12px] font-bold not-italic block leading-normal hover:text-blue-10 transition-all duration-300 ease-in-out cursor-pointer relative text-[#034EA2] ' : '  md:text-base screen360:text-sm text-[12px] font-bold not-italic block leading-normal hover:text-blue-10 transition-all duration-300 ease-in-out cursor-pointer relative opacity-50'}`} onClick={() => setActiveTab(index)}>{children}</a>
    )
}
export const TabPanel = ({index, children}) => {
    const {activeTab, setActiveTab} = useTabs();
    return activeTab === index? <div className="tabPanel grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6 mb-10 " onClick={() => setActiveTab(index)}>{children}</div> : null
}

export const Blogs = ({children, defaultIndex}) => {
    return <BlogProvider defaultIndex={defaultIndex}>{children}</BlogProvider>;
}

export const BlogsList = ({children}) => {
    return <ul className="flex mb-0 list-none flex-wrap flex-row">{children}</ul>
}

export const BlogTab = ({index, children}) => {
    const {activeBlog, setActiveBlog} = useBlogs();
    return (
        <span className={`tab ${activeBlog === index ? 'tab__active text-base font-bold not-italic block leading-normal text-black-10 hover:text-blue-10 transition-all duration-300 ease-in-out text-[#034EA2] tab__active opacity-100':' text-base font-bold not-italic block leading-normal text-black-10 hover:text-[#034EA2] transition-all duration-300 ease-in-out text-blue-30 opacity-50'}`} onClick={() => setActiveBlog(index)}>{children}</span>
    )
}

export const BlogPanel = ({index, children}) => {
    const {activeBlog} = useBlogs();
    return activeBlog === index? <div className="grid md:grid-cols-2 md:gap-x-6 gap-4">{children}</div>:null
}

export const ShowtimeContainer = ({children, defaultIndex}) => {
    return <ShowtimeProvider defaultIndex={defaultIndex}>{children}</ShowtimeProvider>;
}

export const ShowtimeList = ({index,children}) => {
    const {activeShowtime} = useShowtime();
    return activeShowtime === index? <div className="showtime__list">{children}</div>:null
}

export const ShowtimeTab = ({index, children}) => {
    const {activeShowtime, setActiveShowtime} = useShowtime();
    const activeClass = 'flex flex-wrap items-center capitalize text-center text-sm w-[80px] h-[65px] rounded-[5px] py-2 cursor-pointer bg-[#034ea2] text-white'
    const inactiveClass = 'flex flex-wrap items-center capitalize text-center text-sm w-[80px] h-[65px] rounded-[5px] py-2 cursor-pointer'
    return (
<a className={activeShowtime === index ? activeClass : inactiveClass} onClick={() => setActiveShowtime(index)}>{children}</a>
    )
}

export const ShowtimePanel = ({children}) => {
    return <div>{children}</div>
}