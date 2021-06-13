/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Navbar } from './components';
import { Editor, Login, Main } from './views';
import './index.scss';
import { UserContextInterface } from './interfaces';
import { UserContext } from './contexts';

const App = () => {
  const [context, setContext] = useState<UserContextInterface>({ logged: false });

  useEffect(() => {
    if (Cookies.get('logged') !== undefined) {
      const fetchData = async (url : string) => {
        const res = await fetch(url, {
          credentials: 'include'
        });
        if (res.status === 401) {
          return { logged: false };
        }
        const body = await res.json();
        return (body?.user ? body : { logged: false });
      };

      fetchData('http://localhost:41960/api/profile')
        .then((newContext) => {
          setContext(newContext);
          if (!newContext.logged) Cookies.remove('logged');
        })
        .catch(() => {
          Cookies.remove('logged');
          setContext({ logged: false });
        });
    }
  }, []);

  useEffect(() => {
    if (context.logged) Cookies.set('logged', '1');
  }, [context]);

  return (
    <UserContext.Provider value={[context, setContext]}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/createPost">
            <Editor />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
