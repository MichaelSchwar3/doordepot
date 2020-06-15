import React from "react";
import { connect } from "react-redux";
import OrderIndexItem from "./order_index_item";
import { fetchOrders } from '../../actions/order_actions'
import { Link } from "react-router-dom";
import { isEmpty, values, reverse } from 'lodash';
import styled from "styled-components";

const Section = styled.section`
  width: 900px;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: 50px;
  grid-gap: 1em;
  background: #eee
  &:nth-child(odd) {
    background: #ddd
  }

  margin-left: 100px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

class OrderIndex extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    if(isEmpty(this.props.orders)) return null;
    const indexOrders = reverse(values(this.props.orders));
    return (
      <div className="workouts-index">
        <div id="workouts-create">
          <span>My Orders</span>
          <Link to="/orders/create/">
            <button id="workouts-create-workout">Create an order</button>
          </Link>
        </div>
        <Section>
          <Header>
            <div>
              Order Number
            </div>
            <div>
              Date Created
            </div>
          </Header>
          {indexOrders.map((order) => {
            return <OrderIndexItem order={order} key={`order-${order.id}`} />;
          })}
        </Section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  orders: state.entities.orders
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderIndex);
