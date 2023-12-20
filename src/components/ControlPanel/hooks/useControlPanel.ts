import { button, buttonGroup, useControls } from "leva";
import { defaultSettings } from "..";
import { useCallback } from "react";
import { PerspectiveCamera } from "three";

export interface ControlPanelHookArgs {
  camera?: PerspectiveCamera;
}

export default function useControlPanel({ camera }: ControlPanelHookArgs) {
  const resetToDefauts = useCallback(() => {
    setGeneralControls(defaultSettings.general);
    setSphereControls({ ...defaultSettings.sphere, scale: 1 });
    setCameraControls({ fov: defaultSettings.camera.fov.value });
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
        label: "play/pause",
        opts: {
          play: () => {
            alert("Playing");
          },
          pause: () => {
            alert("Not Playing");
          },
        },
      }),
    })
  );

  const [cameraControls, setCameraControls] = useControls("Camera", () => ({
    fov: {
      ...defaultSettings.camera.fov,
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
