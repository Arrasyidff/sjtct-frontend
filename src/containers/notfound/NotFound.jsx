import React from 'react'
import './notfound.scss'
import notfound from '../../assets/images/not_found.svg'

function NotFound() {
  return (
    <div className="sjtct__notfound section__padding">
      <img src={notfound} alt="" />
      <p>Not Found</p>
    </div>
  )
}

export default NotFound