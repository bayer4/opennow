'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Loader2, Send } from 'lucide-react';

export type FeedbackType = 'bug' | 'feature' | 'comment';

const TYPE_LABELS: Record<FeedbackType, string> = {
  bug: 'Report a Bug',
  feature: 'Feature Request',
  comment: 'General Comment',
};

const PLACEHOLDER: Record<FeedbackType, string> = {
  bug: 'Describe what went wrong\u2026',
  feature: 'What would you like to see?\u2026',
  comment: 'Share your thoughts\u2026',
};

interface FeedbackModalProps {
  open: boolean;
  type: FeedbackType;
  cityName?: string;
  onClose: () => void;
}

export function FeedbackModal({
  open,
  type,
  cityName,
  onClose,
}: FeedbackModalProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setMessage('');
      setSending(false);
      setSent(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSend = async () => {
    if (!message.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message: message.trim(), cityName }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => onClose(), 1500);
      }
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      <div
        className="relative mt-auto rounded-t-2xl flex flex-col"
        style={{
          backgroundColor: 'var(--bg-primary)',
          maxHeight: '70dvh',
          minHeight: '40dvh',
          boxShadow: '0 -8px 30px rgba(0,0,0,0.2)',
        }}
      >
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
              {TYPE_LABELS[type]}
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

        <div className="flex-1 flex flex-col px-4 pb-6 min-h-0">
          {sent ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--status-open-bg)' }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: 'var(--status-open)' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p
                className="text-[15px] font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Thanks for your feedback!
              </p>
            </div>
          ) : (
            <>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={PLACEHOLDER[type]}
                rows={5}
                className="w-full flex-1 rounded-xl px-4 py-3 text-[14px] resize-none outline-none placeholder:text-[var(--text-secondary)]/40"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  minHeight: '120px',
                }}
              />
              <button
                onClick={handleSend}
                disabled={!message.trim() || sending}
                className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[15px] font-semibold transition-opacity active:opacity-80 disabled:opacity-40"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
