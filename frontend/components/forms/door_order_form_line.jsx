import React from 'react';
import Select from 'react-select';
import {
  processForSelect,
  booleanSelectOptions,
  customStyles,
  calculateActualHeight,
  calculateActualWidth,
  calculateWideSideHeight,
  calculateWideSideWidth,
} from "../shared/helpers";
import { Input } from '../shared/styled/inputs';
import { find, isEmpty } from 'lodash';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';

export const Container = styled.div`
  margin: auto;
`

const LeftSection = styled.section`
  display: grid;
  grid-template-columns: repeat(20, 50px);
`;

const Label = styled.label`
  display: flex;
  width: 50px;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  text-align: center;
`;


class DoorOrderFormLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualHeight: "",
      actualWidth: "",
      channelBottom: "",
      channelTop: "",
      construction: "",
      frameType: "",
      heightFeet: "",
      heightInches: "",
      hinges: "",
      hingeOverRide: false,
      letter: this.props.letter,
      lockset: "",
      lhQuantity: "",
      nsHeight: "",
      nsWidth: "",
      prepOnly: false,
      rhQuantity: "",
      seamless: false,
      so: false,
      doorType: "",
      undercut: "",
      widthFeet: "",
      widthInches: "",
      wsHeight: "",
      wsWidth: "",
    };
  }

  componentDidMount() {
    if(isEmpty(this.props.door)) {
      this.props.updateDoorForm(this.state)
    }else {
      this.updateDoorFromProps()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevFirstDoor = prevProps.firstDoor
    const currentFirstDoor = this.props.firstDoor
    if (isEmpty(prevProps.door) && this.props.door.letter){
       return this.updateDoorFromProps()
    }
    if (isEmpty(prevFirstDoor) || isEmpty(currentFirstDoor)) {
      return
    }
  
    if (this.shouldHeightChange(prevFirstDoor, currentFirstDoor)){
      const quantity = parseInt(this.state.lhQuantity) > 0 || parseInt(this.state.rhQuantity) > 0
      if(quantity && (this.state.letter !== "A")){
        this.setState({
          heightFeet: currentFirstDoor.heightFeet,
          heightInches: currentFirstDoor.heightInches,
        })
      }
    }

    if (this.shouldHingeAndLockChange(currentFirstDoor)) {
      const quantity = parseInt(this.state.lhQuantity) > 0 || parseInt(this.state.rhQuantity) > 0
      if(quantity && (this.state.letter !== "A")){
        this.setState({
          hinges: currentFirstDoor.hinges,
          lockset: currentFirstDoor.lockset,
        })
      }
    }
    // if((prevFirstDoor.lockset !== currentFirstDoor.lockset) || (currentFirstDoor.lockset !== this.state.lockset)){
    //   this.setState({
    //     lockset: currentFirstDoor.lockset
    //   },() => this.props.updateDoorForm(this.state))
    // }
    if (this.shouldActualSizesChange(prevState, this.state)) {
      this.calculateActualSizes()
    }
  }

  updateDoorFromProps() {
    const updateDoor = async () => {
      await this.setState({
        actualHeight: this.props.door.actualHeight,
        actualWidth: this.props.door.actualWidth,
        channelBottom: this.props.door.channelBottom,
        channelTop: this.props.door.channelTop,
        construction: this.props.door.construction,
        frameType: this.props.door.frameType,
        heightFeet: this.props.door.heightFeet,
        heightInches: this.props.door.heightInches,
        hingeOverRide: this.props.door.hingeOverRide,
        hinges: this.props.door.hinges,
        lockset: this.props.door.lockset,
        letter: this.props.letter,
        lhQuantity: this.props.door.lhQuantity,
        nsHeight: this.props.door.nsHeight,
        nsWidth: this.props.door.nsWidth,
        prepOnly: this.props.door.prepOnly,
        rhQuantity: this.props.door.rhQuantity,
        seamless: this.props.door.seamless,
        so: this.props.door.so,
        doorType: this.props.door.doorType,
        undercut: this.props.door.undercut,
        widthFeet: this.props.door.widthFeet,
        widthInches: this.props.door.widthInches,
        wsHeight: this.props.door.wsHeight,
        wsWidth: this.props.door.wsWidth,
      })
      this.props.updateDoorForm(this.state)
    };
    updateDoor();
  }

  shouldHeightChange(prevDoor) {
    if(prevDoor.heightFeet !== this.state.heightFeet){
      return true
    }else if(prevDoor.heightInches !== this.state.heightInches){
      return true
    }else {
      return false;
    }
  }

  initialCalculations() {
    this.calculateActualSizes();
  }

  shouldHingeAndLockChange(currentFirstDoor) {
    if(currentFirstDoor.hinges !== this.state.hinges) return true;
    if(currentFirstDoor.lockset !== this.state.lockset) return true;
    return false;
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
      return true;
    }
    return false;
  }

  update(field) {
    return (e) => {
      const updateField = async () => {
        await this.setState({ [field]: e.currentTarget.value, });
        this.props.updateDoorForm(this.state)
      };
      updateField()
    };
  }

  updateDebounce(value, field) {
    const updateField = async () => {
      await this.setState({ [field]: value });
      this.props.updateDoorForm(this.state)
    }
    updateField()
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
      return ;
    }
    if(isEmpty(frameType)) { return };
    const height = calculateActualHeight(
      this.height(),
      undercut,
      frameType
    ) || 0;
    const width = calculateActualWidth(this.width(), hinges, frameType) || 0;
    const wideSideHeight = calculateWideSideHeight(doorType, height) || 0;
    const wideSideWidth = calculateWideSideWidth(doorType, width) || 0;
    const narrowSideWidth = wideSideWidth ? wideSideHeight - 4 : "" || 0;
    const narrowSideHeight = wideSideHeight || 0;
    this.setState({
      actualWidth: width,
      actualHeight: height,
      wsHeight: wideSideHeight,
      wsWidth: wideSideWidth,
      nsHeight: narrowSideHeight,
      nsWidth: narrowSideWidth,
    });
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
      const updateField = async () => {
        await this.setState({ [field]: e.value, });;
        this.props.updateDoorForm(this.state)
      };
      updateField()
    };
  }
  // renderErrors() {
  //   if (this.props.errors.session) {
  //     return (
  //       <ul>
  //         {this.props.errors.session.map((error, idx) => {
  //           return <li key={`error-${idx}`}>{error}</li>;
  //         })}
  //       </ul>
  //     );
  //   }
  // }

  doorInputs() {
    const { formOptions } = this.props;
    const disabledInput = this.state.letter !== "A"

    return (
      <>
          <LeftSection>
            <Label>
              <div style={{textAlign: "center"}}>{this.props.letter}</div>
            </Label>
            <Label>
              <DebounceInput element={Input}
                type="number"
                min="0"
                value={this.state.lhQuantity}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "lhQuantity")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              <DebounceInput element={Input}
                type="number"
                min="0"
                value={this.state.rhQuantity}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "rhQuantity")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={booleanSelectOptions}
                value={find(
                  booleanSelectOptions,
                  (obj) => obj.value === this.state.so
                )}
                onChange={this.updateSelect("so")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.frame_types)}
                value={find(
                  processForSelect(formOptions.frame_types),
                  (obj) => obj.value === this.state.frameType
                )}
                onChange={this.updateSelect("frameType")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              />
            </Label>
            <Label>
              <DebounceInput element={Input}
                type="number"
                min="0"
                value={this.state.widthFeet}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "widthFeet")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              <DebounceInput element={Input}
                type="number"
                min="0"
                value={this.state.widthInches}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "widthInches")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              <DebounceInput element={Input}
                type="number"
                min="0"
                value={this.state.heightFeet}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "heightFeet")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              <DebounceInput element={Input}
                type="number"
                min="0"
                value={this.state.heightInches}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "heightInches")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              <DebounceInput element={Input}
                type="number"
                min="0"
                value={this.state.undercut}
                debounceTimeout={300}
                onChange={(event) => 
                  this.updateDebounce(event.target.value, "undercut")}
                className="door-listing-input"
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.channels)}
                value={find(
                  processForSelect(formOptions.channels),
                  (obj) => obj.value === this.state.channelTop
                )}
                onChange={this.updateSelect("channelTop")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.channels)}
                value={find(
                  processForSelect(formOptions.channels),
                  (obj) => obj.value === this.state.channelBottom
                )}
                onChange={this.updateSelect("channelBottom")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.types)}
                onChange={this.updateSelect("doorType")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.constructions)}
                value={find(
                  processForSelect(formOptions.constructions),
                  (obj) => obj.value === this.state.construction
                )}
                onChange={this.updateSelect("construction")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.hinges)}
                value={find(
                  processForSelect(formOptions.hinges),
                  (obj) => obj.value === this.state.hinges
                )}
                onChange={this.updateSelect("hinges")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                isDisabled={disabledInput}
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={processForSelect(formOptions.locksets)}
                value={find(
                  processForSelect(formOptions.locksets),
                  (obj) => obj.value === this.state.lockset
                )}
                onChange={this.updateSelect("lockset")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                isDisabled={disabledInput}
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={booleanSelectOptions}
                value={find(
                  booleanSelectOptions,
                  (obj) => obj.value === this.state.prepOnly
                )}
                onChange={this.updateSelect("prepOnly")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={booleanSelectOptions}
                value={find(
                  booleanSelectOptions,
                  (obj) => obj.value === this.state.seamless
                )}
                onChange={this.updateSelect("seamless")}
                isSearchable={false}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              />
            </Label>
          <Label>
            <Input
              type="text"
              value={this.state.actualWidth}
              onChange={this.update("actualWidth")}
              className="door-listing-input disabled"
              disabled={true}
            />
          </Label>
          <Label>
            <Input
              type="text"
              value={this.state.actualHeight}
              onChange={this.update("actualHeight")}
              className="door-listing-input disabled"
              disabled={true}
            />
          </Label>

          </LeftSection>
      </>
    );
  }

  render() {
    if (!this.props.formOptions) return null;

    return (
      <Container>
        {this.doorInputs()}
        {/* <span id="door-order-form-errors">{this.renderErrors()}</span> */}
      </Container>
    );
  }
}

export default DoorOrderFormLine;