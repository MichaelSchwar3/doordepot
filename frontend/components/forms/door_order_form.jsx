import { connect } from 'react-redux';
import { submitDoorOrder } from '../../actions/door_order_actions';
import React, { useState } from 'react';
import Select from 'react-select';
import { processForSelect, booleanSelectOptions } from '../shared/helpers';
import { fetchDoorOrderOptions } from '../../actions/door_order_actions';
import { Input } from '../shared/styled/inputs';

class DoorOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lhTags: '',
      rhTags: '',
      lhQuantity: '',
      rhQuantity: '',
      so: false,
      frameType: '',
      widthFeet: '',
      widthInches: '',
      heightFeet: '',
      heightInches: '',
      undercut: '',
      channelTop: '',
      channelBottom: '',
      type: '',
      construction: '',
      hinges: '',
      lockset: '',
      prepOnly: false,
      seamless: false,
      phoneNumber: '',
      poNumber: '',
      referenceNumber: '',
      dateRequired: '',
      fetching: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const fetchFormOptions = async () => {
      await this.props.fetchFormOptions();
      this.setState({fetching: false})
    }
    fetchFormOptions();
  }

  handleSubmit(e) {
    e.preventDefault();
    const order = Object.assign({}, this.state);
    debugger
    return this.props.submitDoorOrder(order);
  }

  update(field) {
    return e => {
      return this.setState({
        [field]: e.currentTarget.value
      })
    };
  }

  updateSelect(field) {
    return e => {
      return this.setState({
        [field]: e.value
      });
    };
  }
  renderErrors() {
    if (this.props.errors.session) {
      return (
        <ul>
          {this.props.errors.session.map((error, idx) => {
            return <li key={`error-${idx}`}>
              {error}
            </li>;
          })}
        </ul>
      );
    }
  }

  doorListingInputs() {
      return (
        <>
          <label>Phone Number<br />
            <Input type="text"
              value={this.state.phoneNumber}
              onChange={this.update('phoneNumber')}
              className="door-listing-input"
              placeholder="(555)-555-5555"
            />
          </label>
          <br />
          <label>PO Number<br />
            <Input type="text"
              value={this.state.poNumber}
              onChange={this.update('poNumber')}
              className="door-listing-input"
              placeholder="803-204"
            />
          </label>
          <br />
        </>
      )
  }

  doorInputs() {
    const { formOptions} = this.props

    const customStyles = {
      container: provided => ({
        ...provided,
        width: 300,
        cursor: 'pointer'
      })
    };
    return (
      <>
        <label>
          LH Tags
          <br />
          <Input
            type="text"
            value={this.state.lhTags}
            onChange={this.update("lhTags")}
            className="door-listing-input"
          />
        </label>
        <br />
        <label>
          RH Tags
          <br />
          <Input
            type="text"
            value={this.state.rhTags}
            onChange={this.update("rhTags")}
            className="door-listing-input"
          />
        </label>
        <br />
        <label>
          LH Quantitys
          <br />
          <Input
            type="text"
            value={this.state.lhQuantity}
            onChange={this.update("lhQuantity")}
            className="door-listing-input"
          />
        </label>
        <br />
        <label>
          RH Quantity
          <br />
          <Input
            type="text"
            value={this.state.rhQuantity}
            onChange={this.update("rhQuantity")}
            className="door-listing-input"
          />
        </label>
        <br />
        <label>
          S/O
          <br />
          <Select
            styles={customStyles}
            options={booleanSelectOptions}
            onChange={this.updateSelect("so")}
          />
        </label>
        <br />
        <label>
          Frame Type
          <br />
          <Select
            styles={customStyles}
            options={processForSelect(formOptions.frame_types)}
            onChange={this.updateSelect("frameType")}
          />
        </label>
        <br />
        <label>
          Width - Feet
          <br />
          <Input
            type="text"
            value={this.state.widthFeet}
            onChange={this.update("widthFeet")}
            className="door-listing-input"
          />
        </label>
        <br />
        <label>
          Width - Inches
          <br />
          <Input
            type="text"
            value={this.state.widthInches}
            onChange={this.update("widthInches")}
            className="door-listing-input"
          />
        </label>
        <br />
        <br />
        <label>
          Height - Feet
          <br />
          <Input
            type="text"
            value={this.state.heightFeet}
            onChange={this.update("heightFeet")}
            className="door-listing-input"
          />
        </label>
        <br />
        <label>
          Height - Inches
          <br />
          <Input
            type="text"
            value={this.state.heightInches}
            onChange={this.update("heightInches")}
            className="door-listing-input"
          />
        </label>
        <br />
        <label>
          Undercut
          <br />
          <Input
            type="text"
            value={this.state.undercut}
            onChange={this.update("undercut")}
            className="door-listing-input"
          />
        </label>
        <br />
        <label>
          Channel Top
          <br />
          <Select
            styles={customStyles}
            options={processForSelect(formOptions.channels)}
            onChange={this.updateSelect("channelTop")}
          />
        </label>
        <br />
        <label>
          Channel Bottom
          <br />
          <Select
            styles={customStyles}
            options={processForSelect(formOptions.channels)}
            onChange={this.updateSelect("channelBottom")}
          />
        </label>
        <br />
        <label>
          Door Type
          <br />
          <Select
            styles={customStyles}
            options={processForSelect(formOptions.types)}
            onChange={this.updateSelect("type")}
          />
        </label>
        <br />
        <label>
          Door Construction
          <br />
          <Select
            styles={customStyles}
            options={processForSelect(formOptions.constructions)}
            onChange={this.updateSelect("construction")}
          />
        </label>
        <br />
        <label>
          Hinges
          <br />
          <Select
            styles={customStyles}
            options={processForSelect(formOptions.hinges)}
            onChange={this.updateSelect("hinges")}
          />
        </label>
        <br />
        <label>
          Lockset
          <br />
          <Select
            styles={customStyles}
            options={processForSelect(formOptions.locksets)}
            onChange={this.updateSelect("lockset")}
          />
        </label>
        <br />
        <label>
          Prep Only
          <br />
          <Select
            styles={customStyles}
            options={booleanSelectOptions}
            onChange={this.updateSelect("prepOnly")}
          />
        </label>
        <br />
        <label>
          Seamless
          <br />
          <Select
            styles={customStyles}
            options={booleanSelectOptions}
            onChange={this.updateSelect("seamless")}
          />
        </label>
        <br />

        <button onClick={this.handleSubmit}>Submit order</button>
      </>
    );
  }


  render() {
    if(this.state.fetching) return <h1>Fetching</h1>;
    return (
      <div className="door-order-form-container">
          {this.doorInputs()}
          <span id="door-order-form-errors">{this.renderErrors()}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  formOptions: state.entities.forms.doorOrderForm,
});

const mapDispatchToProps = dispatch => ({
  submitDoorOrder: order => dispatch(submitDoorOrder(order)),
  fetchFormOptions: () => dispatch(fetchDoorOrderOptions())
});

export default connect(mapStateToProps, mapDispatchToProps)(DoorOrderForm);