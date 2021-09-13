import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PrevCard from "./components/Cards/PrevCard";
import CurrentCard from "./components/Cards/CurrentCard";

const CardWrapper = styled.div`
  max-width: 800px;
  position: relative;
`;

interface IDrawnCard {
  code: string;
  image: string;
  images: unknown;
  suit: string;
  value: string;
}

interface IObjectKeys {
  [key: string]: string | number | undefined;
}

interface IObj extends IObjectKeys {
  ACE?: number;
  KING?: number;
  QUEEN?: number;
  JACK?: number;
}

const obj: IObj = {
  ACE: 14,
  KING: 13,
  QUEEN: 12,
  JACK: 11,
};

const Cards = () => {
  const [cards, setCards] = useState<IDrawnCard[]>([]);
  const [drawnCards, setDrawnCards] = useState<IDrawnCard[] | any>([]);
  const [drawnCard, setDrawnCard] = useState<IDrawnCard>();
  const [score, setScore] = useState(0);
  const [scoreText, setScoreText] = useState("");
  const [prevCardValue, setPrevCardValue] = useState<
    number | undefined | string
  >();
  const ref = useRef<any>();

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

  const drawNewCard = (guess: string) => {
    const copy = [...cards];
    const updatedCards: undefined | IDrawnCard = copy?.shift();
    const processedCard: number | undefined | string =
      updatedCards && obj[updatedCards?.value]
        ? obj[updatedCards?.value]
        : updatedCards?.value;

    setCards(copy);
    setPrevCardValue(processedCard);
    setDrawnCards([...drawnCards, updatedCards]);
    setDrawnCard(updatedCards);
    compareHandler(guess, processedCard);
  };

  const compareHandler = (
    guess: string,
    current: number | undefined | string
  ) => {
    let isLower = current ? current < (prevCardValue ? prevCardValue : "") : "";
    let isGuessLower = guess === "low";

    if (
      (isLower && isGuessLower) ||
      (!isLower && !isGuessLower && drawnCards?.length > 1)
    ) {
      setScore((state) => state + 1);
      setScoreText("Nice one! One point for you!");
    } else if (drawnCards?.length < 1) {
      setScoreText("");
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
            drawNewCard("");
          }}
        >
          Get cards
        </button>
      )}
      <p>{scoreText}</p>
      <p>Remaining cards in deck: {cards?.length}</p>
      <p>Your score: {score}</p>
      <PrevCard prevCard={ref?.current?.image} />

      <CardWrapper>
        <p>Current card</p>
        {drawnCards?.map((item: IDrawnCard, i: number) => (
          <CurrentCard key={i} image={item?.image} />
        ))}
      </CardWrapper>
    </>
  );
};

export default Cards;
