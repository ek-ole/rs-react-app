import { describe, it, expect } from 'vitest';

import reducer, { toggle, clearAll } from '@/services/selected-characters';
import type { Character } from '@/types/character';

describe('selectedCharacters slice', () => {
  const mockCharacter1: Character = {
    id: 1,
    name: 'Rick Sanchez',
    description: 'Status: Alive\nLocation: Earth',
    image: 'rick.png',
  };

  const mockCharacter2: Character = {
    id: 2,
    name: 'Morty Smith',
    description: 'Status: Alive\nLocation: Earth',
    image: 'morty.png',
  };

  describe('initial state', () => {
    it('should return initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual({
        ids: [],
        characters: [],
      });
    });
  });

  describe('toggle action', () => {
    it('should add new character when not exists', () => {
      const initialState = { ids: [], characters: [] };
      const result = reducer(initialState, toggle(mockCharacter1));

      expect(result).toEqual({
        ids: [1],
        characters: [mockCharacter1],
      });
    });

    it('should remove character when exists', () => {
      const initialState = {
        ids: [1],
        characters: [mockCharacter1],
      };
      const result = reducer(initialState, toggle(mockCharacter1));

      expect(result).toEqual({
        ids: [],
        characters: [],
      });
    });

    it('should not modify state when adding existing character', () => {
      const initialState = {
        ids: [1],
        characters: [mockCharacter1],
      };
      const result = reducer(initialState, toggle(mockCharacter1));

      expect(result).not.toBe(initialState);
      expect(result.ids).toEqual([]);
    });
  });

  describe('clearAll action', () => {
    it('should clear all characters', () => {
      const initialState = {
        ids: [1, 2],
        characters: [mockCharacter1, mockCharacter2],
      };
      const result = reducer(initialState, clearAll());

      expect(result).toEqual({
        ids: [],
        characters: [],
      });
    });

    it('should work with empty state', () => {
      const initialState = { ids: [], characters: [] };
      const result = reducer(initialState, clearAll());

      expect(result).toEqual({
        ids: [],
        characters: [],
      });
    });
  });

  describe('immutability', () => {
    it('toggle should not mutate state', () => {
      const initialState = { ids: [1], characters: [mockCharacter1] };
      const result = reducer(initialState, toggle(mockCharacter2));

      expect(result).not.toBe(initialState);
      expect(result.ids).not.toBe(initialState.ids);
      expect(result.characters).not.toBe(initialState.characters);
    });

    it('clearAll should not mutate state', () => {
      const initialState = { ids: [1], characters: [mockCharacter1] };
      const result = reducer(initialState, clearAll());

      expect(result).not.toBe(initialState);
      expect(result.ids).not.toBe(initialState.ids);
      expect(result.characters).not.toBe(initialState.characters);
    });
  });
});
