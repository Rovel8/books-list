import React, { useContext, useEffect } from 'react'
import Header from './Header'
import { AppContext, ContextType } from "../App";
import { Redirect, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { db } from '../firebase/FirebaseConfig';
import * as yup from 'yup';
import '../styles/Edit.css';
import TextError from './TextError';


const Edit: React.FC<{}> = () => {

    const {isLoggedIn, title, setTitle, author, setAuthor, publishedIn, setPublishedIn, ISBN, setISBN} = useContext(AppContext) as ContextType;
    const history = useHistory();

    interface IEditBook{
        title: string
        author: string
        publishedIn: string
        ISBN: string
    }

    const initialValues: IEditBook = {
        title,
        author,
        publishedIn,
        ISBN
    }

    const validationSchema = yup.object({
        title: yup.string().required("Enter book title"),
        author: yup.string().required("Enter author name"),
        publishedIn: yup.string().required("Enter publisher year").max(4, 'Wrong year'),
        ISBN: yup.string().required("Enter ISBN number")
        .min(10, 'Too Short ISBN number').max(10, 'Too Long ISBN number')
    })

    const setEmptyFields = () => {
        setTitle('');
        setAuthor('');
        setPublishedIn('');
        setISBN('');
    }

    const onSubmit = ({title, author, publishedIn, ISBN}: IEditBook, onSubmitProps: FormikHelpers<IEditBook>) => {
            db.collection('books').doc(ISBN).set({
                title,
                author,
                publishedIn,
                ISBN
            }, {merge: true});
            history.push('/');
            setEmptyFields(); 
            onSubmitProps.resetForm();
    }

    useEffect(() => {
        return setEmptyFields();
     })

    if(!isLoggedIn){
        return <Redirect to="/login" />
    }

    return (
        <div className="edit">
            <Header />
            <div className="edit__container">
                <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
                    <Form className="edit__form form-edit">
                        <div className="form-edit__field">
                            <Field className="form-edit__input" id="title" name="title" placeholder="Title" type="text" />
                            <ErrorMessage component={TextError} name="title" />
                        </div>
                        <div className="form-edit__field">
                            <Field className="form-edit__input" id="author" name="author" placeholder="Author" type="text" />
                            <ErrorMessage component={TextError} name="author" />
                        </div>
                        <div className="form-edit__field">
                            <Field className="form-edit__input" id="publishedIn" name="publishedIn" placeholder="Published in" type="text" />
                            <ErrorMessage component={TextError} name="publishedIn" />
                        </div>
                        <div className="form-edit__field">
                            <Field className="form-edit__input" id="ISBN" name="ISBN" placeholder="ISBN-10" type="text" />
                            <ErrorMessage component={TextError} name="ISBN" />
                        </div>
                        <button className="form-edit__button" type="submit">Confirm</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Edit;
