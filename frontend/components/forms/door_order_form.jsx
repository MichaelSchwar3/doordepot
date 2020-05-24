import { connect } from 'react-redux';
import { submitDoorOrder } from '../../actions/door_order_actions';
import React from 'react';
import Select from 'react-select';
import {
  processForSelect,
  booleanSelectOptions,
  doorHingeHelper,
  customFixedStyles,
  customStyles,
  calculateCsLocation,
  calculateLockLocation,
  calculateLockSizeWidth,
  calculateLockSizeHeight,
  calculateTopCsLocation,
} from "../shared/helpers";
import { fetchDoorOrderOptions } from '../../actions/door_order_actions';
import { Input } from '../shared/styled/inputs';
import { Container } from '../shared/styled/container';
import { find } from 'lodash';
import styled from 'styled-components';

const DoorImage = styled.img`
  position: relative;
  width: 350px;
  margin-left: 120px;
`;

const FlexDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 7px;
`;

const HingeInput = styled.input`
  position: absolute;
  top: ${props => props.top};
  left: 413px;
  width: 75px;
  height: 25px;
  border: 1px solid lightgray;
  color: black;
  padding: 10px;
`;

const LockInput = styled.input`
  position: absolute;
  top: ${(props) => props.top};
  left: 104px;
  width: 75px;
  height: 25px;
  border: 1px solid lightgray;
  color: black;
  padding: 10px;
`;

const RightSection = styled.section`
  margin-left: 30px;
`;

const PreviewContainer = styled.div`
  position: fixed;
`;

const HalfFixedLabel = styled.label`
  display: flex;
  align-items: center;
  // width: 50%;
`;

const FixedLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 7px;
`;


class DoorOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lhTags: "",
      rhTags: "",
      lhQuantity: "1",
      rhQuantity: "",
      so: false,
      frameType: "A/W",
      widthFeet: "",
      widthInches: "",
      heightFeet: "7",
      heightInches: "0",
      undercut: "",
      channelTop: "",
      channelBottom: "",
      type: "",
      construction: "",
      hinges: "",
      lockset: "",
      prepOnly: false,
      seamless: false,
      hingeSize: "",
      firstHinge: "",
      secondHinge: "",
      thirdHinge: "",
      fourthHinge: "",
      hingeBackset: "",
      csLocation: "",
      lockLocation: "",
      topCsLocation: "",
      topLockLocation: "",
      lockSizeHeightBot: "",
      lockSizeWidthBot: "",
      lockSizeHeightTop: "",
      lockSizeWidthTop: "",
      hingeOverRide: false,
      fetching: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const fetchFormOptions = async () => {
      await this.props.fetchFormOptions();
      this.setState({ fetching: false });
    };
    fetchFormOptions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.shouldHingeLocationsChange(prevState, this.state)) {
      this.calculateHinges();
    }
    if (prevState.frameType !== this.state.frameType) {
      this.calculateHingeBackset();
    }
    if (this.shouldCsLocationChange(prevState, this.state)) {
      const csLocation = calculateCsLocation(
        this.height(),
        this.state.lockset,
        this.state.frameType
      );
      const lockLocation = calculateLockLocation(
        csLocation,
        this.state.lockset
      );

      this.setState({
        csLocation: csLocation,
        lockLocation: lockLocation,
      });
    }
    if (this.shouldLockSizeChange(prevState, this.state)) {
      this.setState({
        lockSizeHeightBot: calculateLockSizeHeight(this.state.lockset),
        lockSizeWidthBot: calculateLockSizeWidth(this.state.lockset),
      });
    }
    if (this.shouldTopLockLocationChange(prevState, this.state)) {
      const topCsLocation = calculateTopCsLocation(
        this.state.lockset,
        this.state.csLocation
      );
      console.log(topCsLocation)
      const topLockLocation =
        topCsLocation && this.state.lockSizeHeightTop
          ? topCsLocation - this.state.lockSizeHeightTop / 2.0
          : '';
      this.setState({
        topCsLocation: topCsLocation,
        topLockLocation: topLockLocation,
      });
    }
  }

  shouldTopLockLocationChange(prevState, newState) {
    if(prevState.lockSizeHeightTop !== newState.lockSizeHeightTop) { return true }
    if(prevState.csLocation !== newState.csLocation) { return true }
    if(prevState.lockset !== newState.lockset) { return true }
    return false;
  }

  shouldLockSizeChange(prevSate, newState) {
    if (prevSate.lockset !== newState.lockset) {
      return true;
    }
    return false;
  }

  shouldHingeLocationsChange(prevState, newState) {
    if (prevState.hingeOverRide === true && newState.hingeOverRide == false) {
      return true;
    }
    if (prevState.lhQuantity !== newState.lhQuantity) {
      return true;
    }
    if (prevState.rhQuantity !== newState.rhQuantity) {
      return true;
    }
    if (prevState.heightFeet !== newState.heightFeet) {
      return true;
    }
    if (prevState.heightInches !== newState.heightInches) {
      return true;
    }
    // if(prevState.widthFeet !== newState.widthFeet) { return true }
    // if(prevState.widthInches !== newState.widthInches) { return true }
    if (prevState.hingeSize !== newState.hingeSize) {
      return true;
    }
    return false;
  }

  shouldCsLocationChange(prevState, newState) {
    if (prevState.frameType !== newState.frameType) {
      return true;
    }
    if (prevState.lockset !== newState.lockset) {
      return true;
    }
    if (prevState.heightFeet !== newState.heightFeet) {
      return true;
    }
    if (prevState.heightInches !== newState.heightInches) {
      return true;
    }
    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const order = Object.assign({}, this.state);
    return this.props.submitDoorOrder(order);
  }

  update(field) {
    return (e) => {
      return this.setState({
        [field]: e.currentTarget.value,
      });
    };
  }

  calculateHinges() {
    const height = this.height();
    const doors = this.state.lhQuantity + this.state.rhQuantity;
    const firstHinge = doorHingeHelper(1, this.state.hingeSize, height, doors);
    const secondHinge = doorHingeHelper(2, this.state.hingeSize, height, doors);
    const thirdHinge = doorHingeHelper(3, this.state.hingeSize, height, doors);
    const fourthHinge = doorHingeHelper(4, this.state.hingeSize, height, doors);
    this.setState({
      firstHinge: firstHinge,
      secondHinge: secondHinge,
      thirdHinge: thirdHinge,
      fourthHinge: fourthHinge,
    });
  }

  calculateHingeBackset() {
    if (this.state.frameType === "A/L") {
      return this.setState({ hingeBackset: "A/L Hinge (3/16)" });
    }
    this.setState({ hingeBackset: "Standard (1/16)" });
  }

  height() {
    const inches = this.state.heightInches
      ? parseFloat(this.state.heightInches)
      : 0;
    return parseFloat(this.state.heightFeet) * 12 + inches;
  }

  updateSelect(field) {
    return (e) => {
      return this.setState({
        [field]: e.value,
      });
    };
  }
  renderErrors() {
    if (this.props.errors.session) {
      return (
        <ul>
          {this.props.errors.session.map((error, idx) => {
            return <li key={`error-${idx}`}>{error}</li>;
          })}
        </ul>
      );
    }
  }

  doorInputs() {
    const { formOptions } = this.props;

    return (
      <>
        <Container>
          <section>
            <Label>
              LH Tags
              <Input
                type="text"
                value={this.state.lhTags}
                onChange={this.update("lhTags")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              RH Tags
              <Input
                type="text"
                value={this.state.rhTags}
                onChange={this.update("rhTags")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              LH Quantitys
              <Input
                type="text"
                value={this.state.lhQuantity}
                onChange={this.update("lhQuantity")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              RH Quantity
              <Input
                type="text"
                value={this.state.rhQuantity}
                onChange={this.update("rhQuantity")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              S/O
              <Select
                styles={customStyles}
                options={booleanSelectOptions}
                value={find(
                  booleanSelectOptions,
                  (obj) => obj.value === this.state.so
                )}
                onChange={this.updateSelect("so")}
                isSearchable={false}
              />
            </Label>
            <Label>
              Frame Type
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.frame_types)}
                value={find(
                  processForSelect(formOptions.frame_types),
                  (obj) => obj.value === this.state.frameType
                )}
                onChange={this.updateSelect("frameType")}
                isSearchable={false}
              />
            </Label>
            <Label>
              Width - Feet
              <Input
                type="text"
                value={this.state.widthFeet}
                onChange={this.update("widthFeet")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              Width - Inches
              <Input
                type="text"
                value={this.state.widthInches}
                onChange={this.update("widthInches")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              Height - Feet
              <Input
                type="text"
                value={this.state.heightFeet}
                onChange={this.update("heightFeet")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              Height - Inches
              <Input
                type="text"
                value={this.state.heightInches}
                onChange={this.update("heightInches")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              Undercut
              <Input
                type="text"
                value={this.state.undercut}
                onChange={this.update("undercut")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              Channel Top
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.channels)}
                value={find(
                  processForSelect(formOptions.channels),
                  (obj) => obj.value === this.state.channelTop
                )}
                onChange={this.updateSelect("channelTop")}
                isSearchable={false}
              />
            </Label>
            <Label>
              Channel Bottom
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.channels)}
                value={find(
                  processForSelect(formOptions.channels),
                  (obj) => obj.value === this.state.channelBottom
                )}
                onChange={this.updateSelect("channelBottom")}
                isSearchable={false}
              />
            </Label>
            <Label>
              Door Type
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.types)}
                onChange={this.updateSelect("type")}
                isSearchable={false}
              />
            </Label>
            <Label>
              Door Construction
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.constructions)}
                value={find(
                  processForSelect(formOptions.constructions),
                  (obj) => obj.value === this.state.construction
                )}
                onChange={this.updateSelect("construction")}
                isSearchable={false}
              />
            </Label>
            <Label>
              Hinges
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.hinges)}
                value={find(
                  processForSelect(formOptions.hinges),
                  (obj) => obj.value === this.state.hinges
                )}
                onChange={this.updateSelect("hinges")}
                isSearchable={false}
              />
            </Label>
            <Label>
              Lockset
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.locksets)}
                value={find(
                  processForSelect(formOptions.locksets),
                  (obj) => obj.value === this.state.lockset
                )}
                onChange={this.updateSelect("lockset")}
                isSearchable={false}
              />
            </Label>
            <Label>
              Prep Only
              <Select
                styles={customStyles}
                options={booleanSelectOptions}
                value={find(
                  booleanSelectOptions,
                  (obj) => obj.value === this.state.prepOnly
                )}
                onChange={this.updateSelect("prepOnly")}
                isSearchable={false}
              />
            </Label>
            <Label>
              Seamless
              <Select
                styles={customStyles}
                options={booleanSelectOptions}
                value={find(
                  booleanSelectOptions,
                  (obj) => obj.value === this.state.seamless
                )}
                onChange={this.updateSelect("seamless")}
                isSearchable={false}
              />
            </Label>

            <button onClick={this.handleSubmit}>Submit order</button>
          </section>
          <RightSection>
            <PreviewContainer>
              <DoorImage src={window.doorUrl} />
              <HingeInput
                top={"5px"}
                type="text"
                value={this.state.firstHinge}
                onChange={this.update("firstHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"81px"}
                type="text"
                value={this.state.secondHinge}
                onChange={this.update("secondHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"159px"}
                type="text"
                value={this.state.thirdHinge}
                onChange={this.update("thirdHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"256px"}
                type="text"
                value={this.state.fourthHinge}
                onChange={this.update("fourthHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <LockInput
                top={"146px"}
                type="text"
                value={this.state.lockLocation}
                onChange={this.update("lockLocation")}
                disabled={!this.state.hingeOverRide}
              />
              <LockInput
                top={"80px"}
                type="text"
                value={this.state.topLockLocation}
                onChange={this.update("topLockLocation")}
                disabled={!this.state.hingeOverRide}
              />
              <FlexDiv>
                <HalfFixedLabel>Hinge Size</HalfFixedLabel>
                <HalfFixedLabel>
                  <Select
                    styles={customFixedStyles}
                    options={processForSelect(formOptions.hinge_sizes)}
                    onChange={this.updateSelect("hingeSize")}
                    isSearchable={false}
                  />
                </HalfFixedLabel>
                <span> X </span>
                <HalfFixedLabel>
                  <Select
                    styles={customFixedStyles}
                    options={processForSelect(formOptions.hinge_backsets)}
                    onChange={this.updateSelect("hingeBackset")}
                    value={find(
                      processForSelect(formOptions.hinge_backsets),
                      (obj) => obj.value === this.state.hingeBackset
                    )}
                    isSearchable={false}
                  />
                </HalfFixedLabel>
              </FlexDiv>
              <FlexDiv>
                <HalfFixedLabel>CS Location - 1st Lock</HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="text"
                    value={this.state.csLocation}
                    onChange={this.update("csLocation")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
              </FlexDiv>
              <FlexDiv>
                <HalfFixedLabel>1st Lock Size</HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="text"
                    value={this.state.lockSizeWidthBot}
                    onChange={this.update("lockSizeWidthBot")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
                <HalfFixedLabel> X </HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="text"
                    value={this.state.lockSizeHeightBot}
                    onChange={this.update("lockSizeHeightBot")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
              </FlexDiv>
              <FlexDiv>
                <HalfFixedLabel>CS Location - 2nd Lock</HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="text"
                    value={this.state.topCsLocation}
                    onChange={this.update("topCsLocation")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
              </FlexDiv>
              <FlexDiv>
                <HalfFixedLabel>2nd Lock Size</HalfFixedLabel>
                <HalfFixedLabel>
                  <Select
                    styles={customFixedStyles}
                    options={processForSelect(formOptions.second_ls_widths)}
                    onChange={this.updateSelect("lockSizeWidthTop")}
                    value={find(
                      processForSelect(formOptions.second_ls_widths),
                      (obj) => obj.value === this.state.lockSizeWidthTop
                    )}
                    isSearchable={false}
                    menuPlacement="top"
                  />
                </HalfFixedLabel>
                <HalfFixedLabel> X </HalfFixedLabel>
                <HalfFixedLabel>
                  <Select
                    styles={customFixedStyles}
                    options={processForSelect(formOptions.second_ls_heights)}
                    onChange={this.updateSelect("lockSizeHeightTop")}
                    value={find(
                      processForSelect(formOptions.second_ls_heights),
                      (obj) => obj.value === this.state.lockSizeHeightTop
                    )}
                    isSearchable={false}
                    menuPlacement="top"
                  />
                </HalfFixedLabel>
              </FlexDiv>
            </PreviewContainer>
          </RightSection>
        </Container>
      </>
    );
  }

  render() {
    if (this.state.fetching) return <h1>Fetching</h1>;
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