import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import Services_page from './Services_page';
import About_page from './About_page';
import Admin_page from './Admin_page';

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
  <div className="bg-[#FAF9F6]">
    {/* Hero Section */}
    <div id="home" className="h-96 flex items-center justify-center px-8" style={{ 
      backgroundImage: "url('/vendor/assets/img/background.png')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
      }}>
      <div className="w-1/2 text-start pr-4 bg-gray-500 bg-opacity-30 p-4 rounded-lg">
        <h1 className="title truncate text-white text-9xl font-bold tracking-wide mb-4 border-b">
          P A W S
        </h1>
        <p className="subtitle text-white text-lg font-light">
          Pro Animal Welfare System
        </p>
      </div>
    </div>

    {/* Services Section */}
    <div className="px-8 py-16 flex flex-col md:flex-col lg:flex-row gap-8">
      <div id="admin" className="w-full lg:w-1/2 p-[10%] rounded border lg:border-r border-b lg:border-b-0">
        <Admin_page />
      </div>

      <div id="services" className="w-full lg:w-1/2 p-4">
        <Services_page />
      </div>
    </div>

    <div id="about" className="px-8 py-16">
      <About_page />
    </div>
  </div>
);

};

export default HomePage;
