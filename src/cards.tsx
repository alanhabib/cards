import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

// interface ICards {
//   deck_id: string;
//   remaining: number;
//   shuffled: boolean;
//   success: boolean;
// }

// const defaultCards: ICards[] = [];

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  max-width: 350px;
  border-radius: 8px;
`;

const Cards = () => {
  const [deck, setDeck] = useState<any>();
  const [cards, setCards] = useState<any>();

  const getCards = useCallback(async () => {
    const res = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    setDeck(res.data);
    console.log("RES:DATA: ", res.data);
    const card = await axios.get(
      `https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`
    );
    setCards(card.data.cards);
  }, [deck]);

  const shuffleCards = useCallback(async () => {
    const shuffledDeck = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`
    );
    setDeck(shuffledDeck.data);
  }, [deck]);

  console.log("CARDS: ", cards);
  return (
    <>
      <button onClick={getCards}>Get deck</button>
      {deck ? <p>Remaining cards in deck: {deck.remaining}</p> : ""}
      <CardWrapper>
        {cards?.map((item: any) => (
          <Card key={item.code} image={item.image} />
        ))}
      </CardWrapper>
      <button onClick={shuffleCards}>Shuffle deck</button>
    </>
  );
};

export default Cards;

interface IProps {
  image: string;
}
export const Card = ({ image }: IProps) => {
  return <CardContainer>{<img src={image} />}</CardContainer>;
};
