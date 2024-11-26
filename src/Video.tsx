import { Composition } from 'remotion';
import { BlinkEyeVideo } from './BlinkEyeVideo';
import { featuresDemo } from './data';

export const RemotionVideo: React.FC = () => {
  // Calculate total duration with shorter sequences
  const totalFrames = (featuresDemo.length * 90) + 60 + 60;

  return (
    <>
      <Composition
        id="BlinkEye"
        component={BlinkEyeVideo}
        durationInFrames={totalFrames}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          features: featuresDemo,
        }}
      />
    </>
  );
};