import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';

const HomePage = () => {
  useEffect(() => {
    anime({
      targets: '.title',
      translateY: [100, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1500,
      delay: 500,
    });

    anime({
      targets: '.subtitle',
      opacity: [0, 1], 
      easing: 'easeOutExpo',
      duration: 1500,
      delay: 1000,
    });

    anime({
      targets: '.main-image',
      scale: [0.8, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1500,
      delay: 1500,
    });
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="relative z-10">
        <h1 className="title text-white text-6xl font-extrabold tracking-wider mb-4">
          P A W S
        </h1>
        <p className="subtitle text-white text-xl font-light mb-8">
          Pro Animal Welfare System
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/vendor/assets/img/main.png`}
          alt="Animal Welfare"
          className="main-image mx-auto w-1/2 rounded-octagon transition-all transform duration-500"
        />
      </div>
    </div>
  );
};

export default HomePage;
