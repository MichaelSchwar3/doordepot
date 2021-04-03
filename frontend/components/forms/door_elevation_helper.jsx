import React from "react";
import styled from 'styled-components';

const NarrowVision = styled.div`
  position: absolute;
  top: 30px;
  left: 100px;
  width: 40px;
  height: 120px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;
const DoubleVision = styled.div`
  position: absolute;
  top: 30px;
  left: ${(props) => props.left ? props.left : "100px"};
  width: 40px;
  height: 275px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;
const SquareVision = styled.div`
  position: absolute;
  top: 30px;
  left: 153px;
  width: 50px;
  height: 50px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;
const CircleVision = styled.div`
  position: absolute;
  top: 30px;
  left: 153px;
  width: 50px;
  height: 50px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  border-radius: 50%;
  z-index: 5;
`;
const DiamondVision = styled.div`
  position: absolute;
  top: 30px;
  left: 153px;
  width: 50px;
  height: 50px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  transform: rotate(45deg);
  z-index: 5;
`;
const RectangleVision = styled.div`
  position: absolute;
  top: 30px;
  left: 138px;
  width: 75px;
  height: 100px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;
const Full = styled.span`
  position: absolute;
  top: 30px;
  left: 100px;
  width: 145px;
  height: 275px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;
const SquareLouver = styled.span`
  position: absolute;
  top: 250px;
  left: 153px;
  width: 50px;
  height: 50px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;
const RectangleLouver = styled.span`
  position: absolute;
  top: 250px;
  left: 100px;
  width: 145px;
  height: 50px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;
const HalfFull = styled.span`
  position: absolute;
  top: 30px;
  left: 100px;
  width: 145px;
  height: 150px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;

const BottomPanel = styled.span`
  position: absolute;
  top: 225px;
  left: 100px;
  width: 145px;
  height: 70px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;
const TopFourPanel = styled.span`
  position: absolute;
  top: 30px;
  left: ${(props) => props.left ? props.left : "100px"};
  width: 40px;
  height: 150px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;
const BottomFourPanel = styled.span`
  position: absolute;
  top: 225px;
  left: ${(props) => props.left ? props.left : "100px"};
  width: 40px;
  height: 70px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;
const Panel = styled.span`
  position: absolute;
  top: ${(props) => props.top ? props.top : "30px"};
  left: ${(props) => props.left ? props.left : "100px"};
  width: 40px;
  height: 40px;
  background-image: ${(props) => `url(${props.url})`};
  border: 2px solid lightgray;
  color: black;
  z-index: 5;
`;



const DoubleVisionComponent = () => {
  return (
      <>
        <DoubleVision url={window.visionUrl} />
        <DoubleVision url={window.visionUrl} left="200px" />
      </>
  )
}
const VisionLouver = () => {
  return (
      <>
        <HalfFull url={window.visionUrl} />
        <RectangleLouver url={window.louverUrl} />
      </>
  )
}

const TwoPanel = () => {
  return (
    <>
        <HalfFull url={window.panelUrl} />
        <BottomPanel url={window.panelUrl} />
    </>
  )
}
const FourPanel = () => {
  return (
      <>
        <TopFourPanel url={window.panelUrl} />
        <TopFourPanel url={window.panelUrl} left="200px" />
        <BottomFourPanel url={window.panelUrl} />
        <BottomFourPanel url={window.panelUrl} left="200px" />
      </>
  )
}

const SixPanel = () => {
  return (
      <>
        <Panel url={window.panelUrl} />
        <Panel url={window.panelUrl} left="200px" />
        <Panel url={window.panelUrl} top={"130px"} />
        <Panel url={window.panelUrl} top={"130px"} left="200px" />
        <Panel url={window.panelUrl} top={"240px"}/>
        <Panel url={window.panelUrl} top={"240px"} left="200px" />
      </>
  )
}
const DoorElevationHelper = (props) => {
  const { doorType } = props;
  if(!doorType) return null;
    const elevationType = doorType.slice(3);
    const descriptor = elevationType.split(" ")[0];
    if(["Flush", "Misc"].includes(descriptor)) return null;

    const elevations = {
      "Narrow Vision": <NarrowVision url={window.visionUrl} />,
      "Square Vision": <SquareVision url={window.visionUrl} />,
      "Diamond Vision": <DiamondVision url={window.visionUrl} />,
      "Circle Vision": <CircleVision url={window.visionUrl} />,
      "Rectangle Vision": <RectangleVision url={window.visionUrl} />,
      "Full Vision": <Full url={window.visionUrl} />,
      "Double Vision": <DoubleVisionComponent />,
      "Square Louver": <SquareLouver url={window.louverUrl} />,
      "Rectangle Louver": <RectangleLouver url={window.louverUrl} />,
      "Full Louver": <Full url={window.louverUrl} />,
      "Vision Louver": <VisionLouver />,
      "1 Panel": <Full url={window.panelUrl} />,
      "2 Panel": <TwoPanel />,
      "4 Panel": <FourPanel />,
      "6 Panel": <SixPanel />
    }

    return (
      <>
        {elevations[elevationType]}
      </>
    );

}

export default DoorElevationHelper;