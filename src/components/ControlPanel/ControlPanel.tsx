import {
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  SoftShadows,
  Text,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

import { Color, Mesh, MeshStandardMaterial, PerspectiveCamera } from "three";

import useControlPanel from "./hooks/useControlPanel";

export function ControlPanel() {
  const { camera } = useThree();

  const sphereRef = useRef<Mesh>(null);
  const sphereMaterialRef = useRef<MeshStandardMaterial>(null);

  const {
    controls: { general, sphere, playback },
    setters: { setPlaybackControls },
  } = useControlPanel({
    camera: camera as PerspectiveCamera,
    onReset: () => sphereRef.current?.position.set(0, 0, 0),
  });

  useFrame((_, delta) => {
    if (!sphereRef.current) return;
    if (
      playback["Is Playing"] &&
      playback["Current Frame"] < playback["Max Frames"]
    ) {
      sphereRef.current.position.x += delta;
      setPlaybackControls({ "Current Frame": playback["Current Frame"] + 1 });
    }
  });

  const changeSphereColor = (color: string) => {
    if (!sphereMaterialRef.current || !sphere["Change on Hover"]) return;
    sphereMaterialRef.current.color = new Color(color);
  };

  return (
    <>
      <OrbitControls makeDefault />

      <SoftShadows size={25} samples={17} focus={0} />

      <ambientLight intensity={2} />
      <directionalLight position={[1, 2, 3]} intensity={2} castShadow />

      <PivotControls depthTest={false} visible={sphere["Helper"]}>
        <Float enabled={sphere.Float} speed={5} floatIntensity={3}>
          <mesh
            ref={sphereRef}
            visible={sphere.Visible}
            rotation={[sphere.Rotation.x, sphere.Rotation.y, sphere.Rotation.z]}
            scale={[sphere.Scale.x, sphere.Scale.y, sphere.Scale.z]}
            position={[sphere.Position.x, sphere.Position.y, sphere.Position.z]}
            castShadow
            onPointerOver={() => changeSphereColor("purple")}
            onPointerOut={() => changeSphereColor("yellow")}
          >
            <sphereGeometry />
            <meshStandardMaterial color="yellow" ref={sphereMaterialRef} />
          </mesh>
        </Float>
      </PivotControls>

      <mesh
        position-y={-1.4}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        receiveShadow
      >
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
