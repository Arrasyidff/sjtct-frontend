import React, { useEffect } from 'react'
import './displayBooks.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import { Book } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBooksByCategories } from '../../store/actions/book'

function DisplayBooks({categoryId, categoryName}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { booksByCategories } = useSelector(state => state.book)

  useEffect(() => {
    dispatch(setBooksByCategories({categoryId}))
  }, [dispatch, categoryId])

  const formatBooks = () => {
    let books = []
    if(booksByCategories.length > 0) {
      booksByCategories.forEach(item => {
        if (item.categoryId === categoryId) {
          books = item.books
        }
      })
    }
    return books
  }

  if (formatBooks().length === 0) return ''

  return (
    <div className="sjtct__display-books section__padding">
      <h3 className="sjtct__display-books--title section--title">{categoryName}</h3>
      <Swiper
        centeredSlides={false}
        spaceBetween={0}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          280: {
            width: 280,
            slidesPerView: 3
          },
          768: {
            width: 768,
            slidesPerView: 5
          },
          1024: {
            width: 1024,
            slidesPerView: 6
          }
        }}
      >
        {
          formatBooks().map(item => {
            return (
              <SwiperSlide key={item.id}>
                <Book id={item.id}
                  category_id={item.category_id}
                  title={item.title}
                  desc={item.description}
                  cover={item.cover_url}
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
      <button
        className='sjtct__display-books--button-see-more'
        onClick={() => {navigate(`/categories/${categoryId}/${categoryName}`)}}
      >
        see more
      </button>
    </div>
  )
}

export default DisplayBooks