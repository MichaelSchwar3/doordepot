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
import FrameOrderFormLine from './frame_order_form_line'
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
      strike: "",
      anchors: "",
      type: "",
      gauge: "",
      material: "",
      profile: "",
      headTrim: "",
      rabbets: "",
      sameTrim: "",
      firstHinge: "",
      firstHingeDisplay: "",
      secondHinge: "",
      secondHingeDisplay: "",
      thirdHinge: "",
      thirdHingeDisplay: "",
      fourthdHinge: "",
      fourthdHingeDisplay: "",
      silencers: false,
      silencerQuantity: "",
      miscNotes: "",
      hardwareNotes: "",
      centerStrike: "",

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

  update(field) {
    return (e) => {
      return this.setState({
        [field]: e.currentTarget.value,
      });
    };
  }
  
  updateDebounce(value, field) {
    this.setState({ [field]: value });
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

  frameLines() {
    const { updateDoorForm, form } = this.props
    const firstDoor = isEmpty(form) ? {} : form["A"]
    return ["A","B","C","D","E","F"].map( letter => (
      <FrameOrderFormLine 
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
            <ColumnTitle> Line</ColumnTitle>
            <ColumnTitle> Construction</ColumnTitle>
            <ColumnTitle> LH Quantity</ColumnTitle>
            <ColumnTitle> RH Quantity</ColumnTitle>
            <ColumnTitle> Width Feet</ColumnTitle>
            <ColumnTitle> Width Inches</ColumnTitle>
            <ColumnTitle> Height Feet</ColumnTitle>
            <ColumnTitle> Height Inches</ColumnTitle>
            <ColumnTitle> Jamb Width</ColumnTitle>
            <ColumnTitle> UL Label</ColumnTitle>
            <ColumnTitle> Roll Bend</ColumnTitle>
            <ColumnTitle> Below Fl.</ColumnTitle>
            <ColumnTitle> Prime</ColumnTitle>
          </Row>
          {this.frameLines()}
            <SubmitButton onClick={this.handleSubmit}> {this.props.door && this.props.door.id ? "Update" : "Submit"} </SubmitButton>
            <HingeOverride onClick={this.hingeOverRide}> Hinge Override: {this.state.hingeOverRide ? "True" : "False"}</HingeOverride>

          <MiddleSection>
            
          </MiddleSection>
          <BottomSection>
              
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