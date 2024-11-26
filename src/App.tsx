import { Player } from '@remotion/player';
import { BlinkEyeVideo } from './BlinkEyeVideo';
import { featuresDemo } from './data';
import './index.css';

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <Player
          component={BlinkEyeVideo}
          durationInFrames={featuresDemo.length * 180}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{
            width: '100%',
            aspectRatio: '16/9',
          }}
          controls
          inputProps={{
            features: featuresDemo,
          }}
        />
      </div>
    </div>
  );
}

export default App;