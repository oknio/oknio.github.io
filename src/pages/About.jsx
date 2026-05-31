
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* About Me Section */}
      <section className="about-section">
        <div className="container about-container">
          <div className="about-image-wrapper">
            <img src="/images/about_me.jpg" alt="About Me" className="about-image" />
          </div>
          <div className="about-content">
            <h1 className="section-title">About Me</h1>
            <p className="about-text">
              I'm a student in the final year of my Games Design and Programming degree studying at Staffordshire University with experience in Low-Level/Systems Game Development. I excel in group environments, activities and enjoy facing technical problems to conquer. I am very keen to learn and am excited by new skills and challenging environments.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="technical-skills-section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          
          <div className="skills-grid">
            {/* Unity Engine */}
            <div className="skill-card">
              <h3 className="skill-title">Unity Engine</h3>
              <ul className="skill-list">
                <li><strong>C# & OOP:</strong> 7 years building scalable systems, multiplayer architectures, and core game mechanics.</li>
                <li><strong>Adaptive AI:</strong> Engineered hybrid FSM + CBR systems with interface-driven patterns for one-shot learning NPC behaviours.</li>
                <li><strong>Clean Code & Workflows:</strong> Enforced modular component designs, strict naming conventions, and clean practices in collaborative Git repositories.</li>
              </ul>
            </div>

            {/* Unreal Engine */}
            <div className="skill-card">
              <h3 className="skill-title">Unreal Engine 5</h3>
              <ul className="skill-list">
                <li><strong>C++ & Blueprints:</strong> 3 years developing gameplay mechanics, systemic loops, and multiplayer frameworks.</li>
                <li><strong>Event-Driven Architectures:</strong> Decoupled game states from local player viewports using Event Dispatchers to prevent memory leaks and variable shadowing.</li>
                <li><strong>UMG UI Optimisation:</strong> Created performant, gamepad-navigable menus using Render Transforms and Size Boxes to prevent layout invalidation waves.</li>
                <li><strong>World Partition:</strong> Managed asynchronous streaming, dynamic Data Layers, and validation loops to mask level transitions.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
