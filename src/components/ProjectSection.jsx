/**
 * ProjectSection
 *
 * Full-viewport project card. Each card:
 *  - Shows a static background image by default.
 *  - Uses IntersectionObserver (via useVideoAutoplay hook) to detect when
 *    the section is ≥20% visible in the viewport.
 *  - Once visible, dynamically imports VideoBackground (code-split chunk)
 *    so the video bundle is NOT part of the initial JS payload.
 *  - The video autoplays muted + playsInline (bypasses autoplay policy).
 *  - The observer disconnects immediately after triggering (saves memory).
 *  - A fixed-size placeholder prevents CLS while the chunk downloads.
 */
import { lazy, Suspense, useState, useCallback } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProjectSection.css';
import useVideoAutoplay from '../hooks/useVideoAutoplay';

// Req 1: dynamic import — VideoBackground is its own JS chunk.
const VideoBackground = lazy(() => import('./VideoBackground'));

const ProjectSection = ({ project, autoPlayOnMount = false }) => {
  // Req 2 & 4: 20% threshold; observer auto-disconnects after first trigger.
  const { sectionRef, shouldPlay } = useVideoAutoplay(0.2, autoPlayOnMount);

  // Flip to true once the video fires its `canplay` event so we can fade
  // out the static thumbnail and fade in the video.
  const [videoReady, setVideoReady] = useState(false);

  const handleVideoLoaded = useCallback(() => {
    setVideoReady(true);
  }, []);

  return (
    <section id={project.id} ref={sectionRef} className="project-section">

      {/* Static background image — fades out once video is ready */}
      <div
        className={`project-bg ${videoReady ? 'fade-out' : ''}`}
        style={{ backgroundImage: `url(${project.bgImage})` }}
      />

      {/*
        Req 5: The placeholder div occupies the exact same position/size as
        the video so there is no layout shift (CLS = 0) while the JS chunk
        and video buffer download.
      */}
      <div className={`video-placeholder ${videoReady ? 'video-placeholder--hidden' : ''}`} />

      {/*
        Req 1 & 3: Only mount <VideoBackground> (and trigger the dynamic
        import) once the section scrolls into view. Suspense shows nothing
        (the static bg image is already visible) while the chunk loads.
      */}
      {project.videoUrl && shouldPlay && (
        <Suspense fallback={null}>
          <VideoBackground
            videoUrl={encodeURI(project.videoUrl)}
            onLoaded={handleVideoLoaded}
          />
        </Suspense>
      )}

      {/* Gradient overlay — always present for text legibility */}
      <div className="project-overlay" />

      {/* Text content */}
      <div className="project-content container">
        <div className="project-info">
          {project.logoImage ? (
            <img
              src={project.logoImage}
              alt={`${project.title} logo`}
              className="project-logo-main"
            />
          ) : (
            <h2 className="project-title-large">{project.title}</h2>
          )}

          <div className="project-details">
            <h3 className="project-category">{project.subheading}</h3>
            <p className="project-description">{project.description}</p>

            <div className="project-actions">
              {project.youtubeUrl ? (
                <a
                  href={project.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Play fill="currentColor" size={20} />
                  {project.actionText || 'Watch Trailer'}
                </a>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => {
                    const vid = sectionRef.current?.querySelector('video');
                    if (vid) { vid.muted = false; vid.play().catch(() => {}); }
                  }}
                >
                  <Play fill="currentColor" size={20} />
                  {project.actionText || 'Watch Trailer'}
                </button>
              )}
              <Link to={project.learnMoreUrl || '/projects'} className="btn-outline">
                Learn More
              </Link>
            </div>

            <div className="platform-info-row">
              <span className="platform-tag">PC</span>
              <span className="platform-divider">|</span>
              <span className="engine-tag">{project.engine}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
