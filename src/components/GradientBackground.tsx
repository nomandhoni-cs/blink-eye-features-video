import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const GradientBackground: React.FC = () => {
  const frame = useCurrentFrame();
  
  const rotate = interpolate(frame, [0, 300], [0, 360], {
    extrapolateRight: 'loop',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(${rotate}deg, 
          #1a1a2e,
          #16213e,
          #0f3460,
          #1a1a2e
        )`,
        transition: 'background 0.3s ease',
      }}
    />
  );
};