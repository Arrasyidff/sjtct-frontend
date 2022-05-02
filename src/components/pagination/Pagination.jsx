import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './pagination.scss'

function Pagination({ total, page }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  
  const listPagination = () => {
    let result = []
    for (let i = 0; i <= total; i++) {
      result.push(i)
    }
    return result
  }

  const handleMovePage = (toPage) => {
    navigate(`${pathname}?page=${toPage}`)
    window.scrollTo(0, 0);
  }

  return (
    <div className="sjtct__pagination">
      <div className="sjtct__pagination-items">
        {
          listPagination().map((item) => {
            return (
              <button key={item}
                className={`sjtct__pagination-items--item 
                ${page === item ? 'is-active' : ''}`}
                disabled={page === item}
                onClick={() => {handleMovePage(item + 1)}}
              >
                {item + 1}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Pagination