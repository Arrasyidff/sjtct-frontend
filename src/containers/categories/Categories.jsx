import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './categories.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setBooksByCategoryId } from '../../store/actions/book'
import useQuery from '../../hooks/useQuery';
import { Book, Loading as LoadingComponent, Pagination, EmptyData } from '../../components'

function Categories() {
  const { pathname } = useLocation();
  const { category_id, category_name } = useParams()
  const query = useQuery()
  const dispatch = useDispatch()
  const { loading: bookLoading, books } = useSelector(state => state.book)
  const [page, setPage] = useState(0)
  const [title, setTitle] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (query.get('page')) {
      setPage(+query.get('page'))
    } else {
      setPage(1)
    }

    dispatch(setBooksByCategoryId({category_id, page, queryTitle: query.get('title')}))
  }, [dispatch, query, page, category_id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title) {
      dispatch(setBooksByCategoryId({ category_id, page, queryTitle: title }))
      let search = '?'
      search += `title=${title}`
      navigate({
        pathname,
        search
      })
    } else {
      if (query.get('title')) {
        dispatch(setBooksByCategoryId({ category_id, page }))
        navigate(pathname)
      }
    }
  }

  const formatBooks = () => {
    const limit = 24
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const formatBooks = books.slice(startIndex, endIndex)
    return { formatBooks, totalPage: Math.ceil(books.length / limit) }
  }

  return (
    <div className="sjtct__categories section__padding"
    >
      <h1 className="sjtct__categories--title section--title">"{category_name}"</h1>
      <form
        className="sjtct__categories-search"
        onSubmit={handleSubmit}
      >
        <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} />
        <button type='submit' className="sjtct__categories-search--btn">
          <i className="fas fa-search"></i>
        </button>
      </form>
      {
        bookLoading ? <LoadingComponent />
        : formatBooks().formatBooks.length > 0 ? (
          <>
            <div className="sjtct__categories-items
              grid
              sm:grid-cols-3
              sm:gap-2
              md:grid-cols-4
              md:gap-3
              lg:grid-cols-6
              lg:gap-4"
            >
              {
                formatBooks().formatBooks.map(book => {
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
            {formatBooks().totalPage > 1 && (<Pagination total={formatBooks().totalPage} page={page} />)}
          </>
        )
        : (<EmptyData />)
      }
    </div>
  )
}

export default Categories