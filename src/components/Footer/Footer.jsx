import React from "react";
import { Link } from "react-router-dom";

import "./footer.css"

class Footer extends React.Component {
    render() {
      return (
        <footer className="footer">
          <div className="footer_section layout">
            <div className="footer_nav">
              <h1 className="title footer_title">Light IT</h1>
              <nav className="footer_nav-list">
                <Link to="/" className="footer_nav-item">Home</Link>
                <Link to="/signin/" className="footer_nav-item">SignIn</Link>
                <Link to="/signup/" className="footer_nav-item">SignUp</Link>
              </nav>
            </div>
            <div className="footer_rights">
              <span className="footer_rights-text">Kulchenko Dmitriy. All rights reserved.</span>
              <div className="footer_social">
                <a href="https://www.facebook.com/dimakulchenko" className="footer_social-link"><i className="fab fa-facebook"></i></a> 
                <a href="https://github.com/kulchenkod?tab=repositories" className="footer_social-link"><i className="fab fa-github"></i></a> 
                <a href="https://www.linkedin.com/in/dmitriy-kulchenko" className="footer_social-link"><i className="fab fa-linkedin"></i></a> 
              </div>
            </div>
          </div>
      </footer>
      )
    }
  }
export default Footer