import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { MacWindow } from './MacWindow';
import { CheckCircle } from 'lucide-react';
import type { FeatureDemo } from '../types';

interface FeatureSlideProps {
  feature: FeatureDemo;
  index: number;
}

export const FeatureSlide: React.FC<FeatureSlideProps> = ({ feature, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 5, // Faster animation
    fps,
    config: { damping: 12, mass: 0.4 }, // Reduced mass for faster animation
  });

  const contentSpring = spring({
    frame: frame - 8, // Faster animation
    fps,
    config: { damping: 12, mass: 0.4 }, // Reduced mass for faster animation
  });

  const isEven = index % 2 === 0;
  const translateX = interpolate(titleSpring, [0, 1], [isEven ? -100 : 100, 0]);
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        display: 'flex',
        padding: '40px',
        height: '100%',
        color: 'white',
        gap: '40px',
      }}
    >
      <div 
        style={{
          flex: '0 0 40%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transform: `translateX(${translateX}px)`,
          opacity: titleSpring,
        }}
      >
        <h1
          className="cal-sans"
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          {feature.title}
        </h1>
        <p
          style={{
            fontSize: '20px',
            marginBottom: '30px',
            lineHeight: 1.6,
          }}
        >
          {feature.description}
        </p>
        <div style={{ marginBottom: '30px' }}>
          {feature.features.map((feat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
                opacity: spring({
                  frame: frame - 15 - i * 2, // Faster feature list animation
                  fps,
                  config: { damping: 12, mass: 0.4 },
                }),
                transform: `translateX(${interpolate(
                  spring({
                    frame: frame - 15 - i * 2,
                    fps,
                    config: { damping: 12, mass: 0.4 },
                  }),
                  [0, 1],
                  [50, 0]
                )}px)`,
              }}
            >
              <CheckCircle size={24} fill="white" color="white" />
              <span style={{ fontSize: '18px' }}>{feat}</span>
            </div>
          ))}
        </div>
        <div
          className="cal-sans"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            opacity: spring({
              frame: frame - 20,
              fps,
              config: { damping: 12, mass: 0.4 },
            }),
          }}
        >
          {feature.moto}
        </div>
      </div>
      <div 
        style={{
          flex: '0 0 60%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: contentSpring,
        }}
      >
        <MacWindow scale={0.9} slideIndex={index}>
          <img
            src={feature.imageSrc}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
            alt={feature.title}
          />
        </MacWindow>
      </div>
    </div>
  );
};