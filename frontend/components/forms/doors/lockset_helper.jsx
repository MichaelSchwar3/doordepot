import React from "react";
import styled from 'styled-components';

const OneSixOne = styled.div`
  position: absolute;
  top: ${(props) => props.top ? props.top : "180px"};
  left: 83px;
  width: 20px;
  height: 20px;
  background-image: ${(props) => `url(${props.url})`};
  color: black;
  z-index: 2;
`;
const Apartment = styled.div`
  position: absolute;
  top: 170px;
  left: 83px;
  width: 20px;
  height: 60px;
  background-image: ${(props) => `url(${props.url})`};
  color: black;
  z-index: 2;
`;

const DoubleOneSixOne = () => {
  return (
    <>
      <OneSixOne url={window.oneSixOneUrl} />
      <OneSixOne url={window.oneSixOneUrl} top={"108px"} />
    </>
  )
}

const LocksetHelper = (props) => {
  const { lockset } = props;
  if(!lockset) return null;
    const locks = {
      "161 Lock": <OneSixOne url={window.oneSixOneUrl} />,
      "DBL 161 Lock": <DoubleOneSixOne />,
      "Panic & Trim": <OneSixOne url={window.oneSixOneUrl} />,
      "SVR & Trim": <OneSixOne url={window.oneSixOneUrl} />,
      "Mortise Panic": <OneSixOne url={window.oneSixOneUrl} />,
      "Apartment": <Apartment url={window.apartmentLocklUrl} />,
      "Mortise": <Apartment url={window.apartmentLocklUrl} />,
    }

    return (
      <>
        {locks[lockset]}
      </>
    );

}

export default LocksetHelper;