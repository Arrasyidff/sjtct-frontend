import React from 'react'
import './subCategories.scss'
import { useSelector } from 'react-redux'
import { Category } from '../../components'

function Categories() {
  const { categories } = useSelector(state => state.category)
  
  return (
    <div className="sjtct__sub-categories section__padding">
      <h1 className="sjtct__sub-categories--title section--title">
        Explore Categories
      </h1>
      <div className="sjtct__sub-categories__items">
        {
          categories.map(item => {
            return (
              <Category key={item.id} id={item.id} name={item.name} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Categories