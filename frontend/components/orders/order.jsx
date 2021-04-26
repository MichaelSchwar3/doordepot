import React from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { formatDate } from "../../util/date_util";
import { isEmpty, values } from 'lodash';
import { fetchOrder } from '../../actions/order_actions';
import { submitDoorListing } from "../../actions/door_listing_actions";
import { submitFrameListing } from "../../actions/frame_listing_actions";
import DoorListingRow from '../doorListings/door_listings_row';
import FrameListingRow from '../frameListings/frame_listings_row';
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
`;

const Header = styled.div`
  display: grid;
  grid-template-columns:repeat(11, 1fr)
`;

class Order extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.orderId);
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.match.params.orderId !== nextProps.match.params.orderId
    ) {
      this.props.fetchOrder(nextProps.match.params.orderId);
    }
  }

  addDoorPage() {

    const submit = async () => {
      await this.props.submitDoorListing(this.props.order.id);
      // this.props.history.push(`/orders/${orderId}`);
    };
    submit();
  }

  addFramePage() {

    const submit = async () => {
      await this.props.submitFrameListing(this.props.order.id);
      // this.props.history.push(`/orders/${orderId}`);
    };
    submit();
  }

  render() {
    if (!this.props.order) {return null}
    const { doorListings, order, doors, frameListings } = this.props;
    return (
      <div className="workout-show">
        <section id="workout-show-info">
          <div id="wsi-head">
            <div id="wsi-head-title">Order Number: {order.orderNumber}</div>
            <div id="wsi-head-body">
              
            </div>
            <div id="wsi-head-bottom">
              <div id="wsi-head-bottom-info">
                <span>Created at - {formatDate(order.createdAt)}</span>

                <span>Last Updated at - {formatDate(order.updatedAt)}</span>
              </div>
            </div>
            <div id="wsi-head-buttons">
              <button id="wsi-edit" onClick={() => this.addDoorPage()}>Add Door Line</button>
              <Link to={`/orders/${order.id}`}>
                <button id="wsi-edit" onClick={() => this.addFramePage()}>Add Frame Line</button>
              </Link>
            </div>
          </div>
        </section>
        <Section>
          <Header>
            {/* <div>Line Type</div>
            <div>Skid Up</div>
            <div>Deliver</div>
            <div>Created At</div>
            <div>Date Required</div>
            <div>LH</div>
            <div>RH</div>
            <div>Height</div>
            <div>Width</div>
            <div>Door Type</div>
            <div>Frame Type</div> */}
            <div>Door Pages</div>
          </Header>

          {doorListings.map( listing => (
            <DoorListingRow doorListing={listing} />
          ))}
        </Section>
        <Section>
          <Header>
            <div>Frame Pages</div>
          </Header>

          {frameListings.map( listing => (
            <FrameListingRow frameListing={listing} />
          ))}
        </Section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors,
  order: state.entities.orders[ownProps.match.params.orderId],
  doorListings: values(state.entities.doorListings),
  frameListings: values(state.entities.frameListings),
  doors: state.entities.doors
});

const mapDispatchToProps = dispatch => ({
  fetchOrder: (orderId) => dispatch(fetchOrder(orderId)),
  submitDoorListing: orderId => dispatch(submitDoorListing(orderId)),
  submitFrameListing: orderId => dispatch(submitFrameListing(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
