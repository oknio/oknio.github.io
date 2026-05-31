import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlideshow.css';
import { Play } from 'lucide-react';

const slides = [
  {
    id: 'delivery-dash',
    image: '/images/delivery_dash.jpg',
    title: 'Delivery Dash',
    subtitle: 'Featured Project',
    actionText: 'Watch Trailer',
    learnMoreUrl: '/projects/delivery-dash',
  },
  {
    id: 'eyes-wide-shut',
    image: '/images/eyes_wide_shut.webp',
    title: 'Eyes Wide Shut',
    subtitle: 'AI Research Project',
    actionText: 'Watch Gameplay',
    learnMoreUrl: '/projects/EWS',
  },
  {
    id: 'donkey-kong',
    image: '/images/donkey_kong.png',
    title: 'Donkey Kong: SFML',
    subtitle: 'Retro C++ Engine',
    actionText: 'Watch Gameplay',
    learnMoreUrl: '/projects/donkey-kong',
  }
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleActionClick = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Wait for scroll to finish, then trigger play if possible
      setTimeout(() => {
        const playBtn = element.querySelector('.btn-primary');
        if (playBtn) playBtn.click();
      }, 800);
    }
  };

  return (
    <div className="hero-slideshow">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div 
            className="slide-bg" 
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="slide-content container">
            <h2 className="slide-subtitle">{slide.subtitle}</h2>
            <h1 className="slide-title">{slide.title}</h1>
            <div className="slide-actions">
              <button 
                className="btn-primary" 
                onClick={() => handleActionClick(slide.id)}
              >
                <Play fill="currentColor" size={20} /> {slide.actionText}
              </button>
              <Link 
                to={slide.learnMoreUrl}
                className="btn-outline"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;

