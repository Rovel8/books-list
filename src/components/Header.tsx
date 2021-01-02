import logoImage from "../assets/book_noun_001_01679.jpg";
import { NavLink } from "react-router-dom";
import '../styles/Header.css';
import { auth } from "../firebase/FirebaseConfig";

import React from 'react'

const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo logo-header">
                    <div className="logo-header__image">
                        <img src={logoImage} alt=""/>
                    </div>
                    <NavLink className="logo-header__link" to="/">
                        <span className="logo-header__title">Books</span>
                    </NavLink>
                </div>
                <nav className="header__nav nav-header">
                    <ul className="nav-header__list">
                        <li className="nav-header__item"><NavLink to="/" className="nav-header__link">Home</NavLink></li>
                        <li className="nav-header__item"><NavLink onClick={() => auth.signOut()} to="/login" className="nav-header__link">Sign Out</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header


