import { useEffect } from "react";
import { useState } from "react";
import Score from "./Score";
import Card from "./Card";


const GameBoard = () => {
  const [cards,setCards] = useState([]);
  const [currentScore,setCurrentScore] = useState(0);
  const [bestScore,setBestScore] = useState(0);
  const [clickedCards,setClickedCards] = useState([]);

  useEffect(()=>{
    fetchCards();
  },[]);

  const fetchCards = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
    const data = await response.json();
    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );
    setCards(pokemonData);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  }

  
  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const handleCardClick = (id) => {
    // Check if the card has been clicked before
    if (clickedCards.includes(id)) {
      // Game over logic
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setClickedCards([]);
      setCurrentScore(0);
    } else {
      // Update clicked cards and score
      setClickedCards(prevCards => [...prevCards, id]);
      setCurrentScore(prevScore => prevScore + 1);
    }
  
    // Shuffle cards
    setCards(shuffleCards([...cards]));
  };

 return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pokemon Memory Game</h1>
      <Score currentScore={currentScore} bestScore={bestScore} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.id} data={card} onClick={() => handleCardClick(card.id)} />
        ))}
      </div>
    </div>
  );
}

export default GameBoard