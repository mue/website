import { FC } from 'react';

type JsonLdProps = {
  data: Record<string, unknown>;
};

export const JsonLd: FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
};

// Organization Schema
export const OrganizationJsonLd: FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mue',
    url: 'https://muetab.com',
    logo: 'https://muetab.com/og-image.png',
    description:
      'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
    sameAs: [
      'https://github.com/mue/mue',
      'https://twitter.com/getmue',
      'https://discord.gg/zv8C9F8',
    ],
    foundingDate: '2018',
  };

  return <JsonLd data={data} />;
};

// WebSite Schema with Search Action
export const WebSiteJsonLd: FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mue',
    url: 'https://muetab.com',
    description:
      'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://muetab.com/marketplace?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={data} />;
};

// SoftwareApplication Schema
type SoftwareApplicationJsonLdProps = {
  operatingSystem?: string;
  applicationCategory?: string;
};

export const SoftwareApplicationJsonLd: FC<SoftwareApplicationJsonLdProps> = ({
  operatingSystem = 'Chrome, Firefox, Edge, Whale',
  applicationCategory = 'BrowserExtension',
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mue',
    applicationCategory,
    operatingSystem,
    description:
      'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
    url: 'https://muetab.com',
    downloadUrl: 'https://muetab.com/download',
    screenshot: 'https://muetab.com/muetab_screenshot_2.webp',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '5000',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'The Mue Authors',
      url: 'https://muetab.com',
    },
  };

  return <JsonLd data={data} />;
};

// WebPage Schema
type WebPageJsonLdProps = {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
};

export const WebPageJsonLd: FC<WebPageJsonLdProps> = ({
  title,
  description,
  url,
  datePublished,
  dateModified,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      '@type': 'Organization',
      name: 'Mue',
      logo: {
        '@type': 'ImageObject',
        url: 'https://muetab.com/og-image.png',
      },
    },
  };

  return <JsonLd data={data} />;
};

// Article Schema (already exists in blog but making it reusable)
type ArticleJsonLdProps = {
  headline: string;
  description?: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  keywords?: string[];
  wordCount?: number;
  timeRequired?: string;
};

export const ArticleJsonLd: FC<ArticleJsonLdProps> = ({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
  keywords,
  wordCount,
  timeRequired,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    datePublished,
    dateModified: dateModified || datePublished,
    ...(author && {
      author: {
        '@type': 'Person',
        name: author,
      },
    }),
    ...(description && { description }),
    ...(image && { image: [image] }),
    ...(keywords && keywords.length && { keywords: keywords.join(', ') }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Mue',
      logo: {
        '@type': 'ImageObject',
        url: 'https://muetab.com/og-image.png',
      },
    },
    ...(wordCount && { wordCount }),
    ...(timeRequired && { timeRequired }),
  };

  return <JsonLd data={data} />;
};

// BreadcrumbList Schema
type BreadcrumbItem = {
  position: number;
  name: string;
  item: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

export const BreadcrumbJsonLd: FC<BreadcrumbJsonLdProps> = ({ items }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it) => ({
      '@type': 'ListItem',
      position: it.position,
      name: it.name,
      item: it.item,
    })),
  };

  return <JsonLd data={data} />;
};

// Product Schema (for marketplace items)
type ProductJsonLdProps = {
  name: string;
  description?: string;
  image?: string;
  url: string;
  brand?: string;
  category?: string;
  datePublished?: string;
  dateModified?: string;
};

export const ProductJsonLd: FC<ProductJsonLdProps> = ({
  name,
  description,
  image,
  url,
  brand,
  category,
  datePublished,
  dateModified,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    ...(description && { description }),
    ...(image && { image }),
    url,
    ...(brand && { brand: { '@type': 'Brand', name: brand } }),
    ...(category && { category }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { releaseDate: dateModified }),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return <JsonLd data={data} />;
};

// FAQPage Schema
type FAQItem = {
  question: string;
  answer: string;
};

type FAQPageJsonLdProps = {
  faqs: FAQItem[];
};

export const FAQPageJsonLd: FC<FAQPageJsonLdProps> = ({ faqs }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
};

// CollectionPage Schema
type CollectionPageJsonLdProps = {
  name: string;
  description?: string;
  url: string;
  numberOfItems?: number;
};

export const CollectionPageJsonLd: FC<CollectionPageJsonLdProps> = ({
  name,
  description,
  url,
  numberOfItems,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    ...(description && { description }),
    url,
    ...(numberOfItems && { numberOfItems }),
    publisher: {
      '@type': 'Organization',
      name: 'Mue',
      logo: {
        '@type': 'ImageObject',
        url: 'https://muetab.com/og-image.png',
      },
    },
  };

  return <JsonLd data={data} />;
};
