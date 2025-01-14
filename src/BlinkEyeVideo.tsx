import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { FeatureSlide } from './components/FeatureSlide';
import { FinalSequence } from './components/FinalSequence';
import { FinalLogo } from './components/FinalLogo';
import { GradientBackground } from './components/GradientBackground';
import { Particles } from './components/Particles';
import type { FeatureDemo } from './types';

interface BlinkEyeVideoProps {
  features: FeatureDemo[];
}

export const BlinkEyeVideo: React.FC<BlinkEyeVideoProps> = ({ features }) => {
  const frame = useCurrentFrame();
  
  // Adjusted durations
  const SLIDE_DURATION = 150; // 5 seconds per slide for faster transition
  const FINAL_SEQUENCE_DURATION = 150; // Final sequence duration (5 seconds)
  const LOGO_DURATION = 150; // Final logo duration (5 seconds)
  
  const FINAL_SEQUENCE_START = features.length * SLIDE_DURATION;
  const LOGO_SEQUENCE_START = FINAL_SEQUENCE_START + FINAL_SEQUENCE_DURATION;
  
  const currentSlideIndex = Math.floor(frame / SLIDE_DURATION);
  const slideProgress = (frame % SLIDE_DURATION) / SLIDE_DURATION;
  
  const currentFeature = features[currentSlideIndex];
  const nextFeature = features[currentSlideIndex + 1];

  const showFinalSequence = frame >= FINAL_SEQUENCE_START && frame < LOGO_SEQUENCE_START;
  const showLogoSequence = frame >= LOGO_SEQUENCE_START;

  // Faster and smoother transition calculation
  const transition = interpolate(
    slideProgress,
    [0.4, 1], // Smoother transition with faster pacing
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Opacity for final sequence fade-in
  const finalSequenceOpacity = interpolate(
    frame,
    [FINAL_SEQUENCE_START, FINAL_SEQUENCE_START + 10],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Opacity for logo fade-in
  const logoSequenceOpacity = interpolate(
    frame,
    [LOGO_SEQUENCE_START, LOGO_SEQUENCE_START + 10],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill>
      <GradientBackground />
      <Particles />
      {!showFinalSequence && !showLogoSequence ? (
        <div style={{ position: 'relative' }}>
          <div
            style={{
              opacity: 1 - transition,
              transform: `scale(${interpolate(transition, [0, 1], [1, 0.8])}) translateX(${-transition * 100}%)`,
              position: 'absolute',
              width: '100%',
            }}
          >
            {currentFeature && (
              <FeatureSlide
                feature={currentFeature}
                index={currentSlideIndex}
              />
            )}
          </div>
          <div
            style={{
              opacity: transition,
              transform: `scale(${interpolate(transition, [0, 1], [0.8, 1])}) translateX(${(1 - transition) * 100}%)`,
              position: 'absolute',
              width: '100%',
            }}
          >
            {nextFeature && (
              <FeatureSlide
                feature={nextFeature}
                index={currentSlideIndex + 1}
              />
            )}
          </div>
        </div>
      ) : showFinalSequence ? (
        <div style={{ opacity: finalSequenceOpacity }}>
          <FinalSequence features={features} />
        </div>
      ) : (
        <div style={{ opacity: logoSequenceOpacity }}>
          <FinalLogo />
        </div>
      )}
    </AbsoluteFill>
  );
};
