import React from "react";
import { withRouter } from "react-router";

import './product.css';

class Product extends React.Component {

  detailsProduct = () => {
    const { product : { id } , history } = this.props;
    history.push(`/product/${id}`)
  }

  render() {
    const { img, title } = this.props.product;
    return (
      <div className="product" onClick={this.detailsProduct}>
        <div className="product_poster">
          <img className="product_poster-img" src={`image/${img}`} alt='Photos' />
        </div>
        <div className="product_info">
            <span className="product_name">{ title }</span>
        </div>
      </div>
    )
  }
}

export default withRouter(Product);