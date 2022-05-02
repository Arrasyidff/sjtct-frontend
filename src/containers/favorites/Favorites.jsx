import React, { useEffect } from 'react'
import './favorites.scss'
import { useLocation } from 'react-router-dom';
import { useSelector} from 'react-redux'
import { Book, EmptyData } from '../../components';

function Favorites() {
  const { pathname } = useLocation();
  const { favorites } = useSelector(state => state.favorite)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const items = () => {
    return (
      <div className="sjtct__favorites-items 
        grid
        sm:grid-cols-3
        sm:gap-2
        md:grid-cols-4
        sm:gap-3
        lg:grid-cols-6
        sm:gap-4"
      >
        {
          favorites.map(item => {
            return (
              <Book
                key={item.id}
                id={item.id}
                title={item.title}
                desc={item.description}
                category_id={item.category_id}
                cover={item.cover_url}
              />
            )
          })
        }
      </div>
    )
  }

  return (
    <div className="sjtct__favorites section__padding">
      <h1 className="sjtct__favorites--title section--title">Favorites</h1>
      {
        favorites.length > 0 ? items() : (<EmptyData />)
      }
      
    </div>
  )
}

export default Favorites