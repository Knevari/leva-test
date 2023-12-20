import { button, buttonGroup, useControls } from "leva";
import { useCallback } from "react";
import { PerspectiveCamera } from "three";
import defaultSettings from "../config/panel.defaults";

export interface ControlPanelHookArgs {
  camera?: PerspectiveCamera;
  onReset?: () => void;
}

export default function useControlPanel({
  camera,
  onReset,
}: ControlPanelHookArgs) {
  const resetToDefauts = useCallback(() => {
    setGeneralControls(defaultSettings.general);
    setSphereControls({
      ...defaultSettings.sphere,
      Scale: defaultSettings.sphere.Scale.value,
      Rotation: defaultSettings.sphere.Rotation.value,
      Position: defaultSettings.sphere.Rotation.value,
    });
    setCameraControls({ FOV: defaultSettings.camera.FOV.value });
    setPlaybackControls(defaultSettings.playback);
    onReset?.();
  }, []);

  const [generalControls, setGeneralControls] = useControls(() => ({
    Reset: button(resetToDefauts),
    ...defaultSettings.general,
  }));

  const [sphereControls, setSphereControls] = useControls(
    "Sphere",
    () => defaultSettings.sphere
  );

  const [playbackControls, setPlaybackControls] = useControls(
    "Playback",
    () => ({
      ...defaultSettings.playback,
      playPauseButtonGroup: buttonGroup({
        label: "Controls",
        opts: {
          PLAY: () => {
            setPlaybackControls({ "Is Playing": true });
          },
          PAUSE: () => {
            setPlaybackControls({ "Is Playing": false });
          },
        },
      }),
    })
  );

  const [cameraControls, setCameraControls] = useControls("Camera", () => ({
    FOV: {
      ...defaultSettings.camera.FOV,
      onChange: (value) => {
        if (camera) {
          camera.fov = value;
          camera.updateProjectionMatrix();
        }
      },
    },
  }));

  return {
    controls: {
      general: generalControls,
      sphere: sphereControls,
      playback: playbackControls,
      camera: cameraControls,
    },
    setters: {
      setGeneralControls,
      setSphereControls,
      setPlaybackControls,
      setCameraControls,
    },
  };
}
