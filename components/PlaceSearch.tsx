'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { PlaceSearchResult } from '@/types';

interface PlaceSearchProps {
  locationBias?: { lat: number; lng: number };
  onSelect: (result: PlaceSearchResult) => void;
}

export function PlaceSearch({ locationBias, onSelect }: PlaceSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlaceSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fetchResults = useCallback(
    async (q: string) => {
      if (q.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const params = new URLSearchParams({ q });
        if (locationBias) {
          params.set('lat', String(locationBias.lat));
          params.set('lng', String(locationBias.lng));
        }
        const res = await fetch(`/api/places/search?${params}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } finally {
        setLoading(false);
      }
    },
    [locationBias]
  );

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(() => fetchResults(query), 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, fetchResults]);

  const handleSelect = (result: PlaceSearchResult) => {
    onSelect(result);
    setQuery('');
    setResults([]);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const showDropdown = focused && (results.length > 0 || loading);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 rounded-xl px-4 py-3 transition-colors duration-150"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        <Search
          className="w-5 h-5 shrink-0"
          style={{ color: 'var(--text-secondary)' }}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search restaurants, cafes, bars..."
          className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-[var(--text-secondary)]/40"
          style={{ color: 'var(--text-primary)' }}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {loading && (
          <Loader2
            className="w-4 h-4 animate-spin shrink-0"
            style={{ color: 'var(--text-secondary)' }}
          />
        )}
        {query && !loading && (
          <button onClick={handleClear} className="shrink-0 p-0.5">
            <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          className="absolute z-50 left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-2xl"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          {loading && results.length === 0 && (
            <div className="px-4 py-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
              Searching...
            </div>
          )}
          {results.map((result) => (
            <button
              key={result.placeId}
              onClick={() => handleSelect(result)}
              className="w-full text-left px-4 py-3 transition-colors duration-100"
              style={{ borderBottom: '1px solid var(--border-color-subtle)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
            >
              <p
                className="text-[14px] font-medium truncate"
                style={{ color: 'var(--text-primary)' }}
              >
                {result.name}
              </p>
              <p
                className="text-[12px] truncate mt-0.5"
                style={{ color: 'var(--text-secondary)', opacity: 0.7 }}
              >
                {result.address}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
