import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
const meta: Meta<typeof SearchBar> = { title: 'Molecules/SearchBar', component: SearchBar };
export default meta;
export const Default: StoryObj<typeof SearchBar> = { args: { onSearch: (q) => console.log('Search:', q) } };
export const WithSuggestions: StoryObj<typeof SearchBar> = {
  args: {
    onSearch: (q) => console.log('Search:', q),
    suggestions: [{ id: '1', label: 'Widget Pro' }, { id: '2', label: 'Widget Lite' }, { id: '3', label: 'Widget Max' }],
  },
};
