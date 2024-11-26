import React from 'react';
import { random, useCurrentFrame } from 'remotion';
import { interpolate } from 'remotion';

const PARTICLE_COUNT = 50;

export const Particles: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
      {new Array(PARTICLE_COUNT).fill(0).map((_, i) => {
        const x = random('x' + i) * 100;
        const y = random('y' + i) * 100;
        const size = random('size' + i) * 3 + 1;
        const speed = random('speed' + i) * 2 + 0.5;
        
        const movement = (frame * speed) % 100;
        const opacity = interpolate(
          movement,
          [0, 50, 100],
          [0, 0.3, 0],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: 'white',
              opacity,
              transform: `translateY(${movement}px)`,
            }}
          />
        );
      })}
    </div>
  );
};