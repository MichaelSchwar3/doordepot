import React from "react";
import { connect } from "react-redux";
import { submitDoorListing } from "../../../actions/door_listing_actions";
import { yesNoSelectOptions } from "../../shared/door_helpers";
import Select from 'react-select';
import DatePicker from "react-datepicker";


class DoorListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRequired: new Date(),
      skidUp: false,
      deliver: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {

    const submit = async () => {
      const orderId = this.props.match.params.orderId;
      const doorListing = Object.assign({}, this.state, {
        orderId: orderId,
      });
      await this.props.submitDoorListing(doorListing);
      this.props.history.push(`/orders/${orderId}`);
    };
    submit();
  }

  handleDateChange(date) {
    this.setState({
      dateRequired: date
    });
  };

  update(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      });
    };
  }

  updateSelect(field) {
    return e => {
      return this.setState({
        [field]: e.value
      });
    };
  }
  componentDidMount() {}

  render() {
    const customStyles = {
      container: provided => ({
        ...provided,
        width: 300,
        cursor: "pointer"
      })
    };
    return (
      <div id="workout-form-flex-container">
        <div id="workout-form-container">
          <div id="workout-form-head">Create a door listing</div>
          <div id="workout-form-form">
            <form onSubmit={this.handleSubmit}>
              <label id="regular-input">
                <span>Date Required</span>
                <DatePicker
                  selected={this.state.dateRequired}
                  onChange={(date)=> this.handleDateChange(date)}
                />
              </label>
              <label id="regular-input">
                <span>Skid Up</span>
                <Select
                  styles={customStyles}
                  options={yesNoSelectOptions}
                  onChange={this.updateSelect("skidUp")}
                />
              </label>
              <label id="regular-input">
                <span>Deliver</span>
                <Select
                  styles={customStyles}
                  options={yesNoSelectOptions}
                  onChange={this.updateSelect("deliver")}
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
  listing: state.entities.doorListing
});

const mapDispatchToProps = dispatch => ({
  submitDoorListing: listing => dispatch(submitDoorListing(listing))
});

export default connect(mapStateToProps, mapDispatchToProps)(DoorListingForm);
