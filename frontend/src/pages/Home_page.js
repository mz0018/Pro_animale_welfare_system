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
    <div className="relative h-screen bg-white flex items-center justify-center px-8">

        <div className="w-1/2 flex justify-center">
        <img
          src={`${process.env.PUBLIC_URL}/vendor/assets/img/main.png`}
          alt="Animal Welfare"
          className="main-image w-2/3 aspect-square rounded-xl shadow-lg transition-all transform duration-500"
        />
      </div>
    
      <div className="w-1/2 text-center pr-4">
        <h1 className="title text-green-600 text-8xl font-bold tracking-wide mb-4">
          P A W S
        </h1>
        <p className="subtitle text-gray-700 text-lg font-light">
          Pro Animal Welfare System
        </p>
      </div>
    </div>
  );
};

export default HomePage;
