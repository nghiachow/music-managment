import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {SidebarData} from './SidebarData'
import '../stlye/Navbar.css'

function NavBar() {
    const [sidebar,setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
  return (
    <div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                    <h2 className='logo'>ChouChou</h2>
                </li>
                {SidebarData.map((item,index) => {
                    return (
                        <li key={index} className={item.className}>
                            <Link className='nav-item' to={item.path}>
                                {item.icon}
                                <span  style={{fontWeight:'bolder', fontSize:'large', marginLeft:'16px'}}>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    </div>
  )
}

export default NavBar