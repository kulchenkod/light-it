import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import ProductDetails from './components/ProductDetails/ProductDetails';
import SignIn from "./components/SignIn/SignIn";
import SignUp from './components/SignUp/SignUp';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Header />
          <Route exact path='/' component={Main} />
          <Route path='/product/:id' component={ProductDetails} />
          <Route path='/signin/' component={SignIn} />
          <Route path='/signup/' component={SignUp} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;