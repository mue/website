import { ImageResponse } from 'next/og';
import { getMarketplaceCollection } from '@/lib/marketplace';

export const runtime = 'edge';
export const alt = 'Mue Marketplace Collection';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

type OpenGraphImageProps = {
  params: Promise<{
    collection: string;
  }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { collection } = await params;

  try {
    const data = await getMarketplaceCollection(collection);

    const itemCount = data.items?.length || 0;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            position: 'relative',
            backgroundColor: '#0a0a0a',
          }}
        >
          {/* Gradient overlay - top right */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background:
                'radial-gradient(ellipse at top right, rgba(255, 92, 37, 0.15) 0%, rgba(210, 26, 17, 0.1) 30%, transparent 60%)',
            }}
          />
          {/* Gradient overlay - bottom left */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background:
                'radial-gradient(ellipse at bottom left, rgba(255, 69, 110, 0.15) 0%, rgba(210, 26, 17, 0.1) 30%, transparent 60%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '40px',
              right: '80px',
              fontSize: '18px',
              fontWeight: '500',
              color: '#d4d4d8',
              backgroundColor: 'rgba(139, 69, 19, 0.2)',
              padding: '8px 30px',
              borderRadius: '30px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Collection
          </div>

          {/* Content container */}
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              padding: '60px 80px',
              position: 'relative',
            }}
          >
            {/* Main content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '32px',
                flex: 1,
              }}
            >
              {/* Collection image */}
              {data.img ? (
                <img
                  src={data.img}
                  alt={data.display_name}
                  width="160"
                  height="160"
                  style={{
                    borderRadius: '32px',
                    border: '3px solid #27272a',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '32px',
                    border: '3px solid #27272a',
                    backgroundColor: '#18181b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '64px',
                    fontWeight: 'bold',
                    color: '#52525b',
                  }}
                >
                  {data.display_name.slice(0, 2).toUpperCase()}
                </div>
              )}

              {/* Collection name */}
              <div
                style={{
                  fontSize: '56px',
                  fontWeight: '700',
                  color: '#ffffff',
                  textAlign: 'center',
                  maxWidth: '900px',
                  lineHeight: 1.2,
                  letterSpacing: '-1.5px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {data.display_name}
              </div>

              {/* Item count badge */}
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#d4d4d8',
                  backgroundColor: 'rgba(139, 69, 19, 0.2)',
                  padding: '8px 30px',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ color: '#a1a1aa' }}>
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '24px',
                borderTop: '1px solid #27272a',
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="250" cy="250" r="250" fill="white" fill-opacity="0.77" />
                <path
                  d="M290.047 135.002V166.829H358.887V235.121H391.001V135.002H290.047Z"
                  fill="#231212"
                />
                <path
                  d="M312.871 240.703H284.417V269.122H258.163V240.703H229.69V214.5H258.163V186.101H284.417V214.5H312.871V240.703ZM351.263 173.01H282.584V149.185H167.406V306.039H375.154V241.578H351.263V173.01Z"
                  fill="#231212"
                />
                <path
                  d="M160.257 178.385H138.199V335.238H345.947V313.161H160.257V178.385Z"
                  fill="#231212"
                />
                <path
                  d="M131.058 207.588H109V364.441H316.748V342.365H131.058V207.588Z"
                  fill="#231212"
                />
              </svg>
              <div
                style={{
                  fontSize: '18px',
                  color: '#71717a',
                }}
              >
                muetab.com/marketplace
              </div>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      },
    );
  } catch {
    // Fallback OG image if collection not found
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '48px', fontWeight: 'bold' }}>Mue Marketplace</div>
          <div style={{ fontSize: '24px', color: '#a1a1aa', marginTop: '16px' }}>
            Collection not found
          </div>
        </div>
      ),
      {
        ...size,
      },
    );
  }
}
