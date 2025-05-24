export type BettingMarket = {
  id: string;
  title: string;
  image?: string;
  flag?: string;
  chance?: number;
  options?: Array<{
    name: string;
    value: string;
    yesPercent?: number;
    noPercent?: boolean;
  }>;
  volumeLabel: string;
  isPSG?: boolean;
  category: string[];
};

export const marketData: BettingMarket[] = [
  {
    id: "1",
    title: "Premier League Winner 2025?",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    options: [
      { name: "Arsenal", value: "34%", yesPercent: 34, noPercent: true },
      { name: "Man City", value: "42%", yesPercent: 42, noPercent: true },
      { name: "Liverpool", value: "18%", yesPercent: 18, noPercent: true },
    ],
    volumeLabel: "$18m Vol.",
    category: ["Trending", "Football", "Premier League"],
  },
  {
    id: "2",
    title: "FA Cup Final Winner",
    image: "/lovable-uploads/e3de095d-d3ef-4b36-8278-1bd0b6e0e6ec.png",
    chance: 52,
    volumeLabel: "$5m Vol.",
    category: ["Football", "FA Cup", "Arsenal"],
  },
  {
    id: "3",
    title: "Champions League Final: Paris vs. Inter Milan",
    flag: "🏴",
    chance: 59,
    isPSG: true,
    volumeLabel: "$12m Vol.",
    category: ["Football", "Champions League"],
  },
  {
    id: "4",
    title: "NBA Champion",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    options: [
      {
        name: "Oklahoma City Thunder",
        value: "44%",
        yesPercent: 44,
        noPercent: true,
      },
      { name: "Boston Celtics", value: "21%", yesPercent: 21, noPercent: true },
      {
        name: "Cleveland Cavaliers",
        value: "8%",
        yesPercent: 8,
        noPercent: true,
      },
    ],
    volumeLabel: "$2b Vol.",
    category: ["NBA", "Basketball"],
  },
  {
    id: "5",
    title: "Arsenal to win any trophy this season?",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    chance: 63,
    volumeLabel: "$7m Vol.",
    category: ["Football", "Arsenal", "Trending"],
  },
  {
    id: "6",
    title: "Wimbledon Men's Champion",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    options: [
      { name: "Novak Djokovic", value: "36%", yesPercent: 36, noPercent: true },
      { name: "Carlos Alcaraz", value: "28%", yesPercent: 28, noPercent: true },
      { name: "Jannik Sinner", value: "19%", yesPercent: 19, noPercent: true },
    ],
    volumeLabel: "$3m Vol.",
    category: ["Tennis"],
  },
  {
    id: "7",
    title: "F1 Driver's Championship Winner",
    flag: "🏁",
    options: [
      { name: "Max Verstappen", value: "72%", yesPercent: 72, noPercent: true },
      { name: "Lando Norris", value: "16%", yesPercent: 16, noPercent: true },
      { name: "Lewis Hamilton", value: "9%", yesPercent: 9, noPercent: true },
    ],
    volumeLabel: "$15m Vol.",
    category: ["F1", "Trending"],
  },
  {
    id: "8",
    title: "Euro 2024 Winner",
    flag: "🇪🇺",
    options: [
      { name: "England", value: "28%", yesPercent: 28, noPercent: true },
      { name: "France", value: "25%", yesPercent: 25, noPercent: true },
      { name: "Germany", value: "16%", yesPercent: 16, noPercent: true },
    ],
    volumeLabel: "$21m Vol.",
    category: ["Football", "International"],
  },
  {
    id: "9",
    title: "Will Everton get relegated this season?",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    chance: 37,
    volumeLabel: "$2m Vol.",
    category: ["Football", "Premier League"],
  },
  {
    id: "10",
    title: "World Cup 2026 Qualifiers: USA vs Mexico",
    flag: "🇺🇸",
    chance: 48,
    volumeLabel: "$1m Vol.",
    category: ["Football", "International"],
  },
  {
    id: "11",
    title: "Fury vs. Usyk Heavyweight Title Fight",
    image: "/lovable-uploads/e3de095d-d3ef-4b36-8278-1bd0b6e0e6ec.png",
    chance: 55,
    volumeLabel: "$9m Vol.",
    category: ["Boxing"],
  },
  {
    id: "12",
    title: "Most Gold Medals at 2025 Olympics",
    flag: "🏅",
    options: [
      { name: "USA", value: "61%", yesPercent: 61, noPercent: true },
      { name: "China", value: "29%", yesPercent: 29, noPercent: true },
    ],
    volumeLabel: "$4m Vol.",
    category: ["Olympics"],
  },
];
