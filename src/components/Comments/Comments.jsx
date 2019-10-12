import React from 'react';

import './comments.css'

class Comments extends React.Component {

    render() {
        const { created_by: { username }, created_at, rate, text } = this.props.comment;
        return (
            <div className='comments'>
                <div className="comments_header">
                    <p className="comments_user">User: { username }</p>
                    <p className="comments_data">Data: { created_at }</p>
                </div>
                <div className="comments_main">
                    <p className="comments_text">Comment: { text }</p>
                    <p className="rate">Rate: { rate }</p>
                </div>
            </div>
        )
    }
}

export default Comments;