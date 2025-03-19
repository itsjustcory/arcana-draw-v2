import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const cards = [
  { id: 0, name: "The Fool", image: "/cards/the_fool.jpg", invertable: true },
  { id: 1, name: "The Magician", image: "/cards/the_magician.jpg", invertable: true },
  { id: 2, name: "The High Priestess", image: "/cards/the_high_priestess.jpg", invertable: true },
  { id: 3, name: "The Empress", image: "/cards/the_empress.jpg", invertable: true },
  { id: 4, name: "The Emperor", image: "/cards/the_emperor.jpg", invertable: true },
  { id: 5, name: "The Hierophant", image: "/cards/the_hierophant.jpg", invertable: true },
  { id: 6, name: "The Lovers", image: "/cards/the_lovers.jpg", invertable: true },
  { id: 7, name: "The Chariot", image: "/cards/the_chariot.jpg", invertable: true },
  { id: 8, name: "Strength", image: "/cards/strength.jpg", invertable: true },
  { id: 9, name: "The Hermit", image: "/cards/the_hermit.jpg", invertable: true },
  { id: 10, name: "Wheel of Fortune", image: "/cards/wheel_of_fortune.jpg", invertable: true },
  { id: 11, name: "Justice", image: "/cards/justice.jpg", invertable: true },
  { id: 12, name: "The Hanged Man", image: "/cards/the_hanged_man.jpg", invertable: true },
  { id: 13, name: "Death", image: "/cards/death.jpg", invertable: true },
  { id: 14, name: "Temperance", image: "/cards/temperance.jpg", invertable: true },
  { id: 15, name: "The Devil", image: "/cards/the_devil.jpg", invertable: true },
  { id: 16, name: "The Tower", image: "/cards/the_tower.jpg", invertable: true },
  { id: 17, name: "The Star", image: "/cards/the_star.jpg", invertable: true },
  { id: 18, name: "The Moon", image: "/cards/the_moon.jpg", invertable: true },
  { id: 19, name: "The Sun", image: "/cards/the_sun.jpg", invertable: true },
  { id: 20, name: "The Judgement", image: "/cards/the_judgement.jpg", invertable: true },
  { id: 21, name: "The World", image: "/cards/the_world.jpg", invertable: true },
  { id: 22, name: "???", image: "/cards/unknown.jpg", invertable: false },
];

function App() {
  const [drawnCard, setDrawnCard] = useState({
    frontImage: "/cards/the_fool.jpg", // Default card image
    backImage: "/cards/card_back.jpg", // Back image (same as deck)
    description: "", // Default description
    inverted: false, // Default inversion state
  }); // Preload card data
  const [isFlipped, setIsFlipped] = useState(false); // State to handle flipping
  const [isCentered, setIsCentered] = useState(false); // State to handle card movement
  const [isVisible, setIsVisible] = useState(false); // State to control card visibility
  const [showLargeCard, setShowLargeCard] = useState(false); // State to show the large card image

  const handleDeckClick = () => {
    // Select a random card
    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    // Determine if the card should be inverted
    const isInverted = randomCard.invertable && Math.random() < 0.5;

    // Update the drawnCard state with the selected card's details
    setDrawnCard({
      frontImage: randomCard.image,
      backImage: "/cards/card_back.jpg", // Keep the back image the same
      description: `${randomCard.name} ${isInverted?'(Inverted)':''}`, // Placeholder description
      inverted: isInverted,
    });

    // Trigger the card animation sequence
    setIsVisible(true); // Unhide the card
    setTimeout(() => {
      setIsCentered(true); // Move the card to the center
      setTimeout(() => {
        setIsFlipped(true); // Flip the card after it reaches the center
        setTimeout(() => {
          setShowLargeCard(true); // Show the large card image after the flip
        }, 600); // Delay to ensure the flip animation is complete
      }, 500); // Delay flipping by 500ms to allow the card to move to the center
    }, 100); // Small delay before starting the movement
  };

  return (
    <div className="d-flex flex-column justify-content-end align-items-center vh-100 overflow-hidden position-relative">
      {/* Background Noise */}
      <div className="background w-100 h-100 position-absolute top-0 start-0"></div>

      {/* Blur and Dim Overlay */}
      {showLargeCard && <div className="blur-dim-overlay"></div>}

      {/* Deck */}
      <div className="deck-container" onClick={handleDeckClick}>
        <img src="/cards/card_back.jpg" alt="Tarot Deck" className="card-style" />
      </div>

      {/* Pre-rendered Drawn Card */}
      <div
        className={`drawn-card ${isVisible ? "visible" : ""} ${isCentered ? "centered" : ""}`}
      >
        <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={drawnCard.backImage} alt="Card Back" className="card-style" />
            </div>
            <div className="flip-card-back">
              <img
                src={drawnCard.frontImage}
                alt="Card Front"
                className={`card-style ${drawnCard.inverted ? "inverted" : ""}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Large Card Image with Text */}
      {showLargeCard && (
        <div className="large-card-container">
          <img
            src={drawnCard.frontImage}
            alt="Large Card Front"
            className={`large-card ${drawnCard.inverted ? "inverted" : ""}`}
          />
          <p className="card-description bold-large-text">{drawnCard.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;