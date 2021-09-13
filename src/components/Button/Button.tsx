import React from "react";
interface DrawNewCardProps {
  drawNewCard: (arg: string) => void;
  text: string;
}
const Button: React.FC<DrawNewCardProps> = ({ drawNewCard, text }) => {
  return (
    <button
      onClick={() => {
        drawNewCard("low");
      }}
    >
      {text}
    </button>
  );
};

export default Button;
