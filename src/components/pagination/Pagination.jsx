import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useQuery from '../../hooks/useQuery'
import './pagination.scss'

function Pagination({ total, page }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const query = useQuery()
  
  const listPagination = () => {
    let result = []
    for (let i = 0; i < total; i++) {
      result.push(i)
    }
    return result
  }

  const handleMovePage = (toPage) => {
    let qs = '?'
    if (query.get('title')) {
      qs += `title=${query.get('title')}`
    }
    if (qs.length > 1) {
      qs += `&page=${toPage}`
    } else {
      qs += `page=${toPage}`
    }
    navigate(`${pathname}${qs}`)
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
                ${page === item + 1 ? 'is-active' : ''}`}
                disabled={page === item + 1}
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