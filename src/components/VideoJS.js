import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        // videojs.log('player is ready');
        onReady && onReady(player);

        // Load the saved time from localStorage
        const videoKey = `video-${options.sources[0].src}`;
        const savedTime = localStorage.getItem(videoKey);
        if (savedTime) {
          player.currentTime(parseFloat(savedTime));
          // videojs.log(`Loaded saved time: ${savedTime}`);
        }

        // Save the current time to localStorage on timeupdate
        player.on('timeupdate', () => {
          const currentTime = player.currentTime();
          localStorage.setItem(videoKey, currentTime);
          // videojs.log(`Saved time: ${currentTime}`);
        });
      }));
    } else {
      // Update the existing player
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
