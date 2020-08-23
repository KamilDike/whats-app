import React, {useEffect} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import { useStateValue } from './StateProvider'
import { CookiesProvider, useCookies } from 'react-cookie';
import { actionTypes } from './reducer';

function App() {
  const [cookies] = useCookies(['logged']);
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    console.log(cookies)
    if (cookies.displayName) {
      dispatch({
        type: actionTypes.SET_USER,
        user: cookies
      })
    }
  }, [])

  return (
    <CookiesProvider>
      <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="app__body">
        <Router>
            <Sidebar/>
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>
              <Route path="/">
                <Chat logout/>
              </Route>
            </Switch>
        </Router>
        </div>
      )}
      </div>
    </CookiesProvider>
  );
}

export default App;
