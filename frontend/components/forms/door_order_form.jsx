import { connect } from 'react-redux';
import { submitDoorOrder } from '../../actions/door_order_actions';
import React from 'react';
import Select from 'react-select';
import { processForSelect, booleanSelectOptions, doorHingeHelper, customFixedStyles, customStyles} from '../shared/helpers';
import { fetchDoorOrderOptions } from '../../actions/door_order_actions';
import { Input } from '../shared/styled/inputs';
import { Container } from '../shared/styled/container';
import { find } from 'lodash';
import styled from 'styled-components';

const DoorImage = styled.img`
  position: relative;
  width: 350px;
`;

const HingeInput = styled.input`
  position: absolute;
  top: ${props => props.top};
  left: 293px;
  width: 75px;
  height: 25px;
  border: 1px solid lightgray;
  color: black;
  padding: 10px;
`;

const PreviewContainer = styled.div`
  position: fixed;
`;

const FixedLabel = styled.label`
  margin-left: 70px;
`;

const SelectContainer = styled.div`
  height: 45px;
`;



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
      hingeSize: '',
      firstHinge: '',
      secondHinge: '',
      thirdHinge: '',
      fourthHinge: '',
      hingeBackset: '',
      hingeOverRide: false,
      fetching: true,
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

  componentDidUpdate(prevProps, prevState) {
    if(this.shouldHingeLocationsChange(prevState, this.state)){
      this.calculateHinges()
    }
    if (prevState.frameType !== this.state.frameType){
      this.calculateHingeBackset()
    }
  }

  shouldHingeLocationsChange(prevState, newState) {
    if(newState.hingeOverRide === true) { return false }
    if(newState.hingeOverRide === false && prevState.hingeOverRide == true) { return true }
    if(prevState.lhQuantity !== newState.lhQuantity) { return true }
    if(prevState.rhQuantity !== newState.rhQuantity) { return true }
    if(prevState.heightFeet !== newState.heightFeet) { return true }
    if(prevState.heightInches !== newState.heightInches) { return true }
    if(prevState.widthFeet !== newState.widthFeet) { return true }
    if(prevState.widthInches !== newState.widthInches) { return true }
    if(prevState.hingeSize !== newState.hingeSize) { return true }
    return false
  }

  handleSubmit(e) {
    e.preventDefault();
    const order = Object.assign({}, this.state);
    return this.props.submitDoorOrder(order);
  }

  update(field) {
    return e => {
      return this.setState({
        [field]: e.currentTarget.value
      })
    };
  }

  calculateHinges() {
    const height = this.height()
    const doors = this.state.lhQuantity + this.state.rhQuantity
    const firstHinge = doorHingeHelper(1, this.state.hingeSize, height, doors)
    const secondHinge = doorHingeHelper(2, this.state.hingeSize, height, doors)
    const thirdHinge = doorHingeHelper(3, this.state.hingeSize, height, doors)
    const fourthHinge = doorHingeHelper(4, this.state.hingeSize, height, doors)
    this.setState({firstHinge: firstHinge, secondHinge: secondHinge, thirdHinge: thirdHinge, fourthHinge: fourthHinge })
  }

  calculateHingeBackset() {
    console.log("here")
    if(this.state.frameType === 'A/L') { return this.setState({ hingeBackset: 'A/L Hinge (3/16)'})}
    this.setState({ hingeBackset: 'Standard (1/16)' })
  }

  height() {
    const inches = this.state.heightInches ? parseFloat(this.state.heightInches) : 0
    return parseFloat(this.state.heightFeet) * 12 + inches
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

  doorInputs() {
    const { formOptions} = this.props
    console.log(processForSelect(formOptions.hinge_backsets))

    return (
      <>
      <Container>
        <section>
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
              value={find(booleanSelectOptions, (obj) => obj.value === this.state.so)}
              onChange={this.updateSelect("so")}
              isSearchable={false}
            />
          </label>
          <br />
          <label>
            Frame Type
            <br />
            <Select
              styles={customStyles}
              options={processForSelect(formOptions.frame_types)}
              value={find(processForSelect(formOptions.frame_types), (obj) => obj.value === this.state.frameType)}
              onChange={this.updateSelect("frameType")}
              isSearchable={false}
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
              value={find(processForSelect(formOptions.channels), (obj) => obj.value === this.state.channelTop)}
              onChange={this.updateSelect("channelTop")}
              isSearchable={false}
            />
          </label>
          <br />
          <label>
            Channel Bottom
            <br />
            <Select
              styles={customStyles}
              options={processForSelect(formOptions.channels)}
              value={find(processForSelect(formOptions.channels), (obj) => obj.value === this.state.channelBottom)}
              onChange={this.updateSelect("channelBottom")}
              isSearchable={false}
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
              isSearchable={false}
            />
          </label>
          <br />
          <label>
            Door Construction
            <br />
            <Select
              styles={customStyles}
              options={processForSelect(formOptions.constructions)}
              value={find(processForSelect(formOptions.constructions), (obj) => obj.value === this.state.construction)}
              onChange={this.updateSelect("construction")}
              isSearchable={false}
            />
          </label>
          <br />
          <label>
            Hinges
            <br />
            <Select
              styles={customStyles}
              options={processForSelect(formOptions.hinges)}
              value={find(processForSelect(formOptions.hinges), (obj) => obj.value === this.state.hinges)}
              onChange={this.updateSelect("hinges")}
              isSearchable={false}
            />
          </label>
          <br />
          <label>
            Lockset
            <br />
            <Select
              styles={customStyles}
              options={processForSelect(formOptions.locksets)}
              value={find(processForSelect(formOptions.locksets), (obj) => obj.value === this.state.lockset)}
              onChange={this.updateSelect("lockset")}
              isSearchable={false}
            />
          </label>
          <br />
          <label>
            Prep Only
            <br />
            <Select
              styles={customStyles}
              options={booleanSelectOptions}
              value={find(booleanSelectOptions, (obj) => obj.value === this.state.prepOnly)}
              onChange={this.updateSelect("prepOnly")}
              isSearchable={false}
            />
          </label>
          <br />
          <label>
            Seamless
            <br />
            <Select
              styles={customStyles}
              options={booleanSelectOptions}
              value={find(booleanSelectOptions, (obj) => obj.value === this.state.seamless)}
              onChange={this.updateSelect("seamless")}
              isSearchable={false}
            />
          </label>
          <br />

          <button onClick={this.handleSubmit}>Submit order</button>
        </section>
        <section>
          <PreviewContainer>
            <DoorImage src={window.doorUrl} />
            <HingeInput top={"5px"} type="text"
              value={this.state.firstHinge}
              onChange={this.update("firstHinge")}/>
            <HingeInput top={"81px"} type="text"
              value={this.state.secondHinge}
              onChange={this.update("secondHinge")} />
            <HingeInput top={"159px"} type="text"
              value={this.state.thirdHinge}
              onChange={this.update("thirdHinge")} />
            <HingeInput top={"256px"} type="text"
              value={this.state.fourthHinge}
              onChange={this.update("fourthHinge")} />
              <FixedLabel>
                Hinge Size<br />
                <Select
                  styles={customFixedStyles}
                  options={processForSelect(formOptions.hinge_sizes)}
                  onChange={this.updateSelect("hingeSize")}
                  isSearchable={false}
                />
              </FixedLabel>
              <FixedLabel>
                X<br/>
                <Select
                  styles={customFixedStyles}
                  options={processForSelect(formOptions.hinge_backsets)}
                  onChange={this.updateSelect("hingeBackset")}
                  value={find(processForSelect(formOptions.hinge_backsets), (obj)=> obj.value === this.state.hingeBackset)}
                  isSearchable={false}
                />
              </FixedLabel>

          </PreviewContainer>
        </section>
        </Container>
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