import React from "react";
import { Fade, Slide } from "react-awesome-reveal";

const PrevCard = ({ prevCard }: any) => {
  return (
    <div>
      {prevCard ? (
        <Fade>
          <p>Prev card</p>
          <img width={100} height={150} src={prevCard} />
        </Fade>
      ) : (
        ""
      )}
    </div>
  );
};

export default PrevCard;
