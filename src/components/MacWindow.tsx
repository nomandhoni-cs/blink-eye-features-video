import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface MacWindowProps {
  children: React.ReactNode;
  scale?: number;
  slideIndex: number;
}

export const MacWindow: React.FC<MacWindowProps> = ({ children, scale = 1, slideIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const entrance = spring({
    frame: frame - slideIndex * 10,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
    }
  });

  const rotation = interpolate(entrance, [0, 1], [-15, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [100, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg) translateY(${translateY}px)`,
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '1200px',
        transition: 'all 0.5s ease',
      }}
    >
      <div
        style={{
          backgroundColor: '#2a2a2a',
          padding: '12px',
          borderBottom: '1px solid #333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ backgroundColor: '#ff5f57', width: 12, height: 12, borderRadius: '50%' }} />
        <div style={{ backgroundColor: '#febc2e', width: 12, height: 12, borderRadius: '50%' }} />
        <div style={{ backgroundColor: '#28c840', width: 12, height: 12, borderRadius: '50%' }} />
      </div>
      <div style={{ padding: '20px' }}>{children}</div>
    </div>
  );
};