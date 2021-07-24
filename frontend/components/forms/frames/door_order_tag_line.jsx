import React from 'react';
import { TagInput } from '../../shared/styled/inputs';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';


const TagsContainer = styled.div`
  display: grid;
  grid-template-columns: 5% 10% 85%;
  height: 50px;
  box-sizing: border-box;
  border-left:1px solid black;
`;
const TagDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  text-align: center;
  justify-content: center;
  box-sizing: border-box;
  border-right:1px solid black;
  border-bottom:1px solid black;
`;
const TagLetter = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-right:1px solid black;
  border-bottom:1px solid black;
`;
const LhTagSpan = styled.span`
  height: 25px;
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
  border-bottom: 1px solid black;
`;
const RhTagSpan = styled.span`
  height: 25px;
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
`;

class DoorOrderTagLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: this.props.letter,
      lhTags: "",
      rhTags: "",
    };
  }

  componentDidMount() {
    this.props.updateDoorTags(this.state)
  }

  componentDidUpdate(prevProps, prevState) {
 
  }

  update(value, field) {
      const updateField = async () => {
        await this.setState({ [field]: value });
        this.props.updateDoorTags(this.state)
      };
      updateField()
  };


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

  tagInputs() {
    return (
      <>
      <TagsContainer>
        <TagDiv>
          {this.props.letter}
        </TagDiv> 
        <TagDiv>
          <LhTagSpan>
            LH Tags
          </LhTagSpan>
          <RhTagSpan>
            RH Tags
          </RhTagSpan>
        </TagDiv>
        <TagDiv>
            <DebounceInput element={TagInput}
              type="text"
              value={this.state.lhTags}
              debounceTimeout={300}
              onChange={(event) => 
                this.update(event.target.value, "lhTags")}
              className="door-listing-input"
            />
            <DebounceInput element={TagInput}
              type="text"
              value={this.state.rhTags}
              debounceTimeout={300}
              onChange={(event) => 
                this.update(event.target.value, "rhTags")}
              className="door-listing-input"
            />
        </TagDiv>
      </TagsContainer>
      </>
    );
  }

  render() {
    return (
      <>
        {this.tagInputs()}
      </>
    );
  }
}

export default DoorOrderTagLine;