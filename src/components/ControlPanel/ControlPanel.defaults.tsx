const general = {
  Heading: "WearScape Test Project",
  "Theme Color": "mediumpurple",
};

const sphere = {
  scale: {
    value: 1,
    min: 0,
    max: 5,
    step: 1,
  },
  helper: false,
  visible: true,
  float: false,
  changeOnHover: true,
};

const playback = {
  currentFrame: 0,
  maxFrames: 100,
  isPlaying: false,
};

const camera = {
  fov: { value: 45, min: 15, max: 150, step: 1 },
};

export const defaultSettings = {
  general,
  sphere,
  playback,
  camera,
};
