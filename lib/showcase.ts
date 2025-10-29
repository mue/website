export type ShowcaseItem = {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  author: string;
  discordUsername?: string;
  description?: string;
  tags?: string[];
  marketplaceItems?: string[]; // IDs of marketplace items used
  createdAt: string;
};

// Sample showcase data - replace with real user submissions
export const showcaseItems: ShowcaseItem[] = [
  {
    id: '1',
    imageUrl: '/showcase/abdxdev-mue-setup.webp',
    author: 'abd',
    discordUsername: 'abdxdev',
    description: 'More translucent',
    tags: ['anime', 'translucent', 'productivity'],
    createdAt: '2024-11-03',
  },
  {
    id: '2',
    imageUrl: '/showcase/alex-mue-setup.webp',
    author: 'Alex',
    discordUsername: 'alexsparkes',
    description: 'Simplistic, time focused setup',
    tags: ['colorful', 'simplistic', 'widgets'],
    createdAt: '2021-06-30',
  },
  {
    id: '3',
    imageUrl: '/showcase/dansavagegames-mue-setup.webp',
    author: 'DanSavageGames',
    discordUsername: 'dansavagegames',
    description: 'Minecraft inspired setup with beautiful landscapes',
    tags: ['simplistic', 'gaming', 'full clock', 'custom background'],
    createdAt: '2024-11-27',
  },
  {
    id: '4',
    imageUrl: '/showcase/david-mue-setup.webp',
    author: 'David',
    discordUsername: 'davidralph',
    description: 'Simplistic blurred landscape',
    tags: ['background blur', 'aesthetic', 'quotes'],
    createdAt: '2021-06-22',
  },
  {
    id: '5',
    imageUrl: '/showcase/kagancansit-mue-setup.webp',
    author: 'Kağan Can Şit',
    discordUsername: 'kagancansit',
    description: 'Simplistic with powerful quotes',
    tags: ['clean', 'minimal', 'quote pack'],
    createdAt: '2024-09-15',
  },
  {
    id: '6',
    imageUrl: '/showcase/vincente-mue-setup.webp',
    author: 'Vincente',
    discordUsername: 'vincente',
    description: 'Simplistic landscapes',
    tags: ['landscape', 'weather', 'search'],
    createdAt: '2021-08-22',
  },
];

export function getShowcaseItems(): ShowcaseItem[] {
  // Sort by date, newest first
  return showcaseItems.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getShowcaseItemById(id: string): ShowcaseItem | undefined {
  return showcaseItems.find((item) => item.id === id);
}
