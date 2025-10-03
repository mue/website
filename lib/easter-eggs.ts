'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useKonamiCode() {
  const [, setKeys] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key].slice(-10);
        
        // Check if the last 10 keys match the Konami code
        if (newKeys.join(',') === KONAMI_CODE.join(',')) {
          if (!activated) {
            setActivated(true);
            triggerEasterEgg();
          }
        }
        
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activated]);

  const triggerEasterEgg = () => {
    // Epic confetti explosion
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
      });
    }, 250);

    // Show secret message
    setTimeout(() => {
      const message = document.createElement('div');
      message.innerHTML = '🎮 Konami Code Activated! You found the secret! 🎉';
      message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem;
        border-radius: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        animation: bounce 1s infinite;
      `;
      document.body.appendChild(message);

      setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 1s';
        setTimeout(() => message.remove(), 1000);
      }, 3000);
    }, 100);

    // Reset after a while
    setTimeout(() => setActivated(false), 10000);
  };

  return activated;
}

// Fun messages that appear randomly
export const funLoadingMessages = [
  'Summoning the code wizards... 🧙‍♂️',
  'Brewing a fresh pot of bytes... ☕',
  'Teaching robots to dance... 🤖',
  'Convincing pixels to align... 🎨',
  'Downloading more RAM... (just kidding!) 💾',
  'Waking up the hamsters... 🐹',
  'Consulting the rubber duck... 🦆',
  'Reversing the polarity... ⚡',
  'Reticulating splines... 📐',
  'Charging flux capacitor... ⚡',
];

export function getRandomLoadingMessage() {
  return funLoadingMessages[Math.floor(Math.random() * funLoadingMessages.length)];
}
