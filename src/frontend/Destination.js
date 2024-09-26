import React, { useEffect } from 'react';
import './Destination.css';

const Destination = () => {
  useEffect(() => {
    const scrollItems = document.querySelectorAll('.scroll-item');

    const debounce = (func, wait = 20, immediate = true) => {
      let timeout;
      return function () {
        const context = this, args = arguments;
        const later = () => {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    const handleScroll = debounce(() => {
      scrollItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemVisible = 150;

        if (itemTop < window.innerHeight - itemVisible) {
          item.classList.add('show');
        } else {
          item.classList.remove('show');
        }
      });
    }, 50); // Adjust debounce time

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="destination-container">
      <div className="hero scroll-item">
        <img src='/images/Destinations/Traveler.jpg' alt="Traveler with a map" className="scroll-item" />
        <div className="overlay scroll-item">
          <h1 className="scroll-item">Travelers' Choice Awards</h1>
          <p className="scroll-item">Best of the Best 2024</p>
        </div>
      </div>
      <div className="categories">
        <div className="category scroll-item">
          <img src='/images/Destinations/flight.jpg' alt="Destinations" className="scroll-item" />
          <h2 className="scroll-item">Destinations</h2>
        </div>
        <div className="category scroll-item">
          <img src='/images/Destinations/beach.jpg' alt="Beaches" className="scroll-item" />
          <h2 className="scroll-item">Beaches</h2>
        </div>
        <div className="category scroll-item">
          <img src='/images/Destinations/hotel.jpg' alt="Hotels" className="scroll-item" />
          <h2 className="scroll-item">Hotels</h2>
        </div>
        <div className="category scroll-item">
          <img src='/images/Destinations/Things.jpg' alt="Things to Do" className="scroll-item" />
          <h2 className="scroll-item">Things to Do</h2>
        </div>
        <div className="category scroll-item">
          <img src='/images/Destinations/restaurant.jpg' alt="Restaurants" className="scroll-item" loading="lazy" />
          <h2 className="scroll-item">Restaurants</h2>
        </div>
      </div>
    </div>
  );
};

export default Destination;
