import abdxdev from '@/public/showcase/abdxdev-mue-setup.webp';
import alex from '@/public/showcase/alex-mue-setup.webp';
import dansavagegames from '@/public/showcase/dansavagegames-mue-setup.webp';
import david from '@/public/showcase/david-mue-setup.webp';
import kagancansit from '@/public/showcase/kagancansit-mue-setup.webp';
import vincente from '@/public/showcase/vincente-mue-setup.webp';
import rand from '@/public/showcase/rand-mue-setup.webp';

export type ShowcaseItem = {
  id: string;
  imageUrl: string;
  blurDataURL?: string;
  thumbnailUrl?: string;
  author: string;
  discordUsername?: string;
  description?: string;
  tags?: string[];
  marketplaceItems?: string[];
  createdAt: string;
};

export const showcaseItems: ShowcaseItem[] = [
  {
    id: '1',
    imageUrl: '/showcase/abdxdev-mue-setup.webp',
    blurDataURL: abdxdev.blurDataURL,
    author: 'abd',
    discordUsername: 'abdxdev',
    description: 'More translucent',
    tags: ['anime', 'translucent', 'productivity'],
    createdAt: '2024-11-03',
  },
  {
    id: '2',
    imageUrl: '/showcase/alex-mue-setup.webp',
    blurDataURL: alex.blurDataURL,
    author: 'Alex',
    discordUsername: 'alexsparkes',
    description: 'Simplistic, time focused setup',
    tags: ['colorful', 'simplistic', 'widgets'],
    createdAt: '2021-06-30',
  },
  {
    id: '3',
    imageUrl: '/showcase/dansavagegames-mue-setup.webp',
    blurDataURL: dansavagegames.blurDataURL,
    author: 'DanSavageGames',
    discordUsername: 'dansavagegames',
    description: 'Minecraft inspired setup with beautiful landscapes',
    tags: ['simplistic', 'gaming', 'full clock', 'custom background'],
    createdAt: '2024-11-27',
  },
  {
    id: '4',
    imageUrl: '/showcase/david-mue-setup.webp',
    blurDataURL: david.blurDataURL,
    author: 'David',
    discordUsername: 'davidralph',
    description: 'Simplistic blurred landscape',
    tags: ['background blur', 'aesthetic', 'quotes'],
    createdAt: '2021-06-22',
  },
  {
    id: '5',
    imageUrl: '/showcase/kagancansit-mue-setup.webp',
    blurDataURL: kagancansit.blurDataURL,
    author: 'Kağan Can Şit',
    discordUsername: 'kagancansit',
    description: 'Simplistic with powerful quotes',
    tags: ['clean', 'minimal', 'quote pack'],
    createdAt: '2024-09-15',
  },
  {
    id: '6',
    imageUrl: '/showcase/vincente-mue-setup.webp',
    blurDataURL: vincente.blurDataURL,
    author: 'Vincente',
    discordUsername: 'vincente',
    description: 'Simplistic landscapes',
    tags: ['landscape', 'weather', 'search'],
    createdAt: '2021-08-22',
  },
  {
    id: '7',
    imageUrl: '/showcase/rand-mue-setup.webp',
    blurDataURL: rand.blurDataURL,
    author: 'Rand',
    discordUsername: 'rand',
    description: 'A pink to the max setup with a custom background',
    createdAt: '2026-02-01',
  },
];

export function getShowcaseItems(): ShowcaseItem[] {
  return showcaseItems.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}

export function getShowcaseItemById(id: string): ShowcaseItem | undefined {
  return showcaseItems.find((item) => item.id === id);
}
