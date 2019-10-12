import React from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/actions";
import Product from "../Product/Product";
import "./main.css";

class Main extends React.Component {

  async componentDidMount() {
    const { getProducts } = this.props;
    await getProducts(); 
  }

  renderProducts = (item,i) => {
    return (
      <Product 
        key={`productKey-${item.id}`}
        product={item}
        index={i}
      />
    )
  }

  render() {
    const { productList } = this.props;
    return (
      <div className="main layout">
        { productList.map(this.renderProducts) }
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    productList: store.productList
  };
}

function mapDispatcToProps(dispatch) {
  return {
    getProducts: () => dispatch(actions.getProducts()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatcToProps
)(Main);



