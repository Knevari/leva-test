const general = {
  Heading: "WearScape Test Project",
  "Theme Color": "mediumpurple",
};

const sphere = {
  position: {
    value: {
      x: 0,
      y: 0,
    },
    joystick: "invertY",
    step: 0.1,
  },
  scale: {
    value: 1,
    min: 0,
    max: 5,
    step: 1,
  },
  visible: true,
};

export const defaultSettings = {
  general,
  sphere,
};
