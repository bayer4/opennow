import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#8B5CF6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <circle cx="55" cy="55" r="42" stroke="white" strokeWidth="7" />
          <line x1="55" y1="55" x2="55" y2="22" stroke="white" strokeWidth="7" strokeLinecap="round" />
          <line x1="55" y1="55" x2="82" y2="55" stroke="white" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="55" cy="55" r="5" fill="white" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
