import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';
import "./header.css";

class Header extends React.Component {


    render() {
        const isLogin = localStorage.getItem('isLogin');
        const { logoutAcc } = this.props;
        return (
            <header className="header">
                <div className="header_section layout">
                    <Link className='header_home' to='/'>
                        <h1 className="header_title">Light IT</h1>
                    </Link>
                    { isLogin && <Link to='/' onClick={logoutAcc} className='header_logout' >LOGOUT</Link> }
                </div>
            </header>
        )
    }
  }

function mapStateToProps(store) {
    return {
        isLogin: store.isLogin
    };
}
  
function mapDispatcToProps(dispatch) {
    return {
        logoutAcc: () => dispatch(actions.logoutAcc())
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatcToProps
)(Header);
  