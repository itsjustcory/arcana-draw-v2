import { useEffect, useState } from "react";
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
];

function App() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardPosition, setCardPosition] = useState({
    bottom: "20px",
    left: "50%",
    transform: "translate(-50%, 0%)",
    opacity: 0, // Start hidden
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 80 - 40;
      const y = (e.clientY / innerHeight) * 80 - 40;
      document.body.style.setProperty("--mouse-x", `${x}px`);
      document.body.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const drawCard = () => {
    if (isDrawing) return; // Prevent multiple draws

    setIsDrawing(true);
    setIsFlipped(false); // Reset flip

    // Step 1: Show card at deck position
    setCardPosition({
      bottom: "20px",
      left: "50%",
      transform: "translate(-50%, 0%)",
      opacity: 1,
    });

    setTimeout(() => {
      // Step 2: Move card to center
      setCardPosition({
        bottom: "50%",
        left: "50%",
        transform: "translate(-50%, 50%)",
        opacity: 1,
      });

      setTimeout(() => {
        // Step 3: Flip the card after reaching center
        setIsFlipped(true);
      }, 1200);
    }, 0);
  };

  return (
    <div className="d-flex flex-column justify-content-end align-items-center vh-100 overflow-hidden position-relative">
      {/* Background Noise */}
      <div className="background w-100 h-100 position-absolute top-0 start-0"></div>

      {/* Drawn Card (Flips after 0.3s) */}
      {isDrawing && (
        <div
          className="flip-card drawn-card"
          style={{
            position: "absolute",
            bottom: cardPosition.bottom,
            left: cardPosition.left,
            transform: cardPosition.transform + (isFlipped ? " rotateY(180deg)" : ""),
            opacity: cardPosition.opacity,
            transition: "all 0.8s ease-out",
          }}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src="/cards/card_back.jpg" alt="Card Back" className="card-style" />
            </div>
            <div className="flip-card-back">
              <img src="/cards/the_fool.jpg" alt="Card Front" className="card-style" />
            </div>
          </div>
        </div>
      )}

      {/* Deck (Click to Draw a Card) */}
      <div className="deck-container" onClick={drawCard}>
        <img src="/cards/card_back.jpg" alt="Tarot Deck" className="card-style" />
      </div>
    </div>
  );
}

export default App;