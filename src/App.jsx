import { useState, useEffect } from "react";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [step, setStep] = useState(0);

  const messages = [
    "Happy Birthday, My zine Nourhene ❤️",
    "Even with all this distance… u r still the closest person to my heart",
    "Can't wait for the moment when u will be close to both hearts 😉",
    "U are my world 🌎",
    "The only person I ever fell like this for",
    "U stole my heart and my soul and my everything",
    "There’s something about u… ur softness, energy, ur talent… U r so Unique 💖",
    "U make me feel like I'm the luckiest and strongest man alive",
    "I’m soo proud of u in ways words can’t describe",
    "Distance is hard… but can't be as hard as I get when I see u 😉",
    "U r not just special… U r the most perfect girl in this world",
    "I always be missing u so bad and always longing for that day I will meet u",
    "I'm sure, sooo sure, I won't be able to stop my tears when I'll finally see u in real life",
    "When I'll finally get to touch u ❤️ and hold ur hands 🧑‍🤝‍🧑",
    "Smell u 🤤",
    "Kiss u 💏",
    "Hug u 🫂",
    "Eat u 😋",
    "One day very soon, I won’t have to miss you like this anymore",
    "Until that day… I’m always urs nd u r always mine 💖",
    "I love you 7abobti ❤️",
    "🎂🎈 HAPPY BIRTHDAY TO YOU 🎈🎂"
  ];

  /* =========================
     💖 TYPEWRITER
  ========================== */
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  /* =========================
     ❤️ HEART SYSTEM
  ========================== */
  const [hearts, setHearts] = useState([]);

  const spawnHeart = () => {
    const id = Date.now() + Math.random();

    setHearts(prev => [
      ...prev,
      {
        id,
        left: Math.random() * 100,
        size: 10 + Math.random() * 20,
        duration: 4 + Math.random() * 4
      }
    ]);

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 8000);
  };

  /* =========================
     ✨ SPARKLE SYSTEM
  ========================== */
  const [sparkles, setSparkles] = useState([]);

  const spawnSparkle = () => {
    const id = Date.now() + Math.random();

    setSparkles(prev => [
      ...prev,
      {
        id,
        left: Math.random() * 100,
        size: 8 + Math.random() * 10,
        duration: 2.5 + Math.random() * 3
      }
    ]);

    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== id));
    }, 6000);
  };

  /* =========================
     🌊 CONTINUOUS HEARTS
  ========================== */
  useEffect(() => {
    const interval = setInterval(() => {
      if (opened) spawnHeart();
    }, 350);

    return () => clearInterval(interval);
  }, [opened]);

  /* =========================
     ✨ CONTINUOUS SPARKLES
  ========================== */
  useEffect(() => {
    const interval = setInterval(() => {
      if (opened) spawnSparkle();
    }, 250);

    return () => clearInterval(interval);
  }, [opened]);

  /* =========================
     💥 BURST ON MESSAGE CHANGE
  ========================== */
  useEffect(() => {
    if (opened) {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => spawnHeart(), i * 120);
      }
      for (let i = 0; i < 5; i++) {
        setTimeout(() => spawnSparkle(), i * 100);
      }
    }
  }, [step, opened]);

  /* =========================
     ✍️ TYPEWRITER RESET
  ========================== */
  useEffect(() => {
    setDisplayText("");
    setCharIndex(0);
  }, [step]);

  useEffect(() => {
    if (!opened) return;

    if (charIndex < messages[step].length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + messages[step][charIndex]);
        setCharIndex(charIndex + 1);
      }, 35);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, step, opened]);

  return (
    <div className="container">

      {/* ❤️ HEARTS */}
      {hearts.map(h => (
        <span
          key={h.id}
          className="heart"
          style={{
            left: h.left + "%",
            fontSize: h.size + "px",
            animationDuration: h.duration + "s"
          }}
        >
          ❤️
        </span>
      ))}

      {/* ✨ SPARKLES */}
      {sparkles.map(s => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            left: s.left + "%",
            fontSize: s.size + "px",
            animationDuration: s.duration + "s"
          }}
        >
          ✨
        </span>
      ))}

      {/* 🎁 GIFT SCREEN */}
      {!opened && (
        <div className="gift-screen" onClick={() => setOpened(true)}>
          <div className="gift-box">🎁</div>
          <p>Tap to open something made just for you 💌</p>
        </div>
      )}

      {/* 💌 MAIN CARD */}
      {opened && (
        <div className="card">

          <h1>For Nourhene 💖</h1>

          <div className="message">
            {displayText}
          </div>

          <button
            onClick={() => setStep(prev => (prev + 1) % messages.length)}
            disabled={charIndex < messages[step].length}
          >
            Next 💌
          </button>

          {step === messages.length - 1 &&
            charIndex === messages[step].length && (
              <div className="final">
                You mean more to me than words will ever be able to say 7bibti ❤️
              </div>
          )}

        </div>
      )}

    </div>
  );
}
