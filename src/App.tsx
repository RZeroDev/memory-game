import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw, Github, Linkedin, Mail } from 'lucide-react';
import { Card } from './components/Card';
import { cards } from './data/cards';

function App() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [shuffledCards, setShuffledCards] = useState(cards);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setShuffledCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      matchedPairs.includes(cardId)
    )
      return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;
      if (
        shuffledCards[firstCard].emoji === shuffledCards[secondCard].emoji
      ) {
        setMatchedPairs([...matchedPairs, firstCard, secondCard]);
        setFlippedCards([]);
        
        if (matchedPairs.length + 2 === shuffledCards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            Memory Game <Sparkles className="w-8 h-8" />
          </h1>
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-white/20 rounded-lg px-4 py-2 text-white">
              Moves: {moves}
            </div>
            <button
              onClick={shuffleCards}
              className="bg-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
          </div>
        </div>

        {gameWon ? (
          <div className="text-center bg-white/90 rounded-xl p-8 shadow-xl max-w-md mx-auto">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="mb-4">You won in {moves} moves!</p>
            <button
              onClick={shuffleCards}
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
            {shuffledCards.map((card, index) => (
              <Card
                key={index}
                id={index}
                emoji={card.emoji}
                isFlipped={flippedCards.includes(index) || matchedPairs.includes(index)}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-800 dark:text-white">
          <span className="font-bold">© 2024 Hadi Radji (RZero Dev)</span>
        </div>
        <div className= "flex gap-4">
          <a
            href="mailto:hadicodemaster@email.com"
            className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/RZeroDev"
            className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/hadi-mevtr/ "
            className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;