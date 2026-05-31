
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 'delivery-dash',
      title: 'Delivery Dash',
      logoImage: '/images/Delivery_Dash_ Logo.png',
      description: 'Deliver packages faster than your friends and earn points! Challenge your friends in chaotic multiplayer fun! Perfect for 4-player parties.',
      bgImage: '/images/delivery_dash.jpg',
      engine: 'Unreal Engine',
      link: '/projects/delivery-dash',
    },
    {
      id: 'eyes-wide-shut',
      title: 'Eyes Wide Shut',
      logoImage: '/images/nio_logo.png',
      description: '"Eyes Wide Shut" is an adaptive stealth AI final year project integrating Case-Based Reasoning with a Finite State Machine to achieve real-time, "one-shot" learning against player tactics.',
      bgImage: '/images/eyes_wide_shut.webp',
      engine: 'Unity',
      link: '/projects/EWS',
    },
    {
      id: 'donkey-kong',
      title: 'Donkey Kong: SFML',
      logoImage: '/images/dk_logo.png',
      description: "Engineered a custom C++ engine recreating 1981's Donkey Kong. It leverages an Entity-Component System and memory-safe RAII paradigms to modernize classic arcade mechanics.",
      bgImage: '/images/donkey_kong.png',
      engine: 'C++',
      link: '/projects/donkey-kong',
    },
  ];

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Projects</h1>
        <p>Explore a collection of my work across game development, AI systems, and software engineering.</p>
      </div>

      <div className="projects-grid container">
        {projects.map((project) => (
          <Link key={project.id} to={project.link} className="project-card">
            <div
              className="project-card-bg"
              style={{ backgroundImage: `url(${project.bgImage})` }}
            />
            <div className="project-card-overlay" />
            
            <div className="project-card-content">
              {project.logoImage && (
                <img
                  src={project.logoImage}
                  alt={`${project.title} logo`}
                  className="project-card-logo"
                />
              )}
              
              <div className="project-card-info">
                <h2 className="project-card-title">{project.title}</h2>
                <p className="project-card-engine">{project.engine}</p>
                <p className="project-card-description">{project.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
