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
  const [currentCard, setCurrentCard] = useState();
  const [score, setScore] = useState(0);
  const [scoreText, setScoreText] = useState("");
  const [guess, setGuess] = useState("");

  const prev = usePrevious(currentCard);
  const drawn = usePrevious(drawnCard);

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

  const drawNewCard = () => {
    const copy = [...cards];
    const updatedCards = copy?.shift();
    const processedCard = obj[updatedCards.value]
      ? obj[updatedCards.value]
      : updatedCards.value;
    setCurrentCard(processedCard);
    setCurrentCard((state) => {
      console.log(state);
      return state;
    });

    console.log("PREV: ", prev);
    setCards(copy);
    setDrawnCards([...drawnCards, updatedCards]);
    setDrawnCard(updatedCards);
    compareHandler();
  };

  const compareHandler = () => {
    let isLower = currentCard < prev;
    let isGuessLower = guess === "low";
    console.log("ISLOWER: ", isLower);
    console.log("isGUESSLOWER: ", isGuessLower);

    if (
      (isLower && isGuessLower) ||
      (!isLower && !isGuessLower && drawnCards.length > 1)
    ) {
      setScore((state) => state + 1);
      setScoreText("Nice one! One point for you!");
    } else {
      setScoreText("Your guess was wrong, try again!");
    }

    setGuess("");
  };

  return (
    <>
      <div>Is next card higher or lower?</div>
      <p>{guess}</p>
      {drawnCards && drawnCards.length ? (
        <>
          <button
            onClick={() => {
              setGuess("low");
              drawNewCard();
            }}
          >
            Low
          </button>
          <button
            onClick={() => {
              setGuess("high");
              drawNewCard();
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
      {prev ? (
        <>
          <p>Prev card</p>
          <img width={100} height={150} src={drawn?.image} />
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

export const usePrevious = (value) => {
  console.log("VALUE: ", value);
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
