import React from 'react'
import './category.scss'
import { useNavigate } from 'react-router-dom'

function Category({ id, name }) {
  const navigate = useNavigate()
  return (
    <p className="sjtct__categories-items--item"
      onClick={() => {navigate(`/categories/${id}/${name}`)}}
    >
      {name}
    </p>
  )
}

export default Category