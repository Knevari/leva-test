import {
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  Text,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import useControlPanel from "./hooks/useControlPanel";
import { Color, Mesh, MeshStandardMaterial, PerspectiveCamera } from "three";
import { useRef } from "react";

export function ControlPanel() {
  const three = useThree();
  const sphereRef = useRef<Mesh>(null);
  const sphereMaterialRef = useRef<MeshStandardMaterial>(null);

  const {
    controls: { general, sphere, playback },
    setters: { setPlaybackControls },
  } = useControlPanel({
    camera: three.camera as PerspectiveCamera,
    onReset: () => sphereRef.current?.position.set(0, 0, 0),
  });

  useFrame((_, delta) => {
    if (!sphereRef.current) return;
    if (playback.isPlaying && playback.currentFrame < playback.maxFrames) {
      sphereRef.current.position.x += delta;
      setPlaybackControls({ currentFrame: playback.currentFrame + 1 });
    }
  });

  const onPointerOverSphere = () => {
    if (!sphereMaterialRef.current || !sphere.changeOnHover) return;
    sphereMaterialRef.current.color = new Color("#FD1193");
  };

  const onPointerOutSphere = () => {
    if (!sphereMaterialRef.current || !sphere.changeOnHover) return;
    sphereMaterialRef.current.color = new Color("#E91242");
  };

  return (
    <>
      <OrbitControls makeDefault />

      <ambientLight intensity={2} />
      <pointLight position={[1, 2, 3]} intensity={4.5} />

      <PivotControls depthTest={false} visible={sphere.helper}>
        <Float enabled={sphere.float} speed={5} floatIntensity={3}>
          <mesh
            ref={sphereRef}
            visible={sphere.visible}
            scale={sphere.scale}
            position-y={0}
            onPointerOver={onPointerOverSphere}
            onPointerOut={onPointerOutSphere}
          >
            <sphereGeometry />
            <meshStandardMaterial color="#E91242" ref={sphereMaterialRef} />
          </mesh>
        </Float>
      </PivotControls>

      <mesh position-y={-1.4} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          mirror={0.4}
          color={general["Theme Color"]}
          blur={[1000, 1000]}
          mixBlur={1}
        />
      </mesh>

      <Text
        font="./RubikDoodleShadow-Regular.ttf"
        maxWidth={3}
        textAlign="center"
        position={[0, 2, -5]}
        color={general["Theme Color"]}
      >
        {general["Heading"]}
      </Text>
    </>
  );
}
