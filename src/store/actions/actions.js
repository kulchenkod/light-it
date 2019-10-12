import axios from "axios";

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

export const GET_DETAILS_PRODUCT = 'GET_DETAILS_PRODUCT';
export const GET_DETAILS_PRODUCT_SUCCESS = 'GET_DETAILS_PRODUCT_SUCCESS';
export const GET_DETAILS_PRODUCT_ERROR = 'GET_DETAILS_PRODUCT_ERROR';

export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';

export const SEND_COMMENT = 'SEND_COMMENT';
export const SEND_COMMENT_SUCCESS = 'SEND_COMMENT_SUCCESS';
export const SEND_COMMENT_ERROR = 'SEND_COMMENT_ERROR';

export const GET_AUTH = 'GET_AUTH';
export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS';
export const GET_AUTH_ERROR = 'GET_AUTH_ERROR';

export const REGISTRATION = 'REGISTRATION';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

export const  LOGOUT = 'LOGOUT';

export  const logoutAcc = () => dispatch =>  {
    localStorage.removeItem('token');
    localStorage.removeItem('isLogin');
    dispatch({
        type: LOGOUT,
        payload: {
            success: false
        }
    })
    alert('You are signed out!');
    window.location = '/'
}

export const getProducts = () => async dispatch => {
    dispatch({
        type: GET_PRODUCTS
    });
    try {
        const { data } = await axios.get("/api/products/");
        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: {
                data: data
            }
        })
    } catch(e) {
        dispatch({
            type: GET_DETAILS_PRODUCT_ERROR,
            payload: {
                error: e
            }
        })
        console.log(e, 'Error');
    }
}

export const getDetailsProduct = (id) => async dispatch => {
    dispatch({
        type: GET_DETAILS_PRODUCT
    });
    try {
        const { data } = await axios.get("/api/products/");
        const currentProduct = data.find(product => {
           return product.id === +id
        })
        dispatch({
            type: GET_DETAILS_PRODUCT_SUCCESS,
            payload: {
                data: currentProduct
            }
        })
    } catch(e) {
        dispatch({
            type: GET_PRODUCTS_ERROR,
            payload: {
                error: e
            }
        })
        console.log(e, 'Error');
    }
}

export const getComments = (id) => async dispatch => {
    dispatch({
        type: GET_COMMENTS
    });
    try {
        const { data } = await axios.get(`/api/reviews/${id}`);
        dispatch({
            type: GET_COMMENTS_SUCCESS,
            payload: {
                data: data
            }
        })
    } catch(e) {
        dispatch({
            type: GET_COMMENTS_ERROR,
            payload: {
                error: e
            }
        })
        console.log(e, 'Error');
    }
}

export const sendComment = (id,rate,text) => async dispatch => {
    dispatch({
        type: SEND_COMMENT
    });
    try {
        const { data } = await axios(`/api/reviews/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            data: JSON.stringify({
                "rate": rate,
                "text": text
            })
        });
        dispatch({
            type: SEND_COMMENT_SUCCESS,
            payload: {
                data: data
            }
        })
        console.log('data ->',data)
    } catch(e) {
        dispatch({
            type: SEND_COMMENT_ERROR,
            payload: {
                isLogin: false
            }
        })
        console.log(e, 'Error');
    }
}

export const registration = (username,password) => async dispatch => {
    dispatch({
        type: REGISTRATION
    });
    try {
        const { data } = await axios(`/api/register/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json"
            },
            data: JSON.stringify({
                "username": username,
                "password": password
            })
        });
        if(data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('isLogin', data.success);
            alert(`Hello ${username}, you are registered`);
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: {
                    token: data.token,
                    successReg: data.success
                }
            })
            return
        }
        alert(data.message)
    } catch(e) {
        dispatch({
            type: REGISTRATION_ERROR,
            payload: {
                error: e
            }
        })
        console.log(e, 'Error');
    }
}

export const authorization = (username,password) => async dispatch => {
    dispatch({
        type: GET_AUTH
    });
    try {
        const { data } = await axios(`/api/login/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json"
            },
            data: JSON.stringify({
                "username": username,
                "password": password
            })
        });
        if(data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('isLogin', data.success);
            alert(`Hello ${username}, you are authorized`);
            dispatch({
                type: GET_AUTH_SUCCESS,
                payload: {
                    token: data.token,
                    successAuth: data.success
                }
            })
            return
        }
        alert(data.message)
    } catch(e) {
        dispatch({
            type: GET_AUTH_ERROR,
            payload: {
                error: e
            }
        })
        console.log(e, 'Error');
    }
}