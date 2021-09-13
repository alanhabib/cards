import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";

const CardContainer = styled.div`
  max-width: 350px;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  top: 16;
  margin: 10px;
`;

const CurrentCard: React.FunctionComponent<{ image: string }> = (props) => {
  return (
    <Fade>
      <CardContainer>{<img src={props.image} />}</CardContainer>
    </Fade>
  );
};

export default CurrentCard;
