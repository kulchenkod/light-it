import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { compose } from 'redux';
 
import * as actions from '../../store/actions/actions';
import './signIn.css';

class SignIn extends React.Component {

    state = {
        username: '',
        password: ''
    }

    submit = event => {
        event.preventDefault();

        const { username, password } = this.state;
        const { registration, history} = this.props;

        registration(username, password);
        this.setState({
            username: '',
            password: ''
        })
        history.push('/')
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
            <div className="signIn">
                <h1 className="signIn_title">Registration Form</h1>
                <form onSubmit={this.submit} className="signIn_form">
                    <label className="signIn_label">
                        Username: 
                        <input 
                            required 
                            type="text"
                            name="username"
                            onChange={this.change}
                            value={this.state.username}
                        />
                    </label>
                    <label className="signIn_label">
                        Password: 
                        <input 
                            required
                            type="password"
                            name="password"
                            onChange={this.change}
                            value={this.state.password}
                        />
                    </label>
                    <button type='submit'>Registration</button>
                </form>
                <h3 className='signIn_isSignUp'>Already have an account? <Link to='/signup/'>SignUp</Link></h3>
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
        registration: (username,password) => dispatch(actions.registration(username,password)),
    }
}
  
export default compose (
    withRouter,
    connect(
        mapStateToProps,
        mapDispatcToProps
    )
)(SignIn)