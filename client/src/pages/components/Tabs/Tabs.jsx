import { useState } from "react";
import { BlogProvider, TabsProvider, useBlogs, useTabs } from "./TabsContext";

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
    const {activeTab} = useTabs();
    return activeTab === index? <div className="tabPanel grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6 mb-10 ">{children}</div> : null
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