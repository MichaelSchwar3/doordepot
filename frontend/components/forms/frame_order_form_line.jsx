import React from 'react';
import Select from 'react-select';
import {
  processForSelect,
  yesNoSelectOptions,
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
import { formatFractions } from './../../util/fraction_util';

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


class FrameOrderFormLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      construction: "",
      heightFeet: "",
      heightInches: "",
      jamb: "",
      ul: false,
      rollBend: "",
      belowFl: "",
      prime: false,
      letter: this.props.letter,
      lhQuantity: "",
      rhQuantity: "",
      widthFeet: "",
      widthInches: "",
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
      if(quantity && (this.state.letter !== "A") && this.state.hinges !== currentFirstDoor.hinges){
        this.setState({
          hinges: currentFirstDoor.hinges,
          // lockset: currentFirstDoor.lockset,
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
                options={yesNoSelectOptions}
                value={find(
                  yesNoSelectOptions,
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
                options={processForSelect(this.frameTypeOptions())}
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
                options={processForSelect(this.doorTypeOptions())}
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
              />
            </Label>
            <Label>
              <Select
                styles={customStyles}
                options={yesNoSelectOptions}
                value={find(
                  yesNoSelectOptions,
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
                options={yesNoSelectOptions}
                value={find(
                  yesNoSelectOptions,
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
              value={this.state.actualWidthDisplay}
              onChange={this.update("actualWidth")}
              className="door-listing-input disabled"
              disabled={true}
            />
          </Label>
          <Label>
            <Input
              type="text"
              value={this.state.actualHeightDisplay}
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

export default FrameOrderFormLine;