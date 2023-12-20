import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";
import { ControlPanel } from "./components/ControlPanel";

import levaTheme from "./config/levaTheme";

function App() {
  return (
    <>
      <Leva theme={levaTheme} hideCopyButton />
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 3, 9],
        }}
      >
        <ControlPanel />
      </Canvas>
    </>
  );
}

export default App;
