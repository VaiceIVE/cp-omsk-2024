import React from 'react';

export interface ICreatingPageContext {
  docFile: File | null;
  tableFile: File | null;
  setDocFile: React.Dispatch<React.SetStateAction<File | null>>;
  setTableFile: React.Dispatch<React.SetStateAction<File | null>>;
  resetDocRef: React.RefObject<() => void>;
  resetTableRef: React.RefObject<() => void>;

  selectedChart: string;
  setSelectedChart: React.Dispatch<React.SetStateAction<string>>;

  hasCharts: boolean;
  setHasCharts: React.Dispatch<React.SetStateAction<boolean>>;

  logoFiles: File[];
  setLogoFiles: React.Dispatch<React.SetStateAction<File[]>>;
  resetLogoRef: React.RefObject<() => void>;

  accentColor: string;
  setAccentColor: React.Dispatch<React.SetStateAction<string>>;
}

export const CreatingPageContext =
  React.createContext<ICreatingPageContext | null>(null);
