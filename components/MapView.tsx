'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Navigation, Loader2 } from 'lucide-react';
import { PlaceWithStatus, PlaceStatus } from '@/types';
import { formatTime12h } from '@/lib/time-utils';

const PIN_COLORS: Record<PlaceStatus, string> = {
  open: '#22C55E',
  closing_soon: '#EAB308',
  opening_soon: '#3B82F6',
  closed: '#EF4444',
  closed_today: '#EF4444',
};

const STATUS_LABELS: Record<PlaceStatus, string> = {
  open: 'Open',
  closing_soon: 'Closing Soon',
  opening_soon: 'Opening Soon',
  closed: 'Closed',
  closed_today: 'Closed Today',
};

const WALKING_DISTANCE_KM = 1.5;

const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#1a1a2e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a0a0f' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8898aa' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#252540' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#252540' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1a1a2e' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2d2d4a' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1a2b' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4a5568' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#15202e' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#1f1f38' }] },
];

interface MapViewProps {
  places: PlaceWithStatus[];
  center: { lat: number; lng: number };
  isDark: boolean;
}

function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      sinLng *
      sinLng;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function pinSvg(color: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="38" viewBox="0 0 30 38">` +
    `<path d="M15 0C6.72 0 0 6.72 0 15c0 11.25 15 23 15 23s15-11.75 15-23C30 6.72 23.28 0 15 0z" fill="${color}" stroke="#fff" stroke-width="2"/>` +
    `<circle cx="15" cy="15" r="5.5" fill="#fff" opacity=".9"/>` +
    `</svg>`;
}

function infoHtml(place: PlaceWithStatus): string {
  const status = place.statusInfo.status;
  const color = PIN_COLORS[status];
  const label = STATUS_LABELS[status];

  const h = place.todayHours;
  let hoursText = 'Closed today';
  if (h && !h.isClosed && h.openTime && h.closeTime) {
    hoursText = `${formatTime12h(h.openTime)} – ${formatTime12h(h.closeTime)}`;
  }

  let timeLine = '';
  if (place.statusInfo.timeLeft) {
    timeLine = `<div style="font-size:12px;color:#94A3B8;margin-top:3px">⏱ ${place.statusInfo.timeLeft} left</div>`;
  } else if (place.statusInfo.opensIn) {
    timeLine = `<div style="font-size:12px;color:#94A3B8;margin-top:3px">⏱ Opens in ${place.statusInfo.opensIn}</div>`;
  }

  const dest =
    place.latitude != null && place.longitude != null
      ? `${place.latitude},${place.longitude}`
      : encodeURIComponent(place.address || place.name);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest}`;

  return (
    `<div style="font-family:system-ui,-apple-system,sans-serif;min-width:190px;max-width:260px;padding:2px">` +
    `<div style="font-size:15px;font-weight:600;color:#0F172A;margin-bottom:6px;line-height:1.3">${place.name}</div>` +
    `<div style="display:flex;align-items:center;gap:5px;margin-bottom:4px">` +
    `<span style="width:8px;height:8px;border-radius:50%;background:${color};display:inline-block;flex-shrink:0"></span>` +
    `<span style="font-size:13px;font-weight:600;color:${color}">${label}</span>` +
    `</div>` +
    `<div style="font-size:13px;color:#475569">${hoursText}</div>` +
    timeLine +
    `<a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" ` +
    `style="display:inline-flex;align-items:center;gap:4px;margin-top:10px;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:500;color:#fff;background:#7C3AED;text-decoration:none">` +
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>` +
    `Directions</a>` +
    `</div>`
  );
}

let loadPromise: Promise<void> | null = null;

function loadGoogleMaps(): Promise<void> {
  if (typeof window !== 'undefined' && window.google?.maps) {
    return Promise.resolve();
  }
  if (loadPromise) return loadPromise;

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) {
    return Promise.reject(new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set'));
  }

  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="maps.googleapis.com/maps/api/js"]',
    );
    if (existing) {
      if (window.google?.maps) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps')));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null;
      reject(new Error('Failed to load Google Maps'));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

export function MapView({ places, center, isDark }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoRef = useRef<google.maps.InfoWindow | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nearMe, setNearMe] = useState(false);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const visiblePlaces = useMemo(() => {
    if (!nearMe || !userPos) return places;
    return places.filter(
      (p) =>
        p.latitude != null &&
        p.longitude != null &&
        haversineKm(userPos, { lat: p.latitude!, lng: p.longitude! }) <=
          WALKING_DISTANCE_KM,
    );
  }, [places, nearMe, userPos]);

  useEffect(() => {
    loadGoogleMaps()
      .then(() => setLoaded(true))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = new google.maps.Map(containerRef.current, {
        center,
        zoom: 13,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: isDark ? DARK_MAP_STYLES : undefined,
        backgroundColor: isDark ? '#0a0a0f' : '#f8fafc',
        clickableIcons: false,
      });
      infoRef.current = new google.maps.InfoWindow();
    } else {
      mapRef.current.setOptions({
        styles: isDark ? DARK_MAP_STYLES : undefined,
        backgroundColor: isDark ? '#0a0a0f' : '#f8fafc',
      });
    }
  }, [loaded, center, isDark]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded) return;

    markersRef.current.forEach((m) => {
      google.maps.event.clearInstanceListeners(m);
      m.setMap(null);
    });
    markersRef.current = [];

    const bounds = new google.maps.LatLngBounds();
    let count = 0;

    for (const place of visiblePlaces) {
      if (place.latitude == null || place.longitude == null) continue;

      const pos = { lat: place.latitude, lng: place.longitude };
      const color = PIN_COLORS[place.statusInfo.status];

      const marker = new google.maps.Marker({
        position: pos,
        map,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(pinSvg(color))}`,
          scaledSize: new google.maps.Size(30, 38),
          anchor: new google.maps.Point(15, 38),
        },
        title: place.name,
        optimized: true,
      });

      marker.addListener('click', () => {
        infoRef.current?.setContent(infoHtml(place));
        infoRef.current?.open(map, marker);
      });

      markersRef.current.push(marker);
      bounds.extend(pos);
      count++;
    }

    if (count > 1) {
      map.fitBounds(bounds, 50);
    } else if (count === 1) {
      map.setCenter(bounds.getCenter());
      map.setZoom(15);
    } else {
      map.setCenter(center);
      map.setZoom(13);
    }
  }, [visiblePlaces, loaded, center]);

  const toggleNearMe = useCallback(() => {
    if (nearMe) {
      setNearMe(false);
      setGeoError(null);
      return;
    }

    if (userPos) {
      setNearMe(true);
      return;
    }

    if (!navigator.geolocation) {
      setGeoError('Geolocation not supported');
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setNearMe(true);
        setGeoLoading(false);
      },
      (err) => {
        setGeoLoading(false);
        setGeoError(
          err.code === err.PERMISSION_DENIED ? 'denied' : 'failed',
        );
      },
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  }, [nearMe, userPos]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full px-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--status-closed-bg)] flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[var(--status-closed)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Map unavailable</p>
          <p className="text-xs text-[var(--text-secondary)] max-w-[240px]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)] z-10">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" />
        </div>
      )}

      <div ref={containerRef} className="w-full h-full" />

      <button
        onClick={toggleNearMe}
        disabled={geoLoading}
        className={[
          'absolute top-4 right-4 z-10',
          'flex items-center gap-2 px-4 py-2.5 rounded-full',
          'text-sm font-medium shadow-lg',
          'backdrop-blur-xl border',
          'transition-all duration-150',
          'active:scale-95 disabled:opacity-50',
          nearMe
            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
            : 'bg-[var(--bg-card)]/90 text-[var(--text-primary)] border-white/[0.06]',
        ].join(' ')}
      >
        {geoLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Navigation className="w-4 h-4" fill={nearMe ? 'currentColor' : 'none'} />
        )}
        Near me
      </button>

      {nearMe && visiblePlaces.length === 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-[var(--bg-card)] text-[var(--text-secondary)] text-sm px-4 py-2.5 rounded-full border border-white/[0.06] backdrop-blur-xl shadow-lg whitespace-nowrap">
          No places within walking distance
        </div>
      )}

      {geoError && !nearMe && (
        <div
          className="absolute bottom-6 left-4 right-4 z-10 rounded-2xl p-4 border shadow-lg backdrop-blur-xl"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color-subtle)',
          }}
        >
          <p
            className="text-[14px] font-semibold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            {geoError === 'denied'
              ? 'Location access denied'
              : 'Unable to get location'}
          </p>
          <p
            className="text-[12px] leading-relaxed mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            {geoError === 'denied'
              ? 'To use "Near me", enable location access in your browser settings (Settings \u2192 Safari \u2192 Location Services).'
              : 'Check your connection and try again.'}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setGeoError(null);
                toggleNearMe();
              }}
              className="text-[13px] font-medium px-4 py-2 rounded-lg transition-opacity active:opacity-80"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              Try again
            </button>
            <button
              onClick={() => setGeoError(null)}
              className="text-[13px] font-medium px-4 py-2 rounded-lg transition-opacity active:opacity-80"
              style={{ color: 'var(--text-secondary)' }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {loaded && visiblePlaces.length > 0 && (
        <div className="absolute bottom-6 left-4 z-10 flex flex-wrap gap-2">
          {([
            ['open', 'Open'],
            ['closing_soon', 'Closing'],
            ['opening_soon', 'Opening'],
            ['closed', 'Closed'],
          ] as const).map(([key, lbl]) => {
            const count = visiblePlaces.filter(
              (p) =>
                p.statusInfo.status === key ||
                (key === 'closed' && p.statusInfo.status === 'closed_today'),
            ).length;
            if (count === 0) return null;
            return (
              <div
                key={key}
                className="flex items-center gap-1.5 bg-[var(--bg-card)]/90 backdrop-blur-xl px-2.5 py-1 rounded-full border border-white/[0.06] shadow-sm"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: PIN_COLORS[key] }}
                />
                <span className="text-xs text-[var(--text-secondary)]">
                  {lbl} ({count})
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
