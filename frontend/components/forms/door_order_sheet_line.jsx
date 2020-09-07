import React from 'react';
import { TagInput } from '../shared/styled/inputs';
import { find, isEmpty } from 'lodash';
import styled from 'styled-components';

const SheetSizeLineContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 3fr 1fr 3fr 1fr 3fr;
  height: 35px;
  box-sizing: border-box;
  border-left:1px solid black;
  border-top:1px solid black;
`;

const SheetSizeDiv = styled.div`
  text-align: center;
  font-size: 10px;
  height: 35px;
  box-sizing: border-box;
  padding-top: 8px;
  border-right:1px solid black;
  border-bottom:1px solid black;
`;


class DoorOrderSheetLine extends React.Component {
  constructor(props) {
    super(props);
  }



  sheetInputs() {
    const { door } = this.props
    if(isEmpty(door)) return null;
    return (
      <>
        <SheetSizeLineContainer>
          <SheetSizeDiv>
            {(parseInt(door.lhQuantity) + parseInt(door.rHQuantity)) || ""}
          </SheetSizeDiv>
          <SheetSizeDiv>
            {door.wsWidth}
          </SheetSizeDiv>
          <SheetSizeDiv>
            X
          </SheetSizeDiv>
          <SheetSizeDiv>
            {door.wsHeight}
          </SheetSizeDiv>
          <SheetSizeDiv>
            {(parseInt(door.lhQuantity) + parseInt(door.rHQuantity)) || "" }
          </SheetSizeDiv>
          <SheetSizeDiv>
            {door.nsWidth}
          </SheetSizeDiv>
          <SheetSizeDiv>
            X
          </SheetSizeDiv>
          <SheetSizeDiv>
            {door.nsHeight}
          </SheetSizeDiv>

        </SheetSizeLineContainer>
      </>
    );
  }

  render() {
    return (
      <>
        {this.sheetInputs()}
      </>
    );
  }
}

export default DoorOrderSheetLine;