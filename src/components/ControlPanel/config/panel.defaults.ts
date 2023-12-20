import { blueDark } from "../../../config/levaTheme";

const general = {
  Heading: "WearScape Test Project",
  "Theme Color": blueDark,
};

const sphere = {
  Scale: {
    value: 1,
    min: 0,
    max: 5,
    step: 1,
  },
  Helper: false,
  Visible: true,
  Float: false,
  "Change on Hover": true,
};

const playback = {
  "Current Frame": 0,
  "Max Frames": 100,
  "Is Playing": false,
};

const camera = {
  FOV: { value: 45, min: 15, max: 150, step: 1 },
};

const settings = {
  general,
  sphere,
  playback,
  camera,
};

export default settings;
