import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: '#8B5CF6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1.8" />
          <line x1="10" y1="10" x2="10" y2="4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="10" y1="10" x2="14.5" y2="10" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="10" cy="10" r="1" fill="white" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
