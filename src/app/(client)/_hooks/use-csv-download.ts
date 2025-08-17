'use client';
import { useRef } from 'react';

import { generateCSV } from '@/app/(server)/actions/csv';
import type { Character } from '@/app/_types/character';

export function useCSVDownload(characters: Character[]) {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    if (!characters.length || !downloadRef.current) return;

    try {
      const blob = generateCSV(characters);
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = downloadRef.current;
      link.href = url;
      link.download = `${characters.length}_characters.csv`;
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error('CSV download failed:', error);
    }
  };

  return { downloadRef, handleDownload };
}
