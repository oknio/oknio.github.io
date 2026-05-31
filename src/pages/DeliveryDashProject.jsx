import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CodeSnippet from '../components/CodeSnippet';
import './ProjectDetail.css';

const DeliveryDashProject = () => {
  const images = [
    '/files/docs/delivery-dash/SumoScreenshot.png',
    '/files/docs/delivery-dash/screenshot-1.png',
    '/files/docs/delivery-dash/screenshot-2.png',
    '/files/docs/delivery-dash/screenshot-3.png',
    '/files/docs/delivery-dash/screenshot-5.png',
    '/files/docs/delivery-dash/screenshot-6.png',
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-play the slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const snippet1 = `// 1. WORLD ACTOR: BP_AwaitPlayersToStartGame (Match Logic)
[Event Lobby Countdown Finished] 
   -> [Get Game Instance] 
   -> [Cast to GI_GameVault] 
   -> [Call Event Dispatcher: OnTournamentStarting]
   -> [Destroy Actor] // Actor safely removes itself; no UI references touched.

// 2. LOCAL PLAYER UI: WBP_HUD (Player Screen)
[Event Construct]
   -> [Get Game Instance]
   -> [Cast to GI_GameVault]
   -> [Bind Event to OnTournamentStarting]
          |
          V
     [Custom Event: Trigger HUD Fade In]
          -> [Play Animation: FadeIn_Anim, Forward]
          -> [Set Input Mode: Game Only]`;

  const snippet2 = `// WBP_MenuButton - Handling Gamepad Focus Safely

[Event On Added to Focus Path]
   -> [Play Sound 2D: UI_Hover_Cue]
   -> [Get Root Widget (Size Box)]
   -> [Set Render Scale (X: 1.05, Y: 1.05)] // Visually pops out, layout math stays the same
   -> [Set Background Tint: Green]

[Event On Removed from Focus Path]
   -> [Get Root Widget (Size Box)]
   -> [Set Render Scale (X: 1.0, Y: 1.0)] // Returns to normal
   -> [Set Background Tint: White]`;

  const snippet3 = `// WBP_AudioSlider - Custom Gamepad Math Navigation

[Event On Key Down]
   -> [Get Key] == [Gamepad D-Pad Right]
   -> [Branch: True]
          -> [Get Slider Value]
          -> [Add 0.1]
          -> [Clamp Float: Min 0.0, Max 1.0]
          -> [Set Slider Value]
          -> [Call Custom Event: Update Game Instance Audio]
          -> [Return Node: Handled] // Consumes the input to prevent double-firing

   -> [Branch: False] (e.g., D-pad Down)
          -> [Return Node: Unhandled] // Passes input back to UMG Scroll Box`;

  return (
    <div className="project-detail-page">
      {/* Hero Section */}
      <section className="project-detail-hero">
        <div 
          className="project-detail-hero-bg" 
          style={{ backgroundImage: 'url("/images/delivery_dash.jpg")' }} 
        />
        <div className="project-detail-hero-overlay" />
        
        <div className="project-detail-hero-content container">
          <h1 className="project-detail-title">Delivery Dash</h1>
          <p className="project-detail-subtitle">4-Player Vehicle Party Game</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="project-detail-content container">
        
        {/* Overview Section */}
        <section className="project-section">
          <h2 className="section-title">Project Overview</h2>
          <div className="section-content">
            <p>
              As the Senior Programmer on Delivery Dash—a frantic, 4-player local multiplayer vehicle game built in Unreal Engine 5—my primary responsibility was engineering a robust systems architecture that allowed our cross-disciplinary team to seamlessly iterate on game modes and mechanics. Operating within a complex World Partition environment, I established strict version control workflows and authored technical documentation to keep development agile and conflict-free.
            </p>

            {/* Interactive Image Slideshow */}
            <div className="project-detail-slideshow">
              <div className="slideshow-wrapper">
                {images.map((img, idx) => (
                  <div
                    key={img}
                    className={`slideshow-slide ${idx === currentIdx ? 'active' : ''}`}
                  >
                    <img
                      src={img}
                      alt={`Delivery Dash gameplay screenshot ${idx + 1}`}
                      className="slideshow-image"
                    />
                  </div>
                ))}
              </div>
              
              <button 
                className="slideshow-btn slideshow-btn-prev" 
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="slideshow-btn slideshow-btn-next" 
                onClick={handleNext}
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>

              <div className="slideshow-dots">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`slideshow-dot ${idx === currentIdx ? 'active' : ''}`}
                    onClick={() => setCurrentIdx(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <p>
              A major technical focus was engineering robust local multiplayer systems and completely decoupling core game logic from player-specific UI. To solve variable shadowing and memory leaks during game state transitions, I designed an Event-Driven pipeline utilizing Event Dispatchers. This ensured the Game Manager could orchestrate the match without holding dangerous, hard-coded references to local player HUDs. Additionally, I managed World Partition data layers and asynchronous streaming, developing validation loops to mask "hard travels" so players only spawned into fully physicalized arenas.
            </p>

            <CodeSnippet
              title="Snippet 1: Decoupling Game Flow from Local UI via Event Dispatchers"
              code={snippet1}
              language="text"
            />
          </div>
        </section>

        {/* UI Optimizations Section */}
        <section className="project-section">
          <h2 className="section-title">AAA Gamepad & UI Optimization</h2>
          <div className="section-content">
            <p>
              On the frontend, I engineered a highly optimized, AAA-standard UI perfectly tailored for multiple local gamepads. I eliminated performance-heavy Event Tick bindings in favor of event-driven updates, utilized "Size Boxes" as structural math walls to halt expensive layout invalidation waves, and implemented Render Transforms to create smooth, layout-safe focus animations for a premium console feel.
            </p>

            <CodeSnippet
              title="Snippet 2: AAA Gamepad Optimization (Render Transforms)"
              code={snippet2}
              language="text"
            />

            <CodeSnippet
              title="Snippet 3: Overriding Native Slider UX (The 'Click-to-Capture' Bypass)"
              code={snippet3}
              language="text"
            />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="project-section">
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-label">Engine</span>
              <span className="tech-value">Unreal Engine 5</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Language</span>
              <span className="tech-value">Blueprints / C++</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Architecture</span>
              <span className="tech-value">Event-Driven Dispatchers</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Multiplayer</span>
              <span className="tech-value">4-Player (Gamepad Support)</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">World Streaming</span>
              <span className="tech-value">World Partition & Data Layers</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">UI System</span>
              <span className="tech-value">UMG (Unreal Motion Graphics)</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DeliveryDashProject;
