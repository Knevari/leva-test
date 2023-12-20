import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { ControlPanel } from "./components/ControlPanel";

function App() {
  return (
    <>
      <Leva />
      <Canvas
        dpr={[1, 2]}
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
