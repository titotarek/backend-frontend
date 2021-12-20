import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

//pages
import Home from './pages/home/Home';
import AddQuestion from './pages/addQuestion/AddQuestion'
import NotFound from './pages/notFound/NotFound';
import Signup from './pages/signup/Signup';
import EditAnswer from './pages/editAnswer/EditAnswer'
import EditQuestion from './pages/editQuestion/EditQuestion';
import ShowQuestion from './pages/showQuestion/ShowQuestion';
import Login from './pages/login/Login';

//component
import Header from './component/header/Header.jsx';


//req.cookies.jwt

function App() {

  const [user, setUser] = useState(null);

  const token = document.cookie

  function getData(data) {
    setUser(data);
  }


  return (
    <Router>
      <Header data={user} />
      <div className="App">
        <Switch>
          {token &&
            <>
              <Route exact path="/add-question" component={AddQuestion} />
              <Route exact path="/edit-answer/:questionId/:id" component={EditAnswer} />
              <Route exact path="/edit-question/:id" component={EditQuestion} />
              <Route exact path="/" component={Home} />
              <Route exact path="/login" render={() => <Login getData={getData} />} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/question/:id" render={() => <ShowQuestion user={user} />} />
            </>
          }
          {!token &&
            <>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" render={() => <Login getData={getData} />} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/question/:id" render={() => <ShowQuestion user={user} />} />
              <Route exact path="/add-question" component={Login} />
              <Route exact path="/edit-answer/:questionId/:id" component={Login} />
              <Route exact path="/edit-question/:id" component={Login} />
            </>
          }
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
