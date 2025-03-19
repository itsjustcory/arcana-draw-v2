import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [drawnCard, setDrawnCard] = useState({
    frontImage: "/cards/the_fool.jpg", // Replace with your desired front image
    backImage: "/cards/card_back.jpg", // Back image (same as deck)
    description: "The Fool represents new beginnings, spontaneity, and a free spirit.", // Card description
  }); // Preload card data
  const [isFlipped, setIsFlipped] = useState(false); // State to handle flipping
  const [isCentered, setIsCentered] = useState(false); // State to handle card movement
  const [isVisible, setIsVisible] = useState(false); // State to control card visibility
  const [showLargeCard, setShowLargeCard] = useState(false); // State to show the large card image

  const handleDeckClick = () => {
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
              <img src={drawnCard.frontImage} alt="Card Front" className="card-style" />
            </div>
          </div>
        </div>
      </div>

      {/* Large Card Image with Text */}
      {showLargeCard && (
        <div className="large-card-container">
          <img src={drawnCard.frontImage} alt="Large Card Front" className="large-card" />
          <p className="card-description">{drawnCard.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;