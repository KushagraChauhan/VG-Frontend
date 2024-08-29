import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-markers/dist/videojs.markers.css';  // Add marker CSS
import 'videojs-markers';  // Import the markers plugin

export const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, timestamps, onReady } = props;

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);

        const videoKey = `video-${options.sources[0].src}`;
        const savedTime = localStorage.getItem(videoKey);
        if (savedTime) {
          player.currentTime(parseFloat(savedTime));
        }

        player.on('timeupdate', () => {
          const currentTime = player.currentTime();
          localStorage.setItem(videoKey, currentTime);
        });

        videoElement.addEventListener('contextmenu', (e) => {
          e.preventDefault();
        });

        if (timestamps && timestamps.length > 0) {
          player.markers({
            markerStyle: {
              width: '10px',
              backgroundColor: '#FFA500',
            },
            markers: timestamps.map(({ time, label }) => ({
              time,
              text: label,
              class: 'marker-class',
            })),
          });
        }
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, onReady, timestamps]);

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
