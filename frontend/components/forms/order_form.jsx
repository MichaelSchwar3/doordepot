import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { submitOrder } from '../../actions/order_actions'


class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poNumber: '',
      phoneNumber: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const submit = async () => {
      await this.props.submitOrder(this.state);
      this.props.history.push("/orders");
    }
    submit();
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      });
    };
  }
  componentDidMount() {

  }

  componentWillMount() {

  }

  render() {

    return (
      <div id="workout-form-flex-container">
        <div id="workout-form-container">
          <div id="workout-form-head">Create an order</div>
          <div id="workout-form-form">
            <form onSubmit={this.handleSubmit}>
              <label id="regular-input">
                <span>Order Number</span>
                <input
                  type="text"
                  value={this.state.poNumber}
                  onChange={this.update("poNumber")}
                />
              </label>
              <label id="regular-input">
                <span>Phone Number</span>
                <input
                  type="text"
                  value={this.state.phoneNumber}
                  onChange={this.update("phoneNumber")}
                />
              </label>
              <input id="workout-save-button" type="submit" value="SAVE" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  submitOrder: order => dispatch(submitOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);