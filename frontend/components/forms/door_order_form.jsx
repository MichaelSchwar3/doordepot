import { connect } from 'react-redux';
import { submitDoor, fetchDoors } from '../../actions/door_actions';
import { updateDoorForm, updateDoorTags, updateDoorCommon } from '../../actions/door_form_actions';
import React from 'react';
import Select from 'react-select';
import {
  processForSelect,
  doorHingeHelper,
  booleanSelectOptions,
  customFixedStyles,
  customStyles,
  calculateCsLocation,
  calculateLockLocation,
  calculateLockSizeWidth,
  calculateLockSizeHeight,
  calculateTopCsLocation,
  calculateLockBackset,
  calculateHingeBackset,
  depotOthersSelectOptions,
  yesNoSelectOptions,
} from "../shared/helpers";
import { fetchDoorOrderOptions } from '../../actions/door_order_actions';
import { Input } from '../shared/styled/inputs';
import { find, isEmpty } from 'lodash';
import { getDoors } from '../../selectors/door_selectors'
import styled from 'styled-components';
import DoorOrderFormLine from './door_order_form_line'
import DoorOrderTagLine from './door_order_tag_line'
import DoorOrderSheetLine from './door_order_sheet_line'

const DoorImage = styled.img`
  position: relative;
  width: 350px;
`;

export const Container = styled.div`
  width: 100%;
  display flex;
  flex-direction: column;
`

const SubmitButton = styled.button`
  position: absolute;
  right: 25px;
  top: 80px;
  background: black;
  color: white;
  width: 150px;
  height: 75px;
  text-align: center;
  margin-left: 175px;
`;

const FlexDiv = styled.div`
  display: grid;
  grid-template-columns: 20% 35% 10% 35%;
  border-left:1px solid black;
  border-top:1px solid black;
`;

const FlexDivCsLocation = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  border-left:1px solid black;
  border-top:1px solid black;
`;

const HingeInput = styled.input`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left ? props.left : '306px'};
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
  left: ${(props) => props.left ? props.left : '-15px'};
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

const BottomSection = styled.section`
  width: 100%;
  height: 35px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const MiddleSection = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const DoorImageContainer = styled.div`
  position: relative;
  margin-left: 20px;

`;
const SheetSizeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SheetSizeHeader = styled.div`
  text-align: center;
`;

const SheetSizeColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 1fr 7fr;
`
const SheetNotesDiv = styled.div`
  display: grid;
  grid-template-columns: 15% 85%
`
const VisionContainer = styled.div`
  width: 70%;
  margin: auto;
  border: 1px solid black;
`;

const VisionRow = styled.div`
  display: grid;
  grid-template-columns: 30% 25% 50%;
`;


const HalfFixedLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 10px;
  height: 35px;
  border-right:1px solid black;
  border-bottom:1px solid black;
`;

const Row = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(20, 50px);
  margin: auto;
  height: 50px;
  font-size: 12px;
`;

const TagRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 500px);
  margin: auto;
  height: 150px;
  font-size: 12px;
`;
const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 3fr 1fr 3fr 1fr 3fr 1fr 1fr 1fr 1fr ;
  height: 35px;
  font-size: 12px;
  border-left:1px solid black;
  border-top:1px solid black;
  border-bottom: 1px solid black;
`;

const HeaderDiv = styled.div`
  box-sizing: border-box;
  height: 35px;
  text-align: center;
  border-right:1px solid black;
`;

const ColumnTitle = styled.div`
  border: 1px solid black;
  text-align: center;
  padding-top: 5px;
`;


class DoorOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csLocation: "",
      elevationHeight: "",
      elevationWidth: "",
      dateRequired: "",
      dateCompleted: "",
      deliver: false,
      fetching: true,
      firstHinge: "",
      fourthHinge: "",
      glass: false,
      glassBy: "",
      hingeBackset: "",
      hingeSize: "",
      hingeWidth: "",
      hinges: "",
      kit: false,
      kitBy: "",
      lockBackset: "",
      lockLocation: "",
      lockSizeHeightBot: "",
      lockSizeHeightTop: "",
      lockSizeWidthBot: "",
      lockSizeWidthTop: "",
      lockset: "",
      molding: false,
      moldingBy: "",
      phoneNumber: "",
      prime: false,
      secondHinge: "",
      sheetNotes: "",
      skidUp: false,
      thirdHinge: "",
      topCsLocation: "",
      topLockLocation: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const fetchFormOptions = async () => {
      await this.props.fetchFormOptions();
      await this.props.fetchDoors()
      this.setState({ fetching: false });
      this.initialCalculations()
    };

    fetchFormOptions();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevForm = prevProps.form;
    const { form } = this.props;
    if(isEmpty(prevForm["A"]) || isEmpty(form["A"])) {
      return
    }
    const prevDoor = isEmpty(prevForm) ? {} : prevForm["A"] 
    const currentDoor = isEmpty(form) ? {} : form["A"]
    if (this.shouldHingeLocationsChange(prevForm, form, prevState, this.state)) {
      this.calculateHinges();
    }
    if (prevDoor && (prevDoor.frameType !== currentDoor.frameType)) {
      this.calculateHingeWidth();
    }
    if (this.shouldCsLocationChange(prevDoor, currentDoor)) {
      this.calculateLockInputs()
    }
    if (this.shouldLockSizeChange(prevDoor, currentDoor)) {
      this.calculateLockSizeBot()
    }
    if (this.shouldTopLockLocationChange(prevDoor, currentDoor)) {
      this.calculateTopLockLocation()
    }
  }

  initialCalculations() {
    this.calculateHinges();
    this.calculateHingeWidth();
    this.calculateLockInputs();
    this.calculateLockSizeBot();
    this.calculateTopLockLocation();
  }

  shouldActualSizesChange(prevDoor, currentDoor) {
    if (prevDoor.lhQuantity !== currentDoor.lhQuantity) {
      return true;
    }
    if (prevDoor.rhQuantity !== currentDoor.rhQuantity) {
      return true;
    }
    if (prevDoor.heightFeet !== currentDoor.heightFeet) {
      return true;
    }
    if (prevDoor.heightInches !== currentDoor.heightInches) {
      return true;
    }
    if (prevDoor.widthFeet !== currentDoor.widthFeet) {
      return true;
    }
    if (prevDoor.widthInches !== currentDoor.widthInches) {
      return true;
    }
    if (prevDoor.frameType !== currentDoor.frameType) {
      return true;
    }
    if (prevDoor.undercut !== currentDoor.undercut) {
      return true;
    }
    if (prevDoor.hinges !== currentDoor.hinges) {
      return true;
    }
    if (prevDoor.doorType !== currentDoor.doorType) {
      return  true;
    }
    return false;
  }

  shouldTopLockLocationChange(prevDoor, currentDoor) {
    if (prevDoor.lockSizeHeightTop !== currentDoor.lockSizeHeightTop) {
      return true;
    }
    if (prevDoor.csLocation !== currentDoor.csLocation) {
      return true;
    }
    if (prevDoor.lockset !== currentDoor.lockset) {
      return true;
    }
    return false;
  }

  shouldLockSizeChange(prevDoor, currentDoor) {
    if (prevDoor.lockset !== currentDoor.lockset) {
      return true;
    }
    return false;
  }

  shouldHingeLocationsChange(prevForm, form, prevState, newState) {
    const prevDoor = prevForm["A"]
    const currentDoor = form["A"]
    if (prevDoor.hingeOverRide === true && currentDoor.hingeOverRide == false) {
      return true;
    }
    if (prevDoor.lhQuantity !== currentDoor.lhQuantity) {
      return true;
    }
    if (prevDoor.rhQuantity !== currentDoor.rhQuantity) {
      return true;
    }
    if (prevDoor.heightFeet !== currentDoor.heightFeet) {
      return true;
    }
    if (prevDoor.heightInches !== currentDoor.heightInches) {
      return true;
    }
    if (prevState.hingeSize !== newState.hingeSize) {
      return true;
    }
    return false;
  }

  shouldCsLocationChange(prevDoor, currentDoor) {
    if (prevDoor.frameType !== currentDoor.frameType) {
      return true;
    }
    if (prevDoor.lockset !== currentDoor.lockset) {
      return true;
    }
    if (prevDoor.heightFeet !== currentDoor.heightFeet) {
      return true;
    }
    if (prevDoor.heightInches !== currentDoor.heightInches) {
      return true;
    }
    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.props
    const submit = async () => {
      const order = Object.assign({}, form);
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
    const { form, updateDoorCommon } = this.props;
    if (isEmpty(form) || isEmpty(form["A"])) return;

    const currentDoor = form["A"]
    const { lockset, frameType, csLocation } = currentDoor
    const newCsLocation = calculateCsLocation(this.height(), lockset, frameType);
    const newLockLocation = calculateLockLocation(newCsLocation, lockset);

    this.setState({
      csLocation: newCsLocation,
      lockLocation: newLockLocation,
    }, ()=> updateDoorCommon(this.state));
  }

  calculateLockSizeBot() {
    const { form, updateDoorCommon } = this.props;
    if (isEmpty(form) || isEmpty(form["A"])) return;
    
    const currentDoor = form["A"]
    const { lockset } = currentDoor;
    this.setState({
      lockSizeHeightBot: calculateLockSizeHeight(lockset),
      lockSizeWidthBot: calculateLockSizeWidth(lockset),
      lockBackset: calculateLockBackset(lockset),
    }, ()=> updateDoorCommon(this.state));
  }

  calculateTopLockLocation() {
    const { form } = this.props;
    if (isEmpty(form) || isEmpty(form["A"])) return;

    const currentDoor = form["A"]
    const { lockset, csLocation, lockSizeHeightTop } = currentDoor;
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

  calculateHinges() {
    const { form, updateDoorCommon } = this.props
    if (isEmpty(form) || isEmpty(form["A"])) return;
    const currentDoor = form["A"]
    const height = this.height();
    const doors = parseInt(currentDoor.lhQuantity) + parseInt(currentDoor.rhQuantity);
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
    }, ()=> updateDoorCommon(this.state));
  }

  calculateHingeWidth() {
    const { form, updateDoorCommon } = this.props
    if (isEmpty(form) || isEmpty(form["A"])) return;

    const currentDoor = form["A"]
    if (currentDoor.frameType === "A/L") {
      return this.setState({ hingeWidth: "A/L Hinge (3/16)" }, ()=> updateDoorCommon(this.state));
    }
    this.setState({ hingeWidth: "Standard (1/16)" }, ()=> updateDoorCommon(this.state));
  }

  height() {
    const { form } = this.props
    if (isEmpty(form) || isEmpty(form["A"])) return;

    const currentDoor = form["A"]
    const inches = currentDoor.heightInches
      ? parseFloat(currentDoor.heightInches)
      : 0;
    return parseFloat(currentDoor.heightFeet) * 12 + inches;
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

  doorLines() {
    const { updateDoorForm, form } = this.props
    const firstDoor = isEmpty(form) ? {} : form["A"]
    return ["A","B","C","D","E","F"].map( letter => (
      <DoorOrderFormLine 
        formOptions={this.props.formOptions} 
        firstDoor={firstDoor} 
        door={this.props.doors[letter] || {}} 
        letter={letter} 
        updateDoorForm={updateDoorForm} />
      )
    )
  }

  tagLines() {
    const { updateDoorTags } = this.props
    return ["A","B","C","D","E","F"].map( letter => (
      <DoorOrderTagLine letter={letter} updateDoorTags={updateDoorTags} />
      )
    )
  }

  sheetSizeLines() {
    const { form } = this.props
    if(isEmpty(form['A'])) return null;
    return ["A","B","C","D","E","F"].map( letter => (
      <DoorOrderSheetLine door={form[letter]} />
      )
    )
  }

  doorInputs() {
    const { formOptions } = this.props;
    return (
      <>
        <Container>
          <HeaderRow>
            <HeaderDiv>
              Order Number
            </HeaderDiv>
            <HeaderDiv>
              {this.props.orderNumber}
            </HeaderDiv>
            <HeaderDiv>
              Phone Number
            </HeaderDiv>
            <HeaderDiv>
              <Input
                type="text"
                value={this.state.phoneNumber}
                onChange={this.update("phoneNumber")}
                className="door-listing-input"
              />
            </HeaderDiv>
            <HeaderDiv>
              Date Required
            </HeaderDiv>
            <HeaderDiv>
              <Input
                type="text"
                value={this.state.dateRequired}
                onChange={this.update("dateRequired")}
                className="door-listing-input"
              />
            </HeaderDiv>
            <HeaderDiv>
              Date Completed
            </HeaderDiv>
            <HeaderDiv>
              <Input
                type="text"
                value={this.state.dateRequired}
                onChange={this.update("dateCompleted")}
                className="door-listing-input"
                disabled={true}
              />
            </HeaderDiv>
            <HeaderDiv>
              Skid up:
            </HeaderDiv>
            <HeaderDiv>
              <Select
                styles={customFixedStyles}
                options={booleanSelectOptions}
                value={find(
                  booleanSelectOptions,
                  (obj) => obj.value === this.state.skidUp
                )}
                onChange={this.updateSelect("skidUp")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              />
            </HeaderDiv>
            <HeaderDiv>
              Deliver:
            </HeaderDiv>
            <HeaderDiv>
              <Select
                styles={customFixedStyles}
                options={booleanSelectOptions}
                value={find(
                  booleanSelectOptions,
                  (obj) => obj.value === this.state.deliver
                )}
                onChange={this.updateSelect("deliver")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              />
            </HeaderDiv>
          </HeaderRow>
          <TagRow>
            {this.tagLines()}
          </TagRow>
          <Row>
            <ColumnTitle> Letter Ref.</ColumnTitle>
            <ColumnTitle> LH Quantity</ColumnTitle>
            <ColumnTitle> RH Quantity</ColumnTitle>
            <ColumnTitle> S/O</ColumnTitle>
            <ColumnTitle> Frame Type</ColumnTitle>
            <ColumnTitle> Width Feet</ColumnTitle>
            <ColumnTitle> Width Inches</ColumnTitle>
            <ColumnTitle> Height Feet</ColumnTitle>
            <ColumnTitle> Height Inches</ColumnTitle>
            <ColumnTitle> Undercut</ColumnTitle>
            <ColumnTitle> Channel Top</ColumnTitle>
            <ColumnTitle> Channel Bottom</ColumnTitle>
            <ColumnTitle> Door Type</ColumnTitle>
            <ColumnTitle> Door Const.</ColumnTitle>
            <ColumnTitle> Hinges</ColumnTitle>
            <ColumnTitle> Lockset</ColumnTitle>
            <ColumnTitle> Prep Only</ColumnTitle>
            <ColumnTitle> Seamless</ColumnTitle>
            <ColumnTitle> Actual Size Width</ColumnTitle>
            <ColumnTitle> Actual Size Height</ColumnTitle>
          </Row>
          {this.doorLines()}
            <SubmitButton onClick={this.handleSubmit}> {this.props.door && this.props.door.id ? "Update" : "Submit"} </SubmitButton>

          <MiddleSection>
            <DoorImageContainer>
              <DoorImage src={window.doorUrl} />
              <HingeInput
                top={"0px"}
                type="number"
                value={this.state.firstHinge}
                onChange={this.update("firstHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"80px"}
                type="number"
                value={this.state.secondHinge}
                onChange={this.update("secondHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"161px"}
                type="number"
                value={this.state.thirdHinge}
                onChange={this.update("thirdHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"263px"}
                type="number"
                value={this.state.fourthHinge}
                onChange={this.update("fourthHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <BacksetInput
                top={"294px"}
                left={"295px"}
                type="text"
                value={this.state.hingeBackset}
                onChange={this.update("hingeBackset")}
                disabled={!this.state.hingeOverRide}
              />

              <LockInput
                top={"147px"}
                type="number"
                value={this.state.lockLocation}
                onChange={this.update("lockLocation")}
                disabled={!this.state.hingeOverRide}
              />
              <LockInput
                top={"80px"}
                type="number"
                value={this.state.topLockLocation}
                onChange={this.update("topLockLocation")}
                disabled={!this.state.hingeOverRide}
              />
              <BacksetInput
                top={"180px"}
                left={"-7px"}
                type="text"
                value={this.state.lockBackset}
                onChange={this.update("lockBackset")}
                disabled={!this.state.hingeOverRide}
              />
            </DoorImageContainer>
            <SheetSizeContainer>
              <SheetSizeHeader>
                Sheet Size
              </SheetSizeHeader>
              <SheetSizeColumns>
                <div>#</div>
                <div>Wide Side</div>
                <div>#</div>
                <div>Narrow Side</div>
              </SheetSizeColumns>
              {this.sheetSizeLines()}
              <SheetNotesDiv>
                <span>Notes</span>
                <Input
                  type="text"
                  value={this.state.sheetNotes}
                  onChange={this.update("sheetNotes")}
                  className="door-listing-input"
                />
              </SheetNotesDiv>
              <VisionContainer>
                <div>Door Elevations</div>
                <div>Cut Out Size</div>
                <VisionRow>
                  <div>Size</div>
                  <Input
                    type="number"
                    min="0"
                    value={this.state.elevationWidth}
                    onChange={this.update("lhQuantity")}
                    className="door-listing-input"
                  />
                  <div> 
                    <div>X</div>             
                    <Input
                      type="number"
                      min="0"
                      value={this.state.elevationHeight}
                      onChange={this.update("lhQuantity")}
                      className="door-listing-input"
                    />
                  </div>
                </VisionRow>
                <VisionRow>
                  <div>Kit</div>
                  <div>
                    <Select
                      styles={customFixedStyles}
                      options={yesNoSelectOptions}
                      onChange={this.updateSelect("kit")}
                      value={find(
                        yesNoSelectOptions,
                        (obj) => obj.value === this.state.kit
                      )}
                      isSearchable={false}
                      components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    />
                  </div>
                  <div>
                    <Select
                      styles={customFixedStyles}
                      options={depotOthersSelectOptions}
                      onChange={this.updateSelect("kitBy")}
                      value={find(
                        depotOthersSelectOptions,
                        (obj) => obj.value === this.state.kitBy
                      )}
                      isSearchable={false}
                      components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    />
                  </div>
                </VisionRow>
                <VisionRow>
                  <div>Molding</div>
                  <div>
                    <Select
                      styles={customFixedStyles}
                      options={yesNoSelectOptions}
                      onChange={this.updateSelect("molding")}
                      value={find(
                        yesNoSelectOptions,
                        (obj) => obj.value === this.state.molding
                      )}
                      isSearchable={false}
                      components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    />
                  </div>
                  <div>
                    <Select
                      styles={customFixedStyles}
                      options={depotOthersSelectOptions}
                      onChange={this.updateSelect("moldingBy")}
                      value={find(
                        depotOthersSelectOptions,
                        (obj) => obj.value === this.state.moldingBy
                      )}
                      isSearchable={false}
                      components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    />
                  </div>
                </VisionRow>
                <VisionRow>
                  <div>Glass</div>
                  <div>
                    <Select
                      styles={customFixedStyles}
                      options={yesNoSelectOptions}
                      onChange={this.updateSelect("glass")}
                      value={find(
                        yesNoSelectOptions,
                        (obj) => obj.value === this.state.glass
                      )}
                      isSearchable={false}
                      components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    />
                  </div>
                  <div>
                    <Select
                      styles={customFixedStyles}
                      options={depotOthersSelectOptions}
                      onChange={this.updateSelect("glassBy")}
                      value={find(
                        depotOthersSelectOptions,
                        (obj) => obj.value === this.state.glassBy
                      )}
                      isSearchable={false}
                      components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    />
                  </div>
                </VisionRow>
              </VisionContainer>
            </SheetSizeContainer>
            <DoorImageContainer>
              <DoorImage src={window.doorUrl} />
              <HingeInput
                top={"0px"}
                type="number"
                value={this.state.firstHinge}
                onChange={this.update("firstHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"80px"}
                type="number"
                value={this.state.secondHinge}
                onChange={this.update("secondHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"161px"}
                type="number"
                value={this.state.thirdHinge}
                onChange={this.update("thirdHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"263px"}
                type="number"
                value={this.state.fourthHinge}
                onChange={this.update("fourthHinge")}
                disabled={!this.state.hingeOverRide}
              />

              <LockInput
                top={"147px"}
                type="number"
                value={this.state.lockLocation}
                onChange={this.update("lockLocation")}
                disabled={!this.state.hingeOverRide}
              />
              <LockInput
                top={"80px"}
                type="number"
                value={this.state.topLockLocation}
                onChange={this.update("topLockLocation")}
                disabled={!this.state.hingeOverRide}
              />
            </DoorImageContainer>

          </MiddleSection>
          <BottomSection>
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
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                  />
                </HalfFixedLabel>
                <HalfFixedLabel> X </HalfFixedLabel>
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
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                  />
                </HalfFixedLabel>
              </FlexDiv>
              <FlexDiv>
                <HalfFixedLabel>Lock Size</HalfFixedLabel>
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
              <FlexDivCsLocation>
                <HalfFixedLabel>CS Location</HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="text"
                    value={this.state.csLocation}
                    onChange={this.update("csLocation")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
              </FlexDivCsLocation>
            <FlexDiv>
              <HalfFixedLabel>2nd Lock</HalfFixedLabel>
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
                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
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
                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                />
              </HalfFixedLabel>
            </FlexDiv>
              <FlexDivCsLocation>
                <HalfFixedLabel>CS Location</HalfFixedLabel>
                <HalfFixedLabel>
                  <Input
                    type="text"
                    value={this.state.topCsLocation}
                    onChange={this.update("topCsLocation")}
                    className="door-listing-input"
                    disabled={true}
                  />
                </HalfFixedLabel>
              </FlexDivCsLocation>
          </BottomSection>
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

const mapStateToProps = (state, ownProps) => {
  const doorListing = state.entities.doorListings[ownProps.match.params.doorListingId]
  return {
  errors: state.errors,
  formOptions: state.entities.formOptions.doorOrderForm,
  form: state.forms.doorForm,
  doors: getDoors(state.entities.doors),
  doorListingId: ownProps.match.params.doorListingId,
  orderNumber: doorListing ? doorListing.orderNumber : '',
  poNumber: doorListing ? doorListing.poNumber : '',
}};

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitDoor: (door) => dispatch(submitDoor(door, ownProps.match.params.doorListingId)),
  fetchFormOptions: () => dispatch(fetchDoorOrderOptions()),
  fetchDoors: () => dispatch(fetchDoors(ownProps.match.params.doorListingId)),
  updateDoorForm: (door) => dispatch(updateDoorForm(door)),
  updateDoorTags: (tags) => dispatch(updateDoorTags(tags)),
  updateDoorCommon: (common) => dispatch(updateDoorCommon(common)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoorOrderForm);