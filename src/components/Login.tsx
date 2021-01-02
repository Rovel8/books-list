import React, { useContext } from 'react';
import { Formik, Form, Field } from "formik";
import { AppContext, ContextType } from "../App";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase/FirebaseConfig";
import '../styles/Login.css';

interface IFormValues {
    email: string
    password: string
}

enum statusCode {
    notFound = "auth/user-not-found",
    wrongPassword = "auth/wrong-password",
}

const Login: React.FC<{}> = () => {

    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext) as  ContextType;

    const initialValues: IFormValues = {
        email: "",
        password: ""
    }

    const onSubmit = async ({email, password}: IFormValues) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setIsLoggedIn(true);
        } catch (error) {
            if(error.code === statusCode.notFound){
                await auth.createUserWithEmailAndPassword(email, password);
                setIsLoggedIn(true);
            }else if(error.code === statusCode.wrongPassword){
                console.log("Wrong email or password")
            }
        }
        
    }

    if(isLoggedIn){
        return <Redirect to="/" />
    }


    return (
        <div className="login">
            <div className="login__container">
                <h1 className="login__title">Authorization</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form className="login__form form-login">
                        <Field className="form-login__field" placeholder="Email" id="email" name="email" type="email" />
                        <Field className="form-login__field" placeholder="Password" id="password" name="password" type="password" />
                        <button className="form-login__button" type="submit">Sign In or Sign Up</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Login;
