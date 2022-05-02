import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Cover } from '../../components'
import { SubCategories, DisplayBooks } from '../../sub_categories'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../../store/actions/category'

function Home() {
  const dispatch = useDispatch()
  const { loading: loadingCategory, categories } = useSelector(state => state.category)

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(setCategories())
  }, [dispatch])

  return (
    <div className="sjtct__home">
      <Cover />
      {!loadingCategory && (<SubCategories />)}
      {categories.length > 0 &&
        (categories.map(item => {
          return (
            <DisplayBooks key={item.id} categoryId={item.id} categoryName={item.name} />
          )
        }))
      }
    </div>
  )
}

export default Home