import React, { useState, useLayoutEffect } from 'react';
import "./styles/App.css";
import { Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import { auth } from './firebase/FirebaseConfig';
import Edit from './components/Edit';
import { Spin } from 'antd';


export type ContextType = {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  title: string
  setTitle: (value: string) => void
  author: string
  setAuthor: (value: string) => void
  publishedIn: string
  setPublishedIn: (value?: string) => void
  ISBN: string
  setISBN: (value: string) => void
}

export const AppContext = React.createContext({});

const App: React.FC<{}> = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [publishedIn, setPublishedIn] = useState<string>();
  const [ISBN, setISBN] = useState<string>('');
  const [initialized, setInitialized] = useState<boolean>(false);

  useLayoutEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setInitialized(true)
      }else{
        setIsLoggedIn(false);
        setInitialized(true);
      }
    })
  }, [isLoggedIn])

  return (
    <AppContext.Provider value={{isLoggedIn, setIsLoggedIn,
     title, setTitle,
     author, setAuthor,
     publishedIn, setPublishedIn,
     ISBN, setISBN}}>
        {
          initialized ?  <div className="app">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/edit">
              <Edit />  
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </div> : <Spin size="large" />
        }
   
    </AppContext.Provider>
  );
}

export default App;
