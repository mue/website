import { NextResponse } from 'next/server';
import { ChromeWebStore } from 'webextension-store-meta';

interface BrowserVersions {
  chrome: string | null;
  edge: string | null;
  firefox: string | null;
  whale: string | null;
}

async function fetchFirefoxVersion(): Promise<string | null> {
  try {
    const response = await fetch('https://addons.mozilla.org/api/v5/addons/addon/mue/', {
      headers: {
        'User-Agent': 'Mue Website/1.0',
      },
    });

    if (!response.ok) {
      console.error('Firefox API error:', response.status);
      return null;
    }

    const data = await response.json();
    return data.current_version?.version || null;
  } catch (error) {
    console.error('Error fetching Firefox version:', error);
    return null;
  }
}

async function fetchChromeVersion(): Promise<string | null> {
  try {
    const store = await ChromeWebStore.load({ id: 'bngmbednanpcfochchhgbkookpiaiaid' });
    return store.version();
  } catch (error) {
    console.error('Error fetching Chrome version:', error);
    return null;
  }
}

async function fetchEdgeVersion(): Promise<string | null> {
  try {
    // Edge Add-ons API endpoint
    const response = await fetch(
      'https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/aepnglgjfokepefimhbnibfjekidhmja',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        },
      },
    );

    if (!response.ok) {
      console.error('Edge Add-ons API error:', response.status);
      return null;
    }

    const data = await response.json();
    return data.version || null;
  } catch (error) {
    console.error('Error fetching Edge version:', error);
    return null;
  }
}

async function fetchWhaleVersion(chromeVersion: string | null): Promise<string | null> {
  // Whale API is super broken
  return chromeVersion;
}

export async function GET() {
  try {
    // Fetch Chrome, Edge, and Firefox in parallel
    const [chrome, edge, firefox] = await Promise.all([
      fetchChromeVersion(),
      fetchEdgeVersion(),
      fetchFirefoxVersion(),
    ]);

    const whale = await fetchWhaleVersion(chrome);

    const versions: BrowserVersions = {
      chrome,
      edge,
      firefox,
      whale,
    };

    return NextResponse.json(versions, {
      headers: {
        // Cache for 1 hour
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error fetching browser versions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch browser versions' },
      { status: 500 },
    );
  }
}
