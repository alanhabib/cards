import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  max-width: 800px;
  position: relative;
`;

const CardContainer = styled.div`
  max-width: 350px;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  top: 16;
  margin: 10px;
`;

const obj = {
  ACE: 14,
  KING: 13,
  QUEEN: 12,
  JACK: 11,
};

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [drawnCard, setDrawnCard] = useState();
  const [score, setScore] = useState(0);
  const [scoreText, setScoreText] = useState("");
  const ref = useRef();

  useEffect(() => {
    ref.current = drawnCard;
  }, [drawnCard]);

  const getCards = async () => {
    const res = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/"
    );
    const card = await axios.get(
      `https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=52`
    );
    setCards(card?.data?.cards);
  };

  useEffect(() => {
    getCards();
  }, []);

  const drawNewCard = (guess) => {
    const copy = [...cards];
    const updatedCards = copy?.shift();
    const processedCard = obj[updatedCards.value]
      ? obj[updatedCards.value]
      : updatedCards.value;

    setCards(copy);
    setDrawnCards([...drawnCards, updatedCards]);
    setDrawnCard(updatedCards);
    compareHandler(guess, processedCard);
  };

  const compareHandler = (guess, current) => {
    let isLower = current < ref?.current?.value;
    let isGuessLower = guess === "low";

    if (
      (isLower && isGuessLower) ||
      (!isLower && !isGuessLower && drawnCards.length > 1)
    ) {
      setScore((state) => state + 1);
      setScoreText("Nice one! One point for you!");
    } else {
      setScoreText("Your guess was wrong, try again!");
    }
  };

  return (
    <>
      <div>Is next card higher or lower?</div>
      {drawnCards && drawnCards?.length ? (
        <>
          <button
            onClick={() => {
              drawNewCard("low");
            }}
          >
            Low
          </button>
          <button
            onClick={() => {
              drawNewCard("high");
            }}
          >
            High
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            drawNewCard();
          }}
        >
          Get cards
        </button>
      )}
      <p>{scoreText}</p>
      <p>Remaining cards in deck: {cards?.length}</p>
      <p>Your score: {score}</p>
      {ref.current ? (
        <>
          <p>Prev card</p>
          <img width={100} height={150} src={ref?.current?.image} />
        </>
      ) : (
        ""
      )}
      <CardWrapper>
        <p>Current card</p>
        {drawnCards?.map((item, i) => (
          <Card key={i} image={item?.image} />
        ))}
      </CardWrapper>
    </>
  );
};

export default Cards;

export const Card = ({ image }) => {
  return (
    <>
      <CardContainer>{<img src={image} />}</CardContainer>
    </>
  );
};
