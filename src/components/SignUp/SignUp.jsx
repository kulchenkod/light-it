import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { compose } from 'redux';

import * as actions from '../../store/actions/actions';
import './signUp.css';

class SignUp extends React.Component {

    state = {
        username: '',
        password: ''
    }

    submit = event => {
        event.preventDefault();

        const { username, password } = this.state;
        const { authorization, history } = this.props;

        authorization(username, password)

        this.setState({
            username: '',
            password: ''
        })
    }

    change = event => {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        })
    }
    
    render() {
        const { isLogin, logoutAcc } = this.props;
        if(isLogin) {
            return (
                <div className="signIn_wrapper">
                    <Link to='/' onClick={logoutAcc} className='signIn_logout' >LOGOUT</Link>
                </div>
            )
        }
        return (
            <div className="signUp">
                <h1 className="signUp_title">Authorization Form</h1>
                <form onSubmit={this.submit} className="signUp_form">
                    <label className="signUp_label">
                        Username: 
                        <input 
                            required 
                            type="text"
                            name="username"
                            onChange={this.change}
                            value={this.state.username}
                        />
                    </label>
                    <label className="signUp_label">
                        Password: 
                        <input 
                            required
                            type="password"
                            name="password"
                            onChange={this.change}
                            value={this.state.password}
                        />
                    </label>
                    <button type='submit'>Authorization</button>
                </form>
                <h3 className='signUp_isSignIn'>Don't have an account yet? <Link to='/signin/'>SignIn</Link></h3>
            </div>
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
        logoutAcc: () => dispatch(actions.logoutAcc()),
        authorization: (username,password) => dispatch(actions.authorization(username,password)),
    }
}
  
export default compose (
    withRouter,
    connect(
        mapStateToProps,
        mapDispatcToProps
    )
)(SignUp)