import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import type { FeatureDemo } from '../types';

interface FinalSequenceProps {
  features: FeatureDemo[];
}

export const FinalSequence: React.FC<FinalSequenceProps> = ({ features }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {features.map((feature, index) => {
        const delay = index * 5;
        const rotate = spring({
          frame: frame - delay,
          fps,
          config: {
            damping: 12,
            mass: 0.5,
          },
        });

        const translateY = interpolate(
          frame - delay,
          [0, 20],
          [200, 0],
          { extrapolateRight: 'clamp' }
        );

        const opacity = interpolate(
          frame,
          [features.length * 5 + 60, features.length * 5 + 90],
          [1, 0],
          { extrapolateLeft: 'clamp' }
        );

        return (
          <div
            key={feature.title}
            style={{
              width: '300px',
              transform: `rotate(${interpolate(rotate, [0, 1], [15, 0])}deg) translateY(${translateY}px)`,
              opacity,
              transition: 'all 0.5s ease',
            }}
          >
            <img
              src={feature.imageSrc}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
              alt={feature.title}
            />
          </div>
        );
      })}
    </div>
  );
};