/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Modal, Navbar } from './components';
import {
  Editor, Help, Login, Main, Post, Register
} from './views';
import './index.scss';
import { ModalInterface, UserContextInterface } from './interfaces';
import { UserContext } from './contexts';
import { BASE_URL } from './config';

const App = () => {
  const [context, setContext] = useState<UserContextInterface>({ logged: false });
  const [modal, setModal] = useState<ModalInterface>({
    show: false,
    handleClose: () => {
      setModal((oldModal) => ({ ...oldModal, show: false }));
    }
  });

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

      fetchData(`${BASE_URL}/api/profile`)
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
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/posts/:id">
            <Post />
          </Route>
          <Route path="/register">
            <Register setModal={setModal} />
          </Route>
        </Switch>
        <Modal
          show={modal.show}
          handleClose={modal.handleClose}
          title={modal.title}
        >
          {modal.children}
        </Modal>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
