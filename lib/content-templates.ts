export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  type: 'photos' | 'quotes' | 'settings';
  icon: string;
  metadata: {
    name: string;
    description: string;
    version: string;
    author: string;
    icon_url: string;
    screenshot_url: string;
  };
  content: {
    photos?: Array<{ photographer: string; location: string; url: { default: string } }>;
    quotes?: Array<{ quote: string; author: string }>;
    settingsJson?: string;
  };
}

export const templates: ContentTemplate[] = [
  // Photo Pack Templates
  {
    id: 'nature-photography',
    name: 'Nature Photography',
    description: 'Beautiful nature and landscape photos',
    type: 'photos',
    icon: '🌲',
    metadata: {
      name: 'Nature Photography Pack',
      description:
        'A stunning collection of nature and landscape photographs from around the world',
      version: '1.0.0',
      author: 'Your Name',
      icon_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      screenshot_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    },
    content: {
      photos: [
        {
          photographer: 'Sample Photographer',
          location: 'Mountains, Norway',
          url: { default: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4' },
        },
        {
          photographer: 'Sample Photographer',
          location: 'Forest, Canada',
          url: { default: 'https://images.unsplash.com/photo-1511497584788-876760111969' },
        },
        {
          photographer: 'Sample Photographer',
          location: 'Lake, Switzerland',
          url: { default: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4' },
        },
      ],
    },
  },
  {
    id: 'urban-photography',
    name: 'Urban & Architecture',
    description: 'Modern cityscapes and architectural wonders',
    type: 'photos',
    icon: '🏙️',
    metadata: {
      name: 'Urban Architecture Pack',
      description: 'Modern cityscapes, skylines, and architectural photography',
      version: '1.0.0',
      author: 'Your Name',
      icon_url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
      screenshot_url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
    },
    content: {
      photos: [
        {
          photographer: 'Sample Photographer',
          location: 'New York City, USA',
          url: { default: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b' },
        },
        {
          photographer: 'Sample Photographer',
          location: 'Tokyo, Japan',
          url: { default: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf' },
        },
      ],
    },
  },
  {
    id: 'minimal-photography',
    name: 'Minimal & Abstract',
    description: 'Clean, minimalist photography',
    type: 'photos',
    icon: '⚪',
    metadata: {
      name: 'Minimal Photography Pack',
      description: 'Clean, minimalist, and abstract photography for a calm browsing experience',
      version: '1.0.0',
      author: 'Your Name',
      icon_url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1',
      screenshot_url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1',
    },
    content: {
      photos: [
        {
          photographer: 'Sample Photographer',
          location: 'Studio',
          url: { default: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1' },
        },
      ],
    },
  },

  // Quote Pack Templates
  {
    id: 'motivational-quotes',
    name: 'Motivational Quotes',
    description: 'Inspiring quotes to start your day',
    type: 'quotes',
    icon: '💪',
    metadata: {
      name: 'Motivational Quotes',
      description: 'A collection of inspiring and motivational quotes to boost your productivity',
      version: '1.0.0',
      author: 'Your Name',
      icon_url: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9',
      screenshot_url: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9',
    },
    content: {
      quotes: [
        {
          quote: 'The only way to do great work is to love what you do.',
          author: 'Steve Jobs',
        },
        {
          quote:
            'Success is not final, failure is not fatal: it is the courage to continue that counts.',
          author: 'Winston Churchill',
        },
        {
          quote: "Believe you can and you're halfway there.",
          author: 'Theodore Roosevelt',
        },
        {
          quote: 'The future belongs to those who believe in the beauty of their dreams.',
          author: 'Eleanor Roosevelt',
        },
        {
          quote: 'It does not matter how slowly you go as long as you do not stop.',
          author: 'Confucius',
        },
      ],
    },
  },
  {
    id: 'philosophical-quotes',
    name: 'Philosophical Quotes',
    description: 'Thought-provoking quotes from great thinkers',
    type: 'quotes',
    icon: '🤔',
    metadata: {
      name: 'Philosophical Quotes',
      description:
        'Thought-provoking quotes from philosophers and great thinkers throughout history',
      version: '1.0.0',
      author: 'Your Name',
      icon_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      screenshot_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    content: {
      quotes: [
        {
          quote: 'The unexamined life is not worth living.',
          author: 'Socrates',
        },
        {
          quote: 'I think, therefore I am.',
          author: 'René Descartes',
        },
        {
          quote:
            'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
          author: 'Ralph Waldo Emerson',
        },
        {
          quote: 'The only true wisdom is in knowing you know nothing.',
          author: 'Socrates',
        },
      ],
    },
  },
  {
    id: 'funny-quotes',
    name: 'Funny Quotes',
    description: 'Humorous quotes to brighten your day',
    type: 'quotes',
    icon: '😄',
    metadata: {
      name: 'Funny Quotes',
      description: 'A collection of witty and humorous quotes to bring a smile to your face',
      version: '1.0.0',
      author: 'Your Name',
      icon_url: 'https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4',
      screenshot_url: 'https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4',
    },
    content: {
      quotes: [
        {
          quote: "I'm not superstitious, but I am a little stitious.",
          author: 'Michael Scott',
        },
        {
          quote: 'The road to success is dotted with many tempting parking spaces.',
          author: 'Will Rogers',
        },
        {
          quote:
            'I always wanted to be somebody, but now I realize I should have been more specific.',
          author: 'Lily Tomlin',
        },
      ],
    },
  },

  // Settings Templates
  {
    id: 'minimal-theme',
    name: 'Minimal Theme',
    description: 'Clean and simple settings preset',
    type: 'settings',
    icon: '✨',
    metadata: {
      name: 'Minimal Theme',
      description: 'A clean, minimal theme with distraction-free settings',
      version: '1.0.0',
      author: 'Your Name',
      icon_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
      screenshot_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    },
    content: {
      settingsJson: JSON.stringify(
        {
          backgroundType: 'colour',
          background: '#ffffff',
          backgroundEnabled: true,
          greetingEnabled: true,
          timeEnabled: true,
          dateEnabled: false,
          quoteEnabled: false,
          searchBarEnabled: false,
        },
        null,
        2,
      ),
    },
  },
  {
    id: 'productivity-preset',
    name: 'Productivity Preset',
    description: 'Settings optimized for focus and productivity',
    type: 'settings',
    icon: '⚡',
    metadata: {
      name: 'Productivity Preset',
      description: 'Optimized settings for maximum focus and productivity',
      version: '1.0.0',
      author: 'Your Name',
      icon_url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
      screenshot_url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
    },
    content: {
      settingsJson: JSON.stringify(
        {
          backgroundType: 'colour',
          background: '#1a1a1a',
          greetingEnabled: true,
          timeEnabled: true,
          dateEnabled: true,
          quoteEnabled: true,
          searchBarEnabled: true,
          weatherEnabled: true,
          todoEnabled: true,
        },
        null,
        2,
      ),
    },
  },
  {
    id: 'dark-mode-preset',
    name: 'Dark Mode Preset',
    description: 'Eye-friendly dark theme settings',
    type: 'settings',
    icon: '🌙',
    metadata: {
      name: 'Dark Mode Preset',
      description: 'Eye-friendly dark theme perfect for night browsing',
      version: '1.0.0',
      author: 'Your Name',
      icon_url: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d',
      screenshot_url: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d',
    },
    content: {
      settingsJson: JSON.stringify(
        {
          backgroundType: 'colour',
          background: '#0a0a0a',
          theme: 'dark',
          greetingEnabled: true,
          timeEnabled: true,
          dateEnabled: true,
        },
        null,
        2,
      ),
    },
  },
];

export function getTemplatesByType(type: 'photos' | 'quotes' | 'settings'): ContentTemplate[] {
  return templates.filter((t) => t.type === type);
}

export function getTemplateById(id: string): ContentTemplate | undefined {
  return templates.find((t) => t.id === id);
}
