import React from 'react';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/actions';
import Comments from '../Comments/Comments';
import './productDetails.css';

class ProductDetails extends React.Component {

    state = {
        rating: 0,
        commentText: '',
        login: true
    }

    async componentDidMount() {
        const { match: { params: {id} } , getDetailsProduct, getComments } = this.props;
        await getDetailsProduct(id);
        await getComments(id);
    }

    renderComments = (comment) => {
        return (
            <Comments
                key={`comments-key${comment.id}`}
                comment={comment}
            />
        )
    }

    changeRating = (newRating) => {
      this.setState({
        rating: newRating
      })
    }

    submit = event => {
        event.preventDefault();
        
        const { isLogin } = this.props;
        if(isLogin) {
            this.setState({
                login: true
            })
            this.sendForm();
            return
        } 
        this.setState({
            login: false
        })
    }

    sendForm = async () => {
        const { match: { params : { id } }, sendComment, getComments } = this.props;
        const { rating, commentText } = this.state;

        await sendComment(id, rating, commentText);
        await getComments(id);

        this.setState({
            commentText: '',
            rating: 0
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
        if(!this.props.currentProduct) {
            return <h1>Sorry, this product not found!</h1>
        }
        const { currentProduct: {img, title, text}, commentList } = this.props;
        const { login } = this.state;
        return (
            <div className="productDetails">
                <div className="productDetails_main">
                    <div className="productDetails_main-menu">
                        <div className="productDetails_poster">
                            <img src={`../image/${img}`} alt="" className="productDetails_poster-img"/>
                        </div>
                    </div>
                    <div className="productDetails_overview">
                        <p className="productDetails_overview-title">Title: {title}</p>
                        <h2 className="productDetails_overview-text">Text product: {text}</h2>
                        <form className='productDetails_form' onSubmit={this.submit}>
                            <StarRatings
                                rating={this.state.rating}
                                starRatedColor="orange"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                                starDimension="25px"
                                starSpacing="0px"
                            />
                            <textarea 
                                required 
                                placeholder='Type your comment' 
                                className='productDetails_input' 
                                name="commentText" 
                                onChange={this.change} 
                                value={this.state.commentText} 
                                cols="50" 
                                rows="10">
                            </textarea>
                            <button className='productDetails_button' type='submit'>Submit</button>
                        </form>
                        {
                        login ? '' :  
                        <div className='productDetails_isLogin'>
                            <h3>Sorry, but you need first auth <Link to='/signup/'>SignUp</Link></h3>
                        </div>
                        }
                        {commentList.map(this.renderComments)}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        currentProduct: store.currentProduct,
        commentList: store.commentList,
        isLogin: store.isLogin
    };
  }
  
function mapDispatcToProps(dispatch) {
    return {
        getDetailsProduct: (id) => dispatch(actions.getDetailsProduct(id)),
        getComments: (id) => dispatch(actions.getComments(id)),
        sendComment: (id,rate,text) => dispatch(actions.sendComment(id,rate,text))
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatcToProps
)(ProductDetails);