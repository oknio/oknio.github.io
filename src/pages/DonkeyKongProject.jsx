
import CodeSnippet from '../components/CodeSnippet';
import './ProjectDetail.css';

const DonkeyKongProject = () => {
  const codeSnippet1 = `// Executed at the conclusion of the Game::update() loop
#include <algorithm>

// Safely sweep and destroy temporary entities using the Erase-Remove idiom
m_entities.erase(
    std::remove_if(m_entities.begin(), m_entities.end(),
        [](const std::unique_ptr<Entity>& entity) {
            // Automatically reclaims heap memory when the unique_ptr goes out of scope
            return entity->destroyed; 
        }),
    m_entities.end()
);`;

  const codeSnippet2 = `// Executed inside PlayerMovementComponent::update()

if (m_owner->jumpMode == JumpMode::Modern) {
    // 1. Grant absolute mid-air horizontal control
    m_owner->vx = targetVelocityX;

    // 2. Variable Jump Height (The "Short Hop")
    // If the spacebar is released early while Mario is still rising
    if (!(m_currentCommands & CommandType::JumpHeld) && m_owner->vy < 0.0f) {
        
        // Instantly multiply vertical velocity by a fractional scalar
        m_owner->vy *= 0.5f; 
    }
}`;

  return (
    <div className="project-detail-page">
      {/* Hero Section */}
      <section className="project-detail-hero">
        <div className="project-detail-hero-bg" style={{ backgroundImage: 'url(/images/donkey_kong.png)' }} />
        <div className="project-detail-hero-overlay" />
        
        <div className="project-detail-hero-content container">
          <h1 className="project-detail-title">Donkey Kong: SFML</h1>
          <p className="project-detail-subtitle">C++ Engine & Arcade Reimplementation</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="project-detail-content container">
        
        {/* Overview Section */}
        <section className="project-section">
          <h2 className="section-title">Project Overview</h2>
          <div className="section-content">
            <p>
              This project is a low-level C++ reimplementation of Nintendo’s 1981 arcade classic, Donkey Kong. Developed from scratch using the SFML framework, the engine serves as an analytical bridge between historical hardware limitations and modern software architecture. The primary objective was to reverse-engineer the original constraint-driven mechanics—such as state-locked velocities and fixed-point physics illusions—and modernize them using fluid, mathematically driven programming paradigms.
            </p>

            <div className="project-image-container">
              <img
                src="/files/docs/donkey-kong/Trajectory%20Comparison.svg"
                alt="Retro vs Modern Jump Trajectory Comparison"
                className="project-detail-image"
              />
            </div>
            
            <p>
              <strong>Memory-Safe Architecture & Garbage Collection:</strong> At the core of the engine is a custom Entity-Component System (ECS) built strictly on RAII principles. To guarantee absolute structural stability during infinite scaling loops, manual memory allocation was entirely eradicated. By utilizing <code>std::unique_ptr</code> combined with the modern C++ Erase-Remove idiom, the engine safely sweeps and instantly reclaims heap memory from temporary entities (like particles and floating UI text) without causing CPU cache misses or memory leaks.
            </p>

            <CodeSnippet
              title="Memory-Safe Entity Sweeper (Erase-Remove Idiom)"
              code={codeSnippet1}
              language="cpp"
            />
          </div>
        </section>

        {/* Physics Section */}
        <section className="project-section">
          <h2 className="section-title">The Hybrid Physics Engine</h2>
          <div className="section-content">
            <p>
              Beyond backend stability, the project acts as a technical study in "game feel". I engineered a runtime toggle that allows players to A/B test between the rigid, high-commitment trajectories of 1981 and a modern kinetic physics model. By intercepting continuous input polling and mathematically severing upward momentum using a fractional scalar, the engine delivers the ultra-responsive, variable-height jumping expected in contemporary action platformers.
            </p>

            <CodeSnippet
              title="Hybrid Input & Velocity Modification (Variable Jump Height)"
              code={codeSnippet2}
              language="cpp"
            />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="project-section">
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-label">Language</span>
              <span className="tech-value">C++ (modern STL)</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Library</span>
              <span className="tech-value">SFML</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Architecture</span>
              <span className="tech-value">Entity-Component System (ECS)</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Memory Management</span>
              <span className="tech-value">RAII & Smart Pointers</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Physics Model</span>
              <span className="tech-value">A/B Hybrid Physics Engine</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Rendering</span>
              <span className="tech-value">Sprite Batching & Frame-Locked Rendering</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DonkeyKongProject;
