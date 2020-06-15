import { connect } from 'react-redux';
import { submitDoor, fetchDoor } from '../../actions/door_actions';
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
  calculateLockBackset,
  calculateHingeBackset,
  calculateActualHeight,
  calculateActualWidth,
  calculateWideSideHeight,
  calculateWideSideWidth,
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

const SubmitButton = styled.button`
  background: black;
  color: white;
  width: 150px;
  height: 75px;
  text-align: center;
  margin-left: 175px;
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
  top: ${(props) => props.top};
  left: 418px;
  width: 75px;
  height: 25px;
  border: 1px solid lightgray;
  color: black;
  padding: 10px;
  padding-right: 0px;
`;

const LockInput = styled.input`
  position: absolute;
  top: ${(props) => props.top};
  left: 98px;
  width: 75px;
  height: 25px;
  border: 1px solid lightgray;
  color: black;
  padding: 10px;
  padding-right: 0px;
`;

const BacksetInput = styled.input`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: 75px;
  height: 17px;
  border: 1px solid lightgray;
  color: black;
  font-size: 9px;
  font-weight: bold;
  padding-left: 12px;
`;

const RightSection = styled.section`
  margin-left: 30px;
  padding-top: 5px;
`;

const PreviewContainer = styled.div`
  position: fixed;
`;

const HalfFixedLabel = styled.label`
  display: flex;
  align-items: center;
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
      actualHeight: "",
      actualWidth: "",
      channelBottom: "",
      channelTop: "",
      construction: "",
      csLocation: "",
      fetching: true,
      firstHinge: "",
      fourthHinge: "",
      frameType: "",
      heightFeet: "",
      heightInches: "",
      hingeBackset: "",
      hingeOverRide: false,
      hingeSize: "",
      hingeWidth: "",
      hinges: "",
      lhQuantity: "",
      lhTags: "",
      lockBackset: "",
      lockLocation: "",
      lockSizeHeightBot: "",
      lockSizeHeightTop: "",
      lockSizeWidthBot: "",
      lockSizeWidthTop: "",
      lockset: "",
      nsHeight: "",
      nsWidth: "",
      prepOnly: false,
      rhQuantity: "",
      rhTags: "",
      seamless: false,
      secondHinge: "",
      so: false,
      thirdHinge: "",
      topCsLocation: "",
      topLockLocation: "",
      doorType: "",
      undercut: "",
      widthFeet: "",
      widthInches: "",
      wsHeight: "",
      wsWidth: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const fetchFormOptions = async () => {
      await this.props.fetchFormOptions();
      this.setState({ fetching: false });
      this.initialCalculations()
    };
    const fetchDoor = async () => {
      await this.props.fetchDoor();
      await this.setState({ ...this.props.door });
      this.initialCalculations();
    };
    if(this.props.doorId) { fetchDoor() };
    fetchFormOptions();
  }

  componentDidUpdate(_, prevState) {
    const { frameType } = this.state;
    if (this.shouldHingeLocationsChange(prevState, this.state)) {
      this.calculateHinges();
    }
    if (prevState.frameType !== frameType) {
      this.calculateHingeWidth();
    }
    if (this.shouldCsLocationChange(prevState, this.state)) {
      this.calculateLockInputs()
    }
    if (this.shouldLockSizeChange(prevState, this.state)) {
      this.calculateLockSizeBot()
    }
    if (this.shouldTopLockLocationChange(prevState, this.state)) {
      this.calculateTopLockLocation()
    }
    if (this.shouldActualSizesChange(prevState, this.state)) {
      this.calculateActualSizes()
    }
  }

  initialCalculations() {
    this.calculateHinges();
    this.calculateHingeWidth();
    this.calculateLockInputs();
    this.calculateLockSizeBot();
    this.calculateTopLockLocation();
    this.calculateActualSizes();
  }

  shouldActualSizesChange(prevState, newState) {
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
    if (prevState.widthFeet !== newState.widthFeet) {
      return true;
    }
    if (prevState.widthInches !== newState.widthInches) {
      return true;
    }
    if (prevState.frameType !== newState.frameType) {
      return true;
    }
    if (prevState.undercut !== newState.undercut) {
      return true;
    }
    if (prevState.hinges !== newState.hinges) {
      return true;
    }
    if (prevState.doorType !== newState.doorType) {
      return  true;
    }
    return false;
  }

  shouldTopLockLocationChange(prevState, newState) {
    if (prevState.lockSizeHeightTop !== newState.lockSizeHeightTop) {
      return true;
    }
    if (prevState.csLocation !== newState.csLocation) {
      return true;
    }
    if (prevState.lockset !== newState.lockset) {
      return true;
    }
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
    const submit = async () => {
      const order = Object.assign({}, this.state);
      await this.props.submitDoor(order);
      this.props.history.push(`/doorListings/${this.props.doorListingId}`);
    };
    submit();
  }

  update(field) {
    return (e) => {
      return this.setState({
        [field]: e.currentTarget.value,
      });
    };
  }

  calculateLockInputs() {
    const { lockset, frameType, csLocation } = this.state
    const newCsLocation = calculateCsLocation(this.height(), lockset, frameType);
    const newLockLocation = calculateLockLocation(newCsLocation, lockset);

    this.setState({
      csLocation: newCsLocation,
      lockLocation: newLockLocation,
    });
  }

  calculateLockSizeBot() {
    const { lockset } = this.state;
    this.setState({
      lockSizeHeightBot: calculateLockSizeHeight(lockset),
      lockSizeWidthBot: calculateLockSizeWidth(lockset),
      lockBackset: calculateLockBackset(lockset),
    });
  }

  calculateTopLockLocation() {
    const { lockset, csLocation, lockSizeHeightTop } = this.state;
    const topCsLocation = calculateTopCsLocation(lockset, csLocation);
    const topLockLocation =
      topCsLocation && lockSizeHeightTop
        ? topCsLocation - lockSizeHeightTop / 2.0
        : "";
    this.setState({
      topCsLocation: topCsLocation,
      topLockLocation: topLockLocation,
    });
  }

  calculateActualSizes() {
    const { rhQuantity, lhQuantity, hinges, frameType, undercut, doorType } = this.state;
    if (rhQuantity + lhQuantity === 0) {
      this.setState({
        actualHeight: "",
        actualWidth: "",
        wsHeight: "",
        wsWidth: "",
        nsHeight: "",
        nsWidth: "",
      });
    }
    const height = calculateActualHeight(
      this.height(),
      undercut,
      frameType
    );
    const width = calculateActualWidth(this.width(), hinges, frameType);
    const wideSideHeight = calculateWideSideHeight(doorType, height);
    const wideSideWidth = calculateWideSideWidth(doorType, width);
    const narrowSideWidth = wideSideWidth ? wideSideHeight - 4 : "";
    const narrowSideHeight = wideSideHeight;

    this.setState({
      actualWidth: width,
      actualHeight: height,
      wsHeight: wideSideHeight,
      wsWidth: wideSideWidth,
      nsHeight: narrowSideHeight,
      nsWidth: narrowSideWidth,
    });
  }

  calculateHinges() {
    const height = this.height();
    const doors = this.state.lhQuantity + this.state.rhQuantity;
    const firstHinge = doorHingeHelper(1, this.state.hingeSize, height, doors);
    const secondHinge = doorHingeHelper(2, this.state.hingeSize, height, doors);
    const thirdHinge = doorHingeHelper(3, this.state.hingeSize, height, doors);
    const fourthHinge = doorHingeHelper(4, this.state.hingeSize, height, doors);
    const backset = calculateHingeBackset(this.state.hingeSize);
    this.setState({
      firstHinge: firstHinge,
      secondHinge: secondHinge,
      thirdHinge: thirdHinge,
      fourthHinge: fourthHinge,
      hingeBackset: backset,
    });
  }

  calculateHingeWidth() {
    if (this.state.frameType === "A/L") {
      return this.setState({ hingeWidth: "A/L Hinge (3/16)" });
    }
    this.setState({ hingeWidth: "Standard (1/16)" });
  }

  height() {
    const inches = this.state.heightInches
      ? parseFloat(this.state.heightInches)
      : 0;
    return parseFloat(this.state.heightFeet) * 12 + inches;
  }

  width() {
    const inches = this.state.widthInches
      ? parseFloat(this.state.widthInches)
      : 0;
    return parseFloat(this.state.widthFeet) * 12 + inches;
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
                type="number"
                value={this.state.lhQuantity}
                onChange={this.update("lhQuantity")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              RH Quantity
              <Input
                type="number"
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
                type="number"
                value={this.state.widthFeet}
                onChange={this.update("widthFeet")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              Width - Inches
              <Input
                type="number"
                value={this.state.widthInches}
                onChange={this.update("widthInches")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              Height - Feet
              <Input
                type="number"
                value={this.state.heightFeet}
                onChange={this.update("heightFeet")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              Height - Inches
              <Input
                type="number"
                value={this.state.heightInches}
                onChange={this.update("heightInches")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              Undercut
              <Input
                type="number"
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
                onChange={this.updateSelect("doorType")}
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

            <SubmitButton onClick={this.handleSubmit}> {this.props.door && this.props.door.id ? "Update" : "Submit"} </SubmitButton>
          </section>
          <RightSection>
            <PreviewContainer>
              <DoorImage src={window.doorUrl} />
              <HingeInput
                top={"-7px"}
                type="number"
                value={this.state.firstHinge}
                onChange={this.update("firstHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"73px"}
                type="number"
                value={this.state.secondHinge}
                onChange={this.update("secondHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"154px"}
                type="number"
                value={this.state.thirdHinge}
                onChange={this.update("thirdHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"256px"}
                type="number"
                value={this.state.fourthHinge}
                onChange={this.update("fourthHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <BacksetInput
                top={"295px"}
                left={"408px"}
                type="text"
                value={this.state.hingeBackset}
                onChange={this.update("hingeBackset")}
                disabled={!this.state.hingeOverRide}
              />

              <LockInput
                top={"141px"}
                type="number"
                value={this.state.lockLocation}
                onChange={this.update("lockLocation")}
                disabled={!this.state.hingeOverRide}
              />
              <LockInput
                top={"75px"}
                type="number"
                value={this.state.topLockLocation}
                onChange={this.update("topLockLocation")}
                disabled={!this.state.hingeOverRide}
              />
              <BacksetInput
                top={"192px"}
                left={"105px"}
                type="text"
                value={this.state.lockBackset}
                onChange={this.update("lockBackset")}
                disabled={!this.state.hingeOverRide}
              />

              <FlexDiv>
                <HalfFixedLabel>Hinge Size</HalfFixedLabel>
                <HalfFixedLabel>
                  <Select
                    styles={customFixedStyles}
                    options={processForSelect(formOptions.hinge_sizes)}
                    onChange={this.updateSelect("hingeSize")}
                    value={find(
                      processForSelect(formOptions.hinge_sizes),
                      (obj) => obj.value === this.state.hingeSize
                    )}
                    isSearchable={false}
                  />
                </HalfFixedLabel>
                <span> X </span>
                <HalfFixedLabel>
                  <Select
                    styles={customFixedStyles}
                    options={processForSelect(formOptions.hinge_backsets)}
                    onChange={this.updateSelect("hingeWidth")}
                    value={find(
                      processForSelect(formOptions.hinge_backsets),
                      (obj) => obj.value === this.state.hingeWidth
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
              <FlexDiv>
                <HalfFixedLabel>Actual Width</HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="text"
                    value={this.state.actualWidth}
                    onChange={this.update("actualWidth")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
              </FlexDiv>
              <FlexDiv>
                <HalfFixedLabel>Actual Height</HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="text"
                    value={this.state.actualHeight}
                    onChange={this.update("actualHeight")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
              </FlexDiv>
              <FlexDiv>
                <HalfFixedLabel>Wide Side</HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="number"
                    value={this.state.wsWidth}
                    onChange={this.update("wsWidth")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
                <HalfFixedLabel> X </HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="text"
                    value={this.state.wsHeight}
                    onChange={this.update("wsHeight")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
              </FlexDiv>
              <FlexDiv>
                <HalfFixedLabel>Narrow Side</HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="number"
                    value={this.state.nsWidth}
                    onChange={this.update("nsWidth")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
                <HalfFixedLabel> X </HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="text"
                    value={this.state.nsHeight}
                    onChange={this.update("nsHeight")}
                    className="door-listing-input"
                    disabled={true}
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
    if (this.state.fetching) return null;
  
    return (
      <div className="door-order-form-container">
        {this.doorInputs()}
        <span id="door-order-form-errors">{this.renderErrors()}</span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors,
  formOptions: state.entities.forms.doorOrderForm,
  door: state.entities.doors[ownProps.match.params.doorId],
  doorId: ownProps.match.params.doorId || null,
  doorListingId: ownProps.match.params.doorListingId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitDoor: (door) => dispatch(submitDoor(door, ownProps.match.params.doorListingId)),
  fetchFormOptions: () => dispatch(fetchDoorOrderOptions()),
  fetchDoor: () => dispatch(fetchDoor(ownProps.match.params.doorId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DoorOrderForm);