
import './App.css';
// import Feed from './components/Feed';
import Home from './components/Home';
import Nav from './components/Nav';
import Profil from './components/Profil';
// import Commentaires from '../src/components/Commentaires'
 import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 import SignUp from './components/SignUp';
 import Login from './components/Login';
import UseDataLayer from './AuthProvider';
import Modification from './components/Modification';
import Header from './components/Header';

function App() {
  const {user, setUser} = UseDataLayer();
//  setUser(null);


  
  return (
    <div className="App">
      {user ? (
        <div>
          <Router>
            <Switch>
              <Route exact path="/">
                <Nav />
                <Home />
              </Route>
              <Route path="/profil">
                <Nav />
                <Profil />
              </Route>
              <Route path="/modification">
                <Nav />
                <Modification />
              </Route>
              <Route path="/login">
                <Header/>
                <Login />
              </Route>
              <Route path="/signup">
                <Header/>
                <SignUp />
              </Route>
            </Switch>
          </Router>
          {/* <Nav />
          <Profil />
          <Home /> */}
        </div>
      ) : (
        <div>
          <Login />
          <SignUp />
        </div>
      )}
    </div>
  );
}

export default App;
