"use client";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import the confetti component with SSR disabled
const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

export default function Home() {
  const [confetti, setConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Update window dimensions on resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Trigger confetti animation on component mount
    setConfetti(true);

    // Turn off confetti after 5 seconds to avoid performance issues
    const timer = setTimeout(() => {
      setConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to replay the confetti animation
  const replayConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 5000);
  };

  return (
    <div className="birthday-container min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {confetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722']}
        />
      )}

      <main className="birthday-content flex flex-col gap-[32px] items-center text-center">
        <h1 className="birthday-title text-4xl sm:text-6xl font-bold animate-bounce mb-4">
          Happy Birthday Waqar! <span className="kiss-emoji">💋</span>
        </h1>

        {/* Portrait of a beautiful girl */}
        <div className="portrait-container">
          <Image
            src="https://picsum.photos/seed/portrait/200"
            alt="Elegant Portrait"
            width={200}
            height={200}
            className="portrait"
          />
        </div>

        <div className="birthday-cake-container relative w-[200px] h-[200px] mx-auto my-10">
          <div className="birthday-cake">
            <div className="candles">
              <div className="flame"></div>
              <div className="flame"></div>
              <div className="flame"></div>
            </div>
          </div>
        </div>

        <p className="birthday-message text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
          Today is a special day for someone amazing. Wishing you joy, success, and all the happiness in the world!
        </p>

        <div className="birthday-wishes p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-glow max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">🎉 Birthday Wishes 🎉</h2>
          <ul className="wishes-list space-y-4 text-left">
            <li className="wish-item">May your code always compile on the first try</li>
            <li className="wish-item">May your bugs be simple and your solutions brilliant</li>
            <li className="wish-item">May your day be as wonderful as a successful deployment</li>
            <li className="wish-item">May your year ahead be filled with innovation and success</li>
          </ul>
        </div>

        <div className="flex gap-6 items-center flex-col sm:flex-row mt-8">
          <button
            className="celebration-button rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white gap-2 font-medium text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:opacity-90"
            onClick={replayConfetti}
          >
            Celebrate Again!
          </button>

          <a
            className="message-button rounded-full border border-solid border-white/20 transition-colors flex items-center justify-center hover:bg-white/10 font-medium text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8"
            href="#"
          >
            Send Wishes
          </a>
        </div>
      </main>

      <footer className="birthday-footer mt-16 text-center">
        <p className="text-sm opacity-70">Made with ❤️ for Waqar&apos;s special day - {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}
