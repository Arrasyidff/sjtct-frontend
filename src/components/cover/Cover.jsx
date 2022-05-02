import React from 'react'
import './cover.scss'
import bookCover from '../../assets/images/book-cover.jpg'

function Cover() {
  return (
    <div className="sjtct__cover bg-fixed"
    style={{ backgroundImage: `
    linear-gradient(180deg, rgba(255,255,255,1) 21%, rgba(43,70,166,0.47102591036414565) 100%),
    url(${bookCover})` }}
    >
      <h1 className='sjtct__cover--title'>
        Welcome to Booku
      </h1>
    </div>
  )
}

export default Cover