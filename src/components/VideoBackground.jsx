import { useEffect, useRef, useState } from 'react';
import { Play, Square } from 'lucide-react';

/**
 * VideoBackground
 *
 * Lazy-loaded via React.lazy(). Autoplays muted + playsInline on mount
 * (required to satisfy browser autoplay policy — videos are always muted).
 * Exposes a Play / Stop toggle button in the top-right corner.
 *
 * Props:
 *  - videoUrl  {string}    URL of the video file (spaces pre-encoded by caller)
 *  - onLoaded  {function}  called once canplay fires
 *  - className {string}    extra classes forwarded to <video>
 */
const VideoBackground = ({ videoUrl, onLoaded, className = '' }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  /* Autoplay as soon as enough data is buffered */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Should never fail — video is muted — but swallow just in case.
        });
      onLoaded?.();
    };

    video.addEventListener('canplay', handleCanPlay, { once: true });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.pause();
    };
  }, [onLoaded]);

  const togglePlayback = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0; // "Stop" semantics — rewind to start
      setIsPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className={`project-video-bg fade-in ${className}`}
        src={videoUrl}
        muted
        playsInline
        loop
        preload="auto"
        aria-hidden="true"
      />

      {/* Play / Stop toggle */}
      <div className="video-controls-top">
        <button
          className="control-btn"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Stop video' : 'Play video'}
        >
          {isPlaying ? (
            <>
              <Square size={16} fill="currentColor" />
              Stop
            </>
          ) : (
            <>
              <Play size={16} fill="currentColor" />
              Play
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default VideoBackground;
