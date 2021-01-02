import React, { useContext, useState, useEffect } from 'react'
import Header from './Header'
import { AppContext, ContextType } from "../App";
import { Redirect, useHistory } from "react-router-dom";
import { db } from '../firebase/FirebaseConfig';
import '../styles/Home.css';
import firebase from 'firebase';
import Book from './Book';
import { PlusOutlined } from "@ant-design/icons";

const Home: React.FC<{}> = () => {

    const {isLoggedIn} = useContext(AppContext) as ContextType;
    const [bookList, setBooksList] = useState<Array<firebase.firestore.DocumentData>>([]);

    const history = useHistory();

    useEffect(() => {
       db.collection('books').onSnapshot(snapshot => {
           const books = snapshot.docs.map(doc => doc.data());
           setBooksList(books);
       })
    }, [])

    const addBook = () => {
        history.push('/edit');
    }

    if(!isLoggedIn){
        return <Redirect to="/login" />
    }

    return (
        <>
            <Header />
            <main className="home">
                <div className="home__header">
                    <h1 className="home__title">Books list</h1>
                    <button onClick={addBook} className="home__add-button">Add book <PlusOutlined style={{fontSize: '15px', marginLeft: '5px'}} /></button>
                </div>
                <div className="home__body">
                    {
                        bookList.map(book => (
                            <Book key={book.ISBN} bookAuthor={book.author} bookTitle={book.title} 
                            bookPublishedIn={book.publishedIn} bookISBN={book.ISBN} />
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export default Home
