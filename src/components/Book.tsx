import React, { useContext } from 'react';
import { AppContext, ContextType } from "../App";
import { NavLink } from "react-router-dom";
import { db } from '../firebase/FirebaseConfig';
import '../styles/Book.css';

interface IBook{
    bookTitle: string
    bookAuthor: string
    bookPublishedIn: string
    bookISBN: string
}

const Book: React.FC<IBook> = ({bookTitle, bookAuthor, bookPublishedIn, bookISBN}) => {

    const {setTitle, setAuthor, setPublishedIn, setISBN} = useContext(AppContext) as ContextType;

    const editBook = () => {
        setTitle(bookTitle)
        setAuthor(bookAuthor)
        setPublishedIn(bookPublishedIn)
        setISBN(bookISBN)
    }

    const deleteBook = () => {
        db.collection('books').doc(bookISBN).delete()
    }

    return (
        <div className="book">
            <div className="book__container">
                <h2 className="book__title">{bookTitle}</h2>
                <ul className="book__info info-book">
                    <li className="info-book__item"><span className="info-book__about">Author</span>: {bookAuthor}</li>
                    <li className="info-book__item"><span className="info-book__about">Published</span>: {bookPublishedIn}</li>
                    <li className="info-book__item"><span className="info-book__about">ISBN</span>: {bookISBN}</li>
                </ul>
                <div className="info-book__actions">
                    <NavLink to="edit"><button className="info-book--edit" onClick={editBook}>Edit</button></NavLink>
                    <button className="info-book--delete" onClick={deleteBook}>Delete book</button>
                </div>
               </div>
        </div>
    )
}

export default Book;
