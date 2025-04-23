"use client";

import React from 'react';
import ImageCarousel from './image-carousel';

const Hero: React.FC = () => {
  // Sample carousel images - replace with your actual images
  const carouselImages = [
    {
      id: 1,
      url: 'https://img.freepik.com/premium-photo/broken-chain-with-diamond-it_175356-23222.jpg?w=996',
      title: 'Modern Market Designs',
      subtitle: 'Innovative design solutions for tomorrow'
    },
    {
      id: 2,
      url: 'https://img.freepik.com/free-photo/3d-rendering-cartoon-house_52683-108577.jpg?t=st=1745375450~exp=1745379050~hmac=df4575dd0b546a475a42800252076037c79081b0d19e160608e0363acfcacdb0&w=740',
      title: 'Urban Betting Reorganizee',
      subtitle: 'Reshaping our cities for sustainable living'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/19861121/pexels-photo-19861121/free-photo-of-buildings-reflected-on-water.jpeg',
      title: 'Creative Perspectives',
      subtitle: 'Seeing the world through a decentralized lens'
    },
    {
      id: 4,
      url: 'https://img.freepik.com/free-photo/medium-shot-anime-style-man-portrait_23-2151067436.jpg?t=st=1745375531~exp=1745379131~hmac=419ce3dd901f7f3c6685f934857c7a40f2bf544a3078c89fc98fe548fdb1b3ba&w=740',
      title: 'Decentralized Storage Solutions',
      subtitle: 'We bring market art as modernized PFP/\s'
    }
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-10">
        <ImageCarousel images={carouselImages} />
      </div>
      
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="animate-fadeIn text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            <span className="block">Discover the</span>
            <span className="block mt-2 text-purple-400">Onchain Market Reality</span>
          </h1>
          <p className="animate-fadeIn animation-delay-300 text-lg sm:text-xl text-gray-200 mb-8 max-w-lg mx-auto drop-shadow-md">
            Your gateway to the future of decentralized markets.
          </p>
          <div className="animate-fadeIn animation-delay-500 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105">
              Explore Now
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-slate-900/5 shadow-lg rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-purple-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;