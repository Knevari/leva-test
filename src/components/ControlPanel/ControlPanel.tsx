import { MeshReflectorMaterial, OrbitControls, Text } from "@react-three/drei";
import { button, useControls } from "leva";
import { defaultSettings } from "./ControlPanel.defaults";

export function ControlPanel() {
  const [generalControls, setGeneralControls] = useControls(() => ({
    Reset: button(() => {
      setGeneralControls(defaultSettings.general);
      setSphereControls({
        scale: defaultSettings.sphere.scale.value,
        position: {
          x: defaultSettings.sphere.position.value.x,
          y: defaultSettings.sphere.position.value.y,
        },
        visible: defaultSettings.sphere.visible,
      });
    }),
    ...defaultSettings.general,
  }));

  const [sphereControls, setSphereControls] = useControls(
    "Sphere",
    () => defaultSettings.sphere
  );

  return (
    <>
      <OrbitControls makeDefault />

      <ambientLight intensity={2} />
      <pointLight position={[1, 2, 3]} intensity={4.5} />

      <mesh
        position={[sphereControls.position.x, sphereControls.position.y, 0]}
        visible={sphereControls.visible}
        scale={sphereControls.scale}
      >
        <sphereGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          mirror={0.4}
          color={generalControls["Theme Color"]}
          blur={[1000, 1000]}
          mixBlur={1}
        />
      </mesh>

      <Text
        font="./RubikDoodleShadow-Regular.ttf"
        maxWidth={3}
        textAlign="center"
        position={[0, 2, -5]}
        color={generalControls["Theme Color"]}
      >
        {generalControls["Heading"]}
      </Text>
    </>
  );
}
