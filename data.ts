export interface Theme {
  name: string;
  foreground: string[];
  background: string[];
  stops: number[];
  angle: number;
  preview: string[];
  customCover?: string;
  official: boolean;
}
export type ThemeKey = keyof typeof predefinedThemes | "custom";
export const predefinedThemes = {
  moonstone_blue: {
    name: "Moonstone Blue",
    foreground: ['#536184', '#62869a', '#88a7bb'],
    background: ['#e9e8e4'],
    stops: [0],
    angle: 0,
    preview: ['#62869a', '#62869a'],
    official: true,
  },
  jade_green: {
    name: "Jade Green",
    foreground: ['#4e6861', '#799e98', '#87b2a9'],
    background: ['#e9e8e4'],
    stops: [0],
    angle: 0,
    preview: ['#799e98', '#799e98'],
    customCover: "jade_green",
    official: true,
  },
  blood_moon: {
    name: "Blood Moon",
    foreground: ['#824e4c', '#9e5653', '#ae5d59'],
    background: ['#e9e8e4'],
    stops: [0],
    angle: 0,
    preview: ['#9e5653', '#9e5653'],
    customCover: "blood_moon",
    official: true,
  },
  mahogany: {
    name: "Mahogany",
    foreground: ['#9c7b3d', '#b09254', '#bea162'],
    background: ['#e9e8e4'],
    stops: [0],
    angle: 0,
    preview: ['#b09254', '#b09254'],
    customCover: "mahogany",
    official: true,
  },
  lavender: {
    name: "Lavender",
    foreground: ['#847490', '#988a9f', '#ab9eaf'],
    background: ['#e9e8e4'],
    stops: [0],
    angle: 0,
    preview: ['#988a9f', '#988a9f'],
    official: true,
  },
  tilDawn: {
    name: 'Til Dawn Edition',
    foreground: ['#e9e8e4'],
    background: ['#0f0f2c', '#8c5a4c', '#604959', '#443749', '#474a5a'],
    stops: [0, 50, 75, 85, 100],
    angle: 75,
    preview: ['#8c5a4c', '#604959', '#443749', '#474a5a'],
    official: true,
  },
  lateNight: {
    name: 'Late Night Edition',
    foreground: ['#e9e8e4'],
    background: ['#090927', '#2d475b'],
    stops: [0, 100],
    angle: 75,
    preview: ['#090927', '#2d475b'],
    official: true,
  },
  debut: {
    name: 'Taylor Swift',
    foreground: ['#11794c', '#00b0bd'],
    background: ['#e9e8e4'],
    stops: [0, 100],
    angle: 75,
    preview: ['#34f3ff', '#6aebb4'],
    official: false,
  },
  fearless: {
    name: 'Fearless',
    foreground: ['#a5764a', '#957341'],
    background: ['#e9e8e4'],
    stops: [0, 100],
    angle: 75,
    preview: ['#f6ed95', '#ddc477'],
    official: false,
  },
  speak_now: {
    name: 'Speak Now',
    foreground: ['#513163', '#a64477'],
    background: ['#e9e8e4'],
    stops: [0, 100],
    angle: 75,
    preview: ['#513163', '#a64477'],
    official: false,
  },
  red: {
    name: 'Red',
    foreground: ['#692a40', '#b11a46'],
    background: ['#e9e8e4'],
    stops: [0, 100],
    angle: 75,
    preview: ['#692a40', '#b11a46'],
    official: false,
  },
  nineteen_eightynine: {
    name: '1989',
    foreground: ['#527da0', '#6c93b2'],
    background: ['#d7d2c5'],
    stops: [0, 100],
    angle: 75,
    preview: ['#527da0', '#6c93b2'],
    official: false,
  },
  reputation: {
    name: 'reputation',
    foreground: ['#999999', '#e9e8e4'],
    background: ['#000000', '#222222'],
    stops: [0, 100],
    angle: 75,
    preview: ['#000000', '#222222'],
    official: false,
  },
  lover: {
    name: 'Lover',
    foreground: ['#418cd8', '#d55dad'],
    background: ['#e9e8e4'],
    stops: [0, 100],
    angle: 75,
    preview: ['#94bfe9', '#eaadd6'],
    official: false,
  },
  folklore: {
    name: 'folklore',
    foreground: ['#222222', '#7f7f7f'],
    background: ['#e9e8e4'],
    stops: [0, 100],
    angle: 75,
    preview: ['#222222', '#7f7f7f'],
    official: false,
  },
  evermore: {
    name: 'evermore',
    foreground: ['#523211', '#7f3c10', '#9e4c15'],
    background: ['#e9e8e4'],
    stops: [0, 100],
    angle: 75,
    preview: ['#523211', '#7f3c10', '#9e4c15'],
    official: false,
  },
};

export interface Section {
  title: string;
  tracks: {
    name: string;
    featLine?: string;
  }[];
  isSmall: boolean;
}
export const defaultSections: Section[] = [
  {
    title: "",
    tracks: [
      {
        name: "Lavender Haze",
      },
      {
        name: "Maroon",
      },
      {
        name: "Anti-Hero",
      },
      {
        name: "Snow On The Beach",
      },
      {
        // \u2009 is a thin space
        name: "You're\u2009On\u2009Your\u2009Own,\u2009Kid",
      },
      {
        name: "Midnight Rain",
      },
      {
        name: "Question...?",
      },
      {
        name: "Vigilante Shit",
      },
      {
        name: "Bejeweled",
      },
      {
        name: "Labyrinth",
      },
      {
        name: "Karma",
      },
      {
        name: "Sweet Nothing",
      },
      {
        name: "Mastermind",
      },
    ],
    isSmall: false,
  },
  {
    title: "3am Tracks",
    tracks: [
      {
        name: "The Great War",
      },
      {
        name: "Bigger Than The Whole Sky",
      },
      {
        name: "Paris",
      },
      {
        name: "High Infidelity",
      },
      {
        name: "Glitch",
      },
      {
        name: "Would've,\u2009Could've,\u2009Should've",
      },
      {
        name: "Dear Reader",
      },
    ],
    isSmall: true,
  },
  {
    title: "Til Dawn Tracks",
    tracks: [
      {
        name: "Hits Different",
      },
      {
        name: "Snow On The Beach",
        featLine: "(Feat. More Lana Del Rey)",
      },
      {
        name: "Karma",
        featLine: "(Feat. Ice Spice)",
      },
    ],
    isSmall: true,
  }
];