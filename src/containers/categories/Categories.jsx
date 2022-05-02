import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import './categories.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setBooksByCategoryId } from '../../store/actions/book'
import useQuery from '../../hooks/useQuery';
import { Book, Loading as LoadingComponent, Pagination } from '../../components'

function Categories() {
  const { pathname } = useLocation();
  const { category_id, category_name } = useParams()
  const query = useQuery()
  const dispatch = useDispatch()
  const { loading: bookLoading, books } = useSelector(state => state.book)
  const [page, setPage] = useState(0)
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (query.get('page')) {
      setPage(+query.get('page') - 1)
    } else {
      setPage(0)
    }

    dispatch(setBooksByCategoryId({category_id, page}))
  }, [dispatch, query, page, category_id])

  const getTotalPage = () => {
    switch (+category_id) {
      case 1:
        return 3
      case 11:
        return 10
      case 12:
        return 0
      case 19:
        return 8
      case 21:
        return 3
      default:
        return 0
    }
  }

  if (bookLoading) return <LoadingComponent />

  return (
    <div className="sjtct__categories section__padding"
    >
      <h1 className="sjtct__categories--title section--title">"{category_name}"</h1>
      <div className="sjtct__categories-items
      grid
      sm:grid-cols-3
      sm:gap-2
      md:grid-cols-4
      sm:gap-3
      lg:grid-cols-6
      sm:gap-4">
        {
          books.map(book => {
            return (
              <Book key={book.id}
                id={book.id}
                category_id={book.category_id}
                title={book.title}
                cover={book.cover_url}
                desc={book.description}
              />
            )
          })
        }
      </div>
      {getTotalPage() > 0 && (<Pagination total={getTotalPage()} page={page} />)}
    </div>
  )
}

export default Categories