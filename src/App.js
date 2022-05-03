import { Provider } from 'react-redux'
import store from './store/reducers'
import { Navbar } from './components'
import { Home, Categories, Favorites, Detail, NotFound } from './containers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/categories/:category_id/:category_name/' element={<Categories />}></Route>
            <Route path='/favorites' element={<Favorites />}></Route>
            <Route path='/book/:category_id/:book_id' element={<Detail />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
