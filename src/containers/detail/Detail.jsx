import React, { useEffect, useState } from "react";
import "./detail.scss";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBook, setBookFavorites } from "../../store/actions/book";
import { addToFavorites, deleteFromFavorites } from "../../store/actions/favorite";
import { Loading as LoadingComponent, EmptyData } from "../../components";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Detail() {
  const { category_id, book_id } = useParams();
  const dispatch = useDispatch();
  const { book, loading: bookLoading } = useSelector((state) => state.book);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(getBook({ category_id, book_id }));
  }, [category_id, book_id, dispatch]);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleActiveFav = (bookId) => {
    const isFavorite = !book.isFavorite
    if (book.isFavorite) {
      dispatch(deleteFromFavorites({ bookId }))
      dispatch(setBookFavorites({ isFavorite }))
    } else {
      const newBook = { ...book, category_id }
      dispatch(addToFavorites(newBook))
      dispatch(setBookFavorites({ isFavorite }))
    }
  }

  if (bookLoading) return <LoadingComponent />;
  if (!book) return <EmptyData />;
  return (
    <div className="sjtct__detail section__padding">
      <div className="sjtct__detail-content">
        <div className="sjtct__detail-content__cover">
          <img src={book.cover_url} alt="" />
        </div>
        <div className="sjtct__detail-content__desc">
          <div className="sjtct__detail-content__desc-header">
            <h1 className="sjtct__detail-content__desc--title">{book.title}</h1>
            <button
              className={`sjtct__detail-content__desc-btn-fav ${book.isFavorite ? 'fav-active' : ''}`}
              onClick={() => handleActiveFav(book.id)}
            >
              <i className="fas fa-star"></i>
            </button>
          </div>
          <div className="sjtct__detail-content__desc-authors">
            {book.authors.map((author, i) => {
              if (i !== book.authors.length - 1) {
                return (
                  <p key={i} className="sjtct__detail-content__desc-authors--author">
                    {author}, 
                  </p> 
                );
              } else {
                return (
                  <p key={i} className="sjtct__detail-content__desc-authors--author">
                    {author}
                  </p> 
                );
              }
            })}
          </div>
          <div className="sjtct__detail-content__desc-description">
            <h2>What's it about</h2>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
      <div className="sjtct__detail-section">
            <h2>What's Inside ?</h2>
            {book.sections.map((item, i) => {
              return (
                <Accordion
                  key={i}
                  expanded={expanded === `panel${i+1}`}
                  onChange={handleChange(`panel${i+1}`)}
                >
                  <AccordionSummary
                    className="sjtct__accordionSummary"
                    style={{ padding: '0 16px 0 10px', fontSize: '15px' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${i+1}bh-content`}
                    id={`panel${i+1}bh-header`}
                  >
                    <h3>{i+1}. {item.title}</h3>
                  </AccordionSummary>
                  <AccordionDetails style={{ background: '#dee5ff' }}>
                    <p>{item.content}</p>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
    </div>
  );
}

export default Detail;
