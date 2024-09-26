import React, { useEffect, useState } from 'react';
import './Footer.css';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.footer');
      const footerPosition = footer.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;

      if (footerPosition < screenPosition) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={`footer scroll-item1 ${isVisible ? 'fade-in' : ''}`}>
      <p>&copy; 2024 GlowGetaway. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
