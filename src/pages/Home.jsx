
import HeroSlideshow from '../components/HeroSlideshow';
import ProjectSection from '../components/ProjectSection';

const Home = () => {
  const projects = [
    {
      id: 'delivery-dash',
      title: 'Delivery Dash',
      logoImage: '/images/Delivery_Dash_ Logo.png',
      subheading: 'Projects / Delivery Dash',
      description: 'Deliver packages faster than your friends and earn points! Challenge your friends in chaotic multiplayer fun! Perfect for 4-player parties.',
      bgImage: '/images/delivery_dash.jpg',
      videoUrl: '/videos/Delivery Dash Game Trailer.mp4',
      youtubeUrl: 'https://www.youtube.com/watch?v=LsI0kSezSKU',
      engine: 'Unreal Engine',
      actionText: 'Watch Trailer',
      learnMoreUrl: '/projects/delivery-dash',
    },
    {
      id: 'eyes-wide-shut',
      title: 'Eyes Wide Shut',
      logoImage: '/images/nio_logo.png',
      subheading: 'Projects / Eyes Wide Shut',
      description: '"Eyes Wide Shut" is an adaptive stealth AI final year project integrating Case-Based Reasoning with a Finite State Machine to achieve real-time, "one-shot" learning against player tactics.',
      bgImage: '/images/eyes_wide_shut.webp',
      videoUrl: '/videos/Eyes Wide Shut Gameplay.mp4',
      youtubeUrl: 'https://youtu.be/Yydb7n-ySyo',
      engine: 'Unity',
      actionText: 'Watch Gameplay',
      learnMoreUrl: '/projects/EWS',
    },
    {
      id: 'donkey-kong',
      title: 'Donkey Kong: SFML',
      logoImage: '/images/dk_logo.png',
      subheading: 'Projects / Donkey Kong',
      description: "Engineered a custom C++ engine recreating 1981's Donkey Kong. It leverages an Entity-Component System and memory-safe RAII paradigms to modernize classic arcade mechanics.",
      bgImage: '/images/donkey_kong.png',
      videoUrl: '/videos/d018935n_Gameplay_Video.mp4',
      youtubeUrl: 'https://youtu.be/3DCLO-qkoKE',
      engine: 'C++',
      actionText: 'Watch Gameplay',
      learnMoreUrl: '/projects/donkey-kong',
    },

  ];

  return (
    <div className="home-page">
      <HeroSlideshow />
      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} autoPlayOnMount={index === 0} />
      ))}
    </div>
  );
};

export default Home;

