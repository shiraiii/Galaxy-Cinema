import React, { createContext, useState, useContext } from "react"
const TabsContext = createContext({})
const BlogsContext = createContext({})
const ShowtimeContext = createContext({})
export const TabsProvider = ({ children, defaultIndex = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultIndex)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export const BlogProvider = ({ children, defaultIndedx = 0 }) => {
  const [activeBlog, setActiveBlog] = useState(defaultIndedx)

  return (
    <BlogsContext.Provider value={{ activeBlog, setActiveBlog }}>
      {children}
    </BlogsContext.Provider>
  )
}

export const ShowtimeProvider = ({ children, defaultIndex = 0 }) => {
  const [activeShowtime, setActiveShowtime] = useState(defaultIndex)

  return (
    <ShowtimeContext.Provider value={{ activeShowtime, setActiveShowtime }}>
      {children}
    </ShowtimeContext.Provider>
  )
}
export const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider")
  }
  return context
}

export const useBlogs = () => {
  const context = useContext(BlogsContext)
  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider")
  }
  return context
}

export const useShowtime = () => {
  const context = useContext(ShowtimeContext)
  if (!context) {
    throw new Error("useShowtime must be used within a ShowtimeProvider")
  }
  return context
}
