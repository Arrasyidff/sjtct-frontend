import React from 'react'
import { useNavigate } from 'react-router-dom'
import './book.scss'

function Book({ id, category_id, title, desc, cover }) {
  const navigate = useNavigate()
  return (
    <div className="sjtct__book" onClick={() => { navigate(`/book/${category_id}/${id}`) }}>
      <img src={cover} alt="" />
      <div className="sjtct__book-content">
        <h3 className="sjtct__book--title">{title}</h3>
        <p className="sjtct__book--desc">{desc}</p>
      </div>
    </div>
  )
}

export default Book