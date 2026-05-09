import { createServerFn } from '@tanstack/react-start';
import { ChromeWebStore, Amo } from 'webextension-store-meta';

async function fetchFirefoxVersion(): Promise<string | null> {
  try {
    const store = await Amo.load({ id: 'mue' });
    return store.version();
  } catch {
    return null;
  }
}

async function fetchChromeVersion(): Promise<string | null> {
  try {
    const store = await ChromeWebStore.load({ id: 'bngmbednanpcfochchhgbkookpiaiaid' });
    return store.version();
  } catch {
    return null;
  }
}

async function fetchEdgeVersion(): Promise<string | null> {
  try {
    const res = await fetch(
      'https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/aepnglgjfokepefimhbnibfjekidhmja',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        },
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.version ?? null;
  } catch {
    return null;
  }
}

export const getBrowserVersions = createServerFn({ method: 'GET' }).handler(async () => {
  const [chrome, edge, firefox] = await Promise.all([
    fetchChromeVersion(),
    fetchEdgeVersion(),
    fetchFirefoxVersion(),
  ]);
  return { chrome, edge, firefox, whale: chrome };
});
