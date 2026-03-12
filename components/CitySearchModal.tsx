'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, MapPin, Loader2 } from 'lucide-react';

export interface CityResult {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface Suggestion {
  placeId: string;
  name: string;
  description: string;
}

interface CitySearchModalProps {
  open: boolean;
  title: string;
  onSelect: (city: CityResult) => void;
  onClose: () => void;
}

export function CitySearchModal({
  open,
  title,
  onSelect,
  onClose,
}: CitySearchModalProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selecting, setSelecting] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSuggestions([]);
      setSelecting(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // Prevent body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/geo/autocomplete?q=${encodeURIComponent(q)}`,
      );
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.suggestions ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 250);
    return () => clearTimeout(debounceRef.current);
  }, [query, fetchSuggestions]);

  const handleSelect = useCallback(
    async (suggestion: Suggestion) => {
      setSelecting(suggestion.placeId);
      try {
        const res = await fetch(
          `/api/geo/forward?city=${encodeURIComponent(suggestion.name)}`,
        );
        let lat = 0;
        let lng = 0;
        if (res.ok) {
          const data = await res.json();
          lat = data.latitude ?? 0;
          lng = data.longitude ?? 0;
        }
        onSelect({
          name: suggestion.name,
          description: suggestion.description,
          latitude: lat,
          longitude: lng,
        });
      } catch {
        onSelect({
          name: suggestion.name,
          description: suggestion.description,
          latitude: 0,
          longitude: 0,
        });
      } finally {
        setSelecting(null);
      }
    },
    [onSelect],
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="relative mt-auto rounded-t-2xl flex flex-col"
        style={{
          backgroundColor: 'var(--bg-primary)',
          maxHeight: '85dvh',
          minHeight: '50dvh',
          boxShadow: '0 -8px 30px rgba(0,0,0,0.2)',
        }}
      >
        {/* Handle + Title */}
        <div className="pt-3 pb-2 px-5 flex flex-col items-center shrink-0">
          <div
            className="w-9 h-1 rounded-full mb-3"
            style={{ backgroundColor: 'var(--border-color-subtle)' }}
          />
          <div className="w-full flex items-center justify-between">
            <h2
              className="text-[16px] font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 -mr-1.5 rounded-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="px-4 pb-3 shrink-0">
          <div
            className="flex items-center gap-2.5 rounded-xl px-4 py-3"
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
              placeholder="Search for a city..."
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
              <button
                onClick={() => {
                  setQuery('');
                  setSuggestions([]);
                  inputRef.current?.focus();
                }}
                className="shrink-0 p-0.5"
              >
                <X
                  className="w-4 h-4"
                  style={{ color: 'var(--text-secondary)' }}
                />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          {suggestions.length > 0 && (
            <div
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color-subtle)',
              }}
            >
              {suggestions.map((s, i) => {
                const isSelecting = selecting === s.placeId;
                return (
                  <button
                    key={s.placeId}
                    onClick={() => handleSelect(s)}
                    disabled={!!selecting}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors duration-100 active:opacity-70"
                    style={{
                      borderBottom:
                        i < suggestions.length - 1
                          ? '1px solid var(--border-color-subtle)'
                          : undefined,
                      opacity: selecting && !isSelecting ? 0.4 : 1,
                    }}
                  >
                    <MapPin
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--accent)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[14px] font-medium truncate"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {s.name}
                      </p>
                      <p
                        className="text-[12px] truncate mt-0.5"
                        style={{
                          color: 'var(--text-secondary)',
                          opacity: 0.7,
                        }}
                      >
                        {s.description}
                      </p>
                    </div>
                    {isSelecting && (
                      <Loader2
                        className="w-4 h-4 animate-spin shrink-0"
                        style={{ color: 'var(--accent)' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {!loading && query.length >= 2 && suggestions.length === 0 && (
            <div
              className="rounded-xl px-4 py-8 text-center text-sm"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              No cities found
            </div>
          )}

          {query.length < 2 && (
            <p
              className="text-center text-[13px] mt-6"
              style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
            >
              Start typing to search cities
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
