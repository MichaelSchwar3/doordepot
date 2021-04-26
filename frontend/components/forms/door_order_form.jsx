import { connect } from 'react-redux';
import { submitDoor, fetchDoors } from '../../actions/door_actions';
import { updateDoorForm, updateDoorTags, updateDoorCommon } from '../../actions/door_form_actions';
import React from 'react';
import Select from 'react-select';
import {
  processForSelect,
  doorHingeHelper,
  yesNoSelectOptions,
  customFixedStyles,
  calculateCsLocation,
  calculateLockLocation,
  calculateLockSizeWidth,
  calculateLockSizeHeight,
  calculateTopCsLocation,
  calculateLockBackset,
  calculateHingeBackset,
  depotOthersSelectOptions,
  wideSideNarrowSideSelectOptions,
  inactiveHelper
} from "../shared/helpers";
import { fetchDoorOrderOptions } from '../../actions/door_order_actions';
import { Input, TextAreaInput } from '../shared/styled/inputs';
import { find, isEmpty } from 'lodash';
import { getDoors } from '../../selectors/door_selectors'
import styled from 'styled-components';
import DoorOrderFormLine from './door_order_form_line'
import DoorOrderTagLine from './door_order_tag_line'
import DoorOrderSheetLine from './door_order_sheet_line'
import { DebounceInput } from 'react-debounce-input';
import DoorElevationHelper from './door_elevation_helper';
import LocksetHelper from './lockset_helper';
import { formatFractions } from './../../util/fraction_util';

const DoorImage = styled.img`
  position: relative;
  width: 350px;
`;

export const Container = styled.div`
  width: 100%;
  position: relative;
  display flex;
  flex-direction: column;
  max-width: 1280px;
  margin: auto;
`

const SubmitButton = styled.button`
  position: absolute;
  left: -160px;
  top: 80px;
  background: black;
  color: white;
  width: 100px;
  height: 75px;
  text-align: center;
  margin-left: 175px;
`;
const HingeOverride = styled.button`
  position: absolute;
  left: -160px;
  top: 160px;
  background: black;
  color: white;
  width: 100px;
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
  grid-template-columns: 15% 85%;
  border: 1px solid black;
`
const VisionContainer = styled.div`
  width: 70%;
  margin: auto;
  border: 1px solid black;
`;

const VisionRow = styled.div`
  display: grid;
  grid-template-columns: 30% 20% 50%;
  border-left:1px solid black;
  border-top:1px solid black;
`;
const ElevationNotesRow = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  border-left:1px solid black;
  border-top:1px solid black;
`;

const VisionRowCutOut = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 10% 30%;
  border-left:1px solid black;
  border-top:1px solid black;
`;

const VisionRowDiv = styled.div`
  text-align: center;
  border-left:1px solid black;
  border-top:1px solid black;
`;


const HalfFixedLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 10px;
  height: 35px;
  border-right:1px solid black;
  border-bottom:1px solid black;
  justify-content: center;
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
      csLocationDisplay: "",
      elevationHeight: "",
      elevationWidth: "",
      elevationNotes: "",
      dateRequired: "",
      dateCompleted: "",
      deliver: false,
      fetching: true,
      firstHinge: "",
      firstHingeDisplay: "",
      fourthHinge: "",
      fourthHingeDisplay: "",
      glass: false,
      glassBy: "",
      hingeBackset: "",
      hingeSize: "4.5",
      hingeWidth: "",
      hinges: "",
      inactiveTop: "",
      inactiveTopLock: "",
      inactiveBotLock: "",
      inactiveBot: "",
      inactiveTopDisplay: "",
      inactiveTopLockDisplay: "",
      inactiveBotLockDisplay: "",
      inactiveBotDisplay: "",
      initialLoad: true,
      kit: false,
      kitBy: "",
      lockBackset: "",
      lockLocation: "",
      lockLocationDisplay: "",
      lockSizeHeightBot: "",
      lockSizeHeightTop: "",
      lockSizeWidthBot: "",
      lockSizeWidthTop: "",
      lockset: "",
      molding: "",
      moldingBy: "",
      phoneNumber: "",
      prime: false,
      secondHinge: "",
      secondHingeDisplay: "",
      sheetNotes: "",
      skidUp: false,
      thirdHinge: "",
      thirdHingeDisplay: "",
      topCsLocation: "",
      topCsLocationDisplay: "",
      topLockLocation: "",
      topLockLocationDisplay: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hingeOverRide = this.hingeOverRide.bind(this);
    this.setInactive = this.setInactive.bind(this);
  }

  componentDidMount() {
    const fetchFormOptions = async () => {
      await this.props.fetchFormOptions();
      await this.props.fetchDoors()
      this.updateSheetFromProps()
      this.setState({ fetching: false });
      this.initialCalculations()
    };
    fetchFormOptions();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevForm = prevProps.form;
    const { form, updateDoorCommon } = this.props;
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
    if (this.shouldInactiveChange(prevProps, this.props)) {
      this.setInactive()
    }
    if (this.shouldTopLockLocationChange(prevDoor, currentDoor, prevState)) {
      console.log("should top lock change - yes")
      this.calculateTopLockLocation()
    }
    if (this.shouldCommonUpdate(prevState)) {
      updateDoorCommon(this.state)
    }
    
    if (this.state.initialLoad){
      this.setState({initialLoad: false})
    }
  }

  updateSheetFromProps() {
    const updateSheet = async () => {
      await this.setState({
        elevationHeight: this.props.doors["A"].elevationHeight,
        elevationWidth: this.props.doors["A"].elevationWidth,
        dateRequired: this.props.doors["A"].dateRequired,
        dateCompleted: this.props.doors["A"].dateCompleted,
        deliver: this.props.doors["A"].deliver,
        glass: this.props.doors["A"].glass,
        glassBy: this.props.doors["A"].glassBy,
        kit: this.props.doors["A"].kit,
        kitBy: this.props.doors["A"].kitBy,
        molding: this.props.doors["A"].molding,
        moldingBy: this.props.doors["A"].moldingBy,
        phoneNumber: this.props.doors["A"].phoneNumber,
        prime: this.props.doors["A"].prime,
        sheetNotes: this.props.doors["A"].sheetNotes,
        skidUp: this.props.doors["A"].skidUp,
        hingeSize: this.props.doors["A"].hingeSize,
        hingeSize: this.props.doors["A"].hingeSize,
        hinges: this.props.doors["A"].hinges,
        hingeWidth: this.props.doors["A"].hingeWidth
      })
    };
    if(this.props.doors["A"]){
      updateSheet();
    }
  }

  initialCalculations() {
    console.log("initialcalculations")
    this.calculateHinges();
    this.calculateHingeWidth();
    this.calculateLockInputs();
    this.calculateLockSizeBot();
    this.calculateTopLockLocation();
  }

  shouldActualSizesChange(prevDoor, currentDoor) {
    if (this.state.initialLoad) {
      return true
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

  shouldTopLockLocationChange(prevDoor, currentDoor, prevState) {

    if (this.state.initialLoad) {
      return true
    }
    if (prevState.lockSizeHeightTop !== this.state.lockSizeHeightTop) {
      return true;
    }
    if (prevState.csLocation !== this.state.csLocation) {
      return true;
    }
    if (prevDoor.lockset !== currentDoor.lockset) {
      return true;
    }
    return false;
  }

  shouldLockSizeChange(prevDoor, currentDoor) {
    if (this.state.initialLoad) {
      return true
    }
    if (prevDoor.lockset !== currentDoor.lockset) {
      return true;
    }
    return false;
  }

  shouldHingeLocationsChange(prevForm, form, prevState, newState) {
    const prevDoor = prevForm["A"]
    const currentDoor = form["A"]
    if (this.state.initialLoad) {
      return true
    }
    if (this.state.hingeOverride) { return false }
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
    if (this.state.initialLoad) {
      return true
    }
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

  shouldCommonUpdate(prevState) {
    const fields = "dateCompleted dateRequired deliver elevationHeight elevationWidth glass glassBy kit kitBy lockset molding moldingBy phoneNumber prime sheetNotes skidUp ".split(" ")
    return fields.map( field => {
      if(prevState[field] !== this.state[field]) {
        return true;
      }
      return false;
    }).some( element => element === true )
  }

  shouldInactiveChange(prevProps) {
    const currentInactive = ["A", "B", "C", "D", "E", "F"].some( letter => (
      this.props.form[letter].lockset === "Inactive"
    ));
    const prevInactive = ["A", "B", "C", "D", "E", "F"].some( letter => (
      prevProps.form[letter].lockset === "Inactive"
    ));
    return prevInactive !== currentInactive;
  }

  setInactive() {
    const inactive = ["A", "B", "C", "D", "E", "F"].some( letter => (
      this.props.form[letter].lockset === "Inactive"
    ));

    const inactiveMeasurements = inactiveHelper(inactive, this.state.csLocation, this.state.topCsLocation, this.height())
    this.setState({
      inactiveTop: inactiveMeasurements.top,
      inactiveTopLock: inactiveMeasurements.topLock,
      inactiveBotLock: inactiveMeasurements.botLock,
      inactiveBot: inactiveMeasurements.bot,
      inactiveTopDisplay: formatFractions(inactiveMeasurements.top),
      inactiveTopLockDisplay: formatFractions(inactiveMeasurements.topLock),
      inactiveBotLockDisplay: formatFractions(inactiveMeasurements.botLock),
      inactiveBotDisplay: formatFractions(inactiveMeasurements.bot),
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.props
    const submit = async () => {
      const order = Object.assign({}, form);
      await this.props.submitDoor(order);
      this.props.history.push(`/orders/${this.props.orderId}`);
    };
    submit();
  }

  hingeOverRide(e) {
    e.preventDefault();
    this.setState({
      hingeOverRide: !this.state.hingeOverRide
    })
  }

  update(field) {
    return (e) => {
      return this.setState({
        [field]: e.currentTarget.value,
      });
    };
  }
  updateHingOverride(field, fieldDisplay) {
    return (e) => {
      const value = e.currentTarget.value;
      return this.setState({
        [field]: value,
        [fieldDisplay]: formatFractions(e.currentTarget.value),
      });
    };
  }
  updateDebounce(value, field) {
    this.setState({ [field]: value });
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
      csLocationDisplay: formatFractions(newCsLocation),
      lockLocation: newLockLocation,
      lockLocationDisplay: formatFractions(newLockLocation)
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
    const { lockset, frameType } = currentDoor;
    const topCsLocation = calculateTopCsLocation(lockset, calculateCsLocation(this.height(), lockset, frameType));

    const topLockLocation =
      topCsLocation && this.state.lockSizeHeightTop
        ? topCsLocation - this.state.lockSizeHeightTop / 2.0
        : "";
    this.setState({
      topCsLocation: topCsLocation,
      topCsLocationDisplay: formatFractions(topCsLocation),
      topLockLocation: topLockLocation,
      topLockLocationDisplay: formatFractions(topLockLocation)
    });
  }

  calculateHinges() {
    const { form, updateDoorCommon } = this.props
    if(this.state.HingeOverride) return ;
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
      firstHingeDisplay: formatFractions(firstHinge),
      secondHinge: secondHinge,
      secondHingeDisplay: formatFractions(secondHinge),
      thirdHinge: thirdHinge,
      thirdHingeDisplay: formatFractions(thirdHinge),
      fourthHinge: fourthHinge,
      fourthHingeDisplay: formatFractions(fourthHinge),
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
        key={`line-${letter}`}
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
    const { formOptions, form } = this.props;
    const doorType = form['A'] ? form['A'].doorType : "";
    const lockset = form['A'] ? form['A'].lockset : "";
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
              <DebounceInput element={Input}
                type="text"
                value={this.state.phoneNumber}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "phoneNumber")}
                className="door-listing-input"
              />
            </HeaderDiv>
            <HeaderDiv>
              Date Required
            </HeaderDiv>
            <HeaderDiv>
              <DebounceInput element={Input}
                type="text"
                value={this.state.dateRequired}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "dateRequired")}
                className="door-listing-input"
              />
            </HeaderDiv>
            <HeaderDiv>
              Date Completed
            </HeaderDiv>
            <HeaderDiv>
              <DebounceInput element={Input}
                type="text"
                value={this.state.dateCompleted}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "dateCompleted")}
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
                options={yesNoSelectOptions}
                value={find(
                  yesNoSelectOptions,
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
                options={yesNoSelectOptions}
                value={find(
                  yesNoSelectOptions,
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
            <HingeOverride onClick={this.hingeOverRide}> Hinge Override: {this.state.hingeOverRide ? "True" : "False"}</HingeOverride>

          <MiddleSection>
            <DoorImageContainer>
              <DoorImage src={window.doorUrl} />
              <DoorElevationHelper doorType={doorType} />
              <LocksetHelper lockset={lockset} />
              <HingeInput
                top={"0px"}
                value={this.state.firstHingeDisplay}
                className="disabled"
                onChange={this.updateHingOverride("firstHinge", "firstHingeDisplay")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"80px"}
                value={this.state.secondHingeDisplay}
                className="disabled"
                onChange={this.updateHingOverride("secondHinge", "secondHingeDisplay")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"161px"}
                value={this.state.thirdHingeDisplay}
                className="disabled"
                onChange={this.updateHingOverride("thirdHinge", "thirdHingeDisplay")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"263px"}
                value={this.state.fourthHingeDisplay}
                className="disabled"
                onChange={this.updateHingOverride("fourthHinge", "fourthHingeDisplay")}
                disabled={!this.state.hingeOverRide}
              />
              <BacksetInput
                top={"294px"}
                left={"295px"}
                type="text"
                value={this.state.hingeBackset}
                className="disabled"
                onChange={this.update("hingeBackset")}
                disabled={!this.state.hingeOverRide}
              />

              <LockInput
                top={"147px"}
                value={this.state.lockLocationDisplay}
                className="disabled"
                onChange={this.update("lockLocation")}
                disabled={!this.state.hingeOverRide}
              />
              <LockInput
                top={"80px"}
                value={this.state.topLockLocationDisplay}
                className="disabled"
                onChange={this.update("topLockLocation")}
                disabled={!this.state.hingeOverRide}
              />
              <BacksetInput
                top={"180px"}
                left={"-7px"}
                type="text"
                value={this.state.lockBackset}
                className="disabled"
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
                <span style={{borderRight: '1px solid black'}}>Notes</span>
                <DebounceInput element={Input}
                type="text"
                value={this.state.sheetNotes}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "sheetNotes")}
                className="door-listing-input"
              />
              </SheetNotesDiv>
              <VisionContainer>
                <div style={{textAlign: "center"}}>Door Elevations</div>
                <div style={{textAlign: "center"}}>Cut Out Size</div>
                <VisionRowCutOut>
                  <VisionRowDiv>Size</VisionRowDiv>
                  <DebounceInput element={Input}
                    type="number"
                    min="0"
                    style={{borderLeft: "1px solid black", borderTop: "1px solid black"}}
                    value={this.state.elevationWidth}
                    debounceTimeout={300}
                    onChange={(event) => 
                      this.updateDebounce(event.target.value, "elevationWidth")}
                    className="door-listing-input"
                  />
                  <VisionRowDiv>X</VisionRowDiv>             
                  <DebounceInput element={Input}
                    type="number"
                    min="0"
                    style={{borderLeft: "1px solid black", borderTop: "1px solid black"}}
                    value={this.state.elevationHeight}
                    debounceTimeout={300}
                    onChange={(event) => 
                      this.updateDebounce(event.target.value, "elevationHeight")}
                    className="door-listing-input"
                  />
                </VisionRowCutOut>
                <VisionRow>
                  <VisionRowDiv>Kit</VisionRowDiv>
                  <VisionRowDiv>
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
                  </VisionRowDiv>
                  <VisionRowDiv>
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
                  </VisionRowDiv>
                </VisionRow>
                <VisionRow>
                  <VisionRowDiv>Molding</VisionRowDiv>
                  <VisionRowDiv>
                    <Select
                      styles={customFixedStyles}
                      options={wideSideNarrowSideSelectOptions}
                      onChange={this.updateSelect("molding")}
                      value={find(
                        wideSideNarrowSideSelectOptions,
                        (obj) => obj.value === this.state.molding
                      )}
                      isSearchable={false}
                      components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    />
                  </VisionRowDiv>
                  <VisionRowDiv>
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
                  </VisionRowDiv>
                </VisionRow>
                <VisionRow>
                  <VisionRowDiv>Glass</VisionRowDiv>
                  <VisionRowDiv>
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
                  </VisionRowDiv>
                  <VisionRowDiv>
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
                  </VisionRowDiv>
                </VisionRow>
                <ElevationNotesRow>
                  <VisionRowDiv>
                    Elevation Notes:
                  </VisionRowDiv>
                  <VisionRowDiv>
                    <DebounceInput element={TextAreaInput}
                      type="text"
                      value={this.state.elevationNotes}
                      debounceTimeout={300}
                      onChange={(event) => 
                        this.updateDebounce(event.target.value, "elevationNotes")}
                    />
                  </VisionRowDiv>
                </ElevationNotesRow>
              </VisionContainer>
            </SheetSizeContainer>
            <DoorImageContainer>
              <DoorImage src={window.inactiveDoorUrl} />
              <DoorElevationHelper doorType={doorType} />
              {/* <LocksetHelper lockset={lockset} /> */}
              <HingeInput
                top={"3px"}
                value={this.state.firstHingeDisplay}
                className="disabled"
                onChange={this.update("firstHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"86px"}
                value={this.state.secondHingeDisplay}
                className="disabled"
                onChange={this.update("secondHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"167px"}
                value={this.state.thirdHingeDisplay}
                className="disabled"
                onChange={this.update("thirdHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <HingeInput
                top={"272px"}
                value={this.state.fourthHinge}
                className="disabled"
                onChange={this.update("fourthHinge")}
                disabled={!this.state.hingeOverRide}
              />
              <LockInput
                top={"20px"}
                left={"-20px"}
                value={this.state.inactiveTopDisplay}
                className="disabled"
                onChange={this.update("inactiveTop")}
                disabled={!this.state.hingeOverRide}
              />

              <LockInput
                top={"80px"}
                left={"-20px"}
                value={this.state.inactiveTopLockDisplay}
                className="disabled"
                onChange={this.update("inactiveTopLock")}
                disabled={!this.state.hingeOverRide}
              />
              <LockInput
                top={"146px"}
                left={"-20px"}
                value={this.state.inactiveBotLockDisplay}
                className="disabled"
                onChange={this.update("inactiveBotLock")}
                disabled={!this.state.hingeOverRide}
              />
              <LockInput
                top={"300px"}
                left={"-20px"}
                value={this.state.inactiveBotDisplay}
                className="disabled"
                onChange={this.update("inactiveBot")}
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
                  <DebounceInput element={Input}
                    type="text"
                    value={this.state.lockSizeWidthBot}
                    debounceTimeout={300}
                    onChange={(event) => 
                      this.updateDebounce(event.target.value, "lockSizeWidthBot")}
                    className="door-listing-input"
                  />
                </HalfFixedLabel>
                <HalfFixedLabel> X </HalfFixedLabel>
                <HalfFixedLabel>
                  <DebounceInput element={Input}
                    type="text"
                    value={this.state.lockSizeHeightBot}
                    debounceTimeout={300}
                    onChange={(event) => 
                      this.updateDebounce(event.target.value, "lockSizeHeightBot")}
                    className="door-listing-input"
                  />
                </HalfFixedLabel>
              </FlexDiv>
              <FlexDivCsLocation>
                <HalfFixedLabel>CS Location</HalfFixedLabel>
                <HalfFixedLabel>
                  <DebounceInput element={Input}
                    type="text"
                    value={this.state.csLocationDisplay}
                    debounceTimeout={300}
                    onChange={(event) => 
                      this.updateDebounce(event.target.value, "csLocation")}
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
                  <DebounceInput element={Input}
                    type="text"
                    value={this.state.topCsLocationDisplay}
                    debounceTimeout={300}
                    onChange={(event) => 
                      this.updateDebounce(event.target.value, "topCsLocation")}
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
  const orderId = doorListing ? doorListing.orderId : "";
  return {
  errors: state.errors,
  formOptions: state.entities.formOptions.doorOrderForm,
  form: state.forms.doorForm,
  doors: getDoors(state.entities.doors),
  doorListingId: ownProps.match.params.doorListingId,
  orderNumber: doorListing ? doorListing.orderNumber : '',
  poNumber: doorListing ? doorListing.poNumber : '',
  orderId
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