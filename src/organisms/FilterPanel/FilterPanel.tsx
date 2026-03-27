import { useState } from 'react';
import { cn } from '../../utils/cn';

export interface FilterOption { value: string; label: string; count?: number; }
export interface FilterGroup { id: string; label: string; options: FilterOption[]; }

export interface FilterPanelProps {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onChange: (groupId: string, values: string[]) => void;
  className?: string;
}

export function FilterPanel({ groups, selected, onChange, className }: FilterPanelProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  const isExpanded = (id: string) => expanded[id] !== false; // default open

  return (
    <aside className={cn('space-y-4', className)} aria-label="Product filters">
      {groups.map((group) => (
        <div key={group.id} className="border rounded-md">
          <button
            type="button"
            onClick={() => toggle(group.id)}
            className="flex w-full items-center justify-between p-3 text-sm font-medium hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={isExpanded(group.id)}
            aria-controls={`filter-${group.id}`}
          >
            {group.label}
            <span aria-hidden="true">{isExpanded(group.id) ? '−' : '+'}</span>
          </button>
          <div id={`filter-${group.id}`} hidden={!isExpanded(group.id)} className="p-3 pt-0 space-y-2">
            {group.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={(selected[group.id] ?? []).includes(option.value)}
                  onChange={(e) => {
                    const current = selected[group.id] ?? [];
                    onChange(group.id, e.target.checked ? [...current, option.value] : current.filter((v) => v !== option.value));
                  }}
                  className="rounded border-input focus:ring-2 focus:ring-primary"
                />
                {option.label}
                {option.count !== undefined && <span className="ml-auto text-muted-foreground text-xs">({option.count})</span>}
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
