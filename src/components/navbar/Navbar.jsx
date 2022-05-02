import React from 'react'
import './navbar.scss'
import logo from '../../assets/images/logo'
import { useLocation, NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClassActiveLink = (path) => {
    if (path === location.pathname) {
      return 'active-link'
    }
    return ''
  }
  return (
    <div className="sjtct__navbar">
      <div className="sjtct__navbar--logo"
        onClick={() => {navigate('/')}}
      >
        <img src={logo} alt="" />
      </div>
      <div className="sjtct__navbar-links">
        <NavLink
          to={'/favorites'} 
          className={`sjtct__navbar-links--item
            ${handleClassActiveLink('/favorites')}
          `}
        >Favorites</NavLink>
      </div>
    </div>
  )
}

export default Navbar