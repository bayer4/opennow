'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Loader2, Plus, Check } from 'lucide-react';
import { PlaceSearchResult } from '@/types';

interface PlaceSearchProps {
  locationBias?: { lat: number; lng: number };
  cityName?: string;
  addedIds: Set<string>;
  existingIds?: Set<string>;
  addingId: string | null;
  onAdd: (result: PlaceSearchResult) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function PlaceSearch({
  locationBias,
  cityName,
  addedIds,
  existingIds,
  addingId,
  onAdd,
  placeholder = 'Search restaurants, cafes, bars...',
  autoFocus = false,
}: PlaceSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlaceSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
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
        if (cityName) {
          params.set('city', cityName);
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
    [locationBias, cityName],
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

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div>
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
          placeholder={placeholder}
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
            <X
              className="w-4 h-4"
              style={{ color: 'var(--text-secondary)' }}
            />
          </button>
        )}
      </div>

      {loading && results.length === 0 && query.length >= 2 && (
        <div
          className="mt-2 rounded-xl px-4 py-6 text-center text-sm"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <div
          className="mt-2 rounded-xl overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color-subtle)',
          }}
        >
          {results.map((result) => {
            const isExisting = existingIds?.has(result.placeId) ?? false;
            const isAdded = addedIds.has(result.placeId);
            const isAdding = addingId === result.placeId;

            return (
              <div
                key={result.placeId}
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  borderBottom: '1px solid var(--border-color-subtle)',
                  opacity: isExisting ? 0.5 : 1,
                }}
              >
                <div className="flex-1 min-w-0">
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
                </div>

                {isExisting ? (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--bg-secondary, var(--bg-card))' }}
                  >
                    <Check
                      className="w-4 h-4"
                      style={{ color: 'var(--text-secondary)' }}
                    />
                  </div>
                ) : isAdded ? (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--status-open-bg)' }}
                  >
                    <Check
                      className="w-4 h-4"
                      style={{ color: 'var(--status-open)' }}
                    />
                  </div>
                ) : isAdding ? (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                    <Loader2
                      className="w-4 h-4 animate-spin"
                      style={{ color: 'var(--accent)' }}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => onAdd(result)}
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-100 active:scale-90"
                    style={{
                      backgroundColor: 'var(--accent)',
                    }}
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loading && query.length >= 2 && results.length === 0 && (
        <div
          className="mt-2 rounded-xl px-4 py-6 text-center text-sm"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          No results found
        </div>
      )}
    </div>
  );
}
