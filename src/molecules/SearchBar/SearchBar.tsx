'use client';
import { useState, useRef, useCallback, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';

export interface SearchSuggestion { id: string; label: string; url?: string; }

export interface SearchBarProps {
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  onSearch: (query: string) => void;
  onSuggestionsFetch?: (query: string) => void;
  className?: string;
}

export function SearchBar({ placeholder = 'Search products...', suggestions = [], onSearch, onSuggestionsFetch, className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = 'search-suggestions';

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter') onSearch(query);
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, -1)); }
    else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const active = suggestions[activeIndex];
      if (active) {
        onSearch(active.label);
        setQuery(active.label);
      }
      setIsOpen(false);
    } else if (e.key === 'Escape') { setIsOpen(false); setActiveIndex(-1); }
  }, [isOpen, suggestions, activeIndex, onSearch, query]);

  return (
    <div className={cn('relative', className)}>
      <input
        ref={inputRef}
        type="search"
        role="combobox"
        aria-expanded={isOpen && suggestions.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
        value={query}
        placeholder={placeholder}
        className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onChange={(e) => { setQuery(e.target.value); onSuggestionsFetch?.(e.target.value); setIsOpen(true); }}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      />
      {isOpen && suggestions.length > 0 && (
        <ul id={listId} role="listbox" className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              id={`suggestion-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              className={cn('px-3 py-2 text-sm cursor-pointer hover:bg-accent', i === activeIndex && 'bg-accent')}
              onMouseDown={() => { onSearch(s.label); setQuery(s.label); setIsOpen(false); }}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
