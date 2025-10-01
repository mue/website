export type AddonType = 'photos' | 'quotes' | 'settings';

export type Photo = {
  photographer: string;
  location: string;
  url: { default: string };
};

export type Quote = {
  quote: string;
  author: string;
};

export type AddonMetadata = {
  name: string;
  description: string;
  type: AddonType;
  version: string;
  author: string;
  icon_url: string;
  screenshot_url: string;
};
