const themes = {
  LIGHT: 'LIGHT',
  HACKER: 'HACKER',
  COMIC: 'COMIC',
  REDDY: 'REDDY',
  DARK: 'DARK',
};

const themeOptions = [
  {
    title: 'Cream deLight',
    value: themes.LIGHT,
    description: 'The classic light theme.',
  },
  {
    title: 'Hacker deBug',
    value: themes.HACKER,
    description: 'Theme that gives you hackey vibes.',
  },
  {
    title: 'Comic deBook',
    value: themes.COMIC,
    description: "Fan of comic books? here's a theme based on it!",
  },
  {
    title: 'Crimson deRed',
    value: themes.REDDY,
    description: 'But why? why would you choose this theme?',
  },
  {
    title: 'Dark deCite',
    value: themes.DARK,
    description: "If light's your kryptonite, this theme is for you!",
  },
];

export { themes as default, themeOptions };
