import * as action from "../actions/actions";

const initialState = {
    productList: [],
    currentProduct: {},
    commentList: [],
    token: '',
    isLogin: localStorage.getItem('isLogin') || false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_PRODUCTS_SUCCESS':
            return {
                ...state,
                productList: action.payload.data
            };
        case 'GET_DETAILS_PRODUCT_SUCCESS':
            return {
                ...state,
                currentProduct: action.payload.data
            };
        case 'GET_COMMENTS_SUCCESS':
            return {
                ...state,
                commentList: action.payload.data.reverse()
            };
        case 'SEND_COMMENT_SUCCESS':
            return {
                ...state
            }
        case 'REGISTRATION_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                isLogin: action.payload.successReg
            }
        case 'GET_AUTH_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                isLogin: action.payload.successAuth
            }
        case 'LOGOUT':
            return {
                ...state,
                isLogin: action.payload.success
            }
        default: 
            return state;
    }
}

export default reducer