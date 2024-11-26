import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const FinalLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.4, // Reduced mass for faster animation
    },
  });

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '40px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          transform: `scale(${entrance})`,
          opacity: entrance,
        }}
      >
        <img
          src="https://raw.githubusercontent.com/nomandhoni-cs/blink-eye/master/website/public/logo.png"
          style={{
            width: '150px',
            height: '150px',
            marginBottom: '20px',
          }}
          alt="Blink Eye Logo"
        />
        <h1
          className="cal-sans"
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          Blink Eye
        </h1>
        <p
          style={{
            fontSize: '32px',
            maxWidth: '800px',
            transform: `translateY(${interpolate(entrance, [0, 1], [30, 0])}px)`,
            background: 'linear-gradient(to right, #22d3ee, #818cf8)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          An Open Source cross-platform Eye Care and Break Time reminder app.
        </p>
      </div>
    </div>
  );
};