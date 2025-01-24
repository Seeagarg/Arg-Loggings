import React from 'react'
import Sidebar from '../Components/SideBar'
import classes from './Layout.module.css'

const Layout = ({children}) => {
  return (
    <div className={classes.layout_container}>
      {children}
    </div>
  )
}

export default Layout
