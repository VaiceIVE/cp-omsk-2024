import React from 'react';

export interface ICreatingPageContext {
  docFile: File | null;
  tableFile: File | null;
  setDocFile: React.Dispatch<React.SetStateAction<File | null>>;
  setTableFile: React.Dispatch<React.SetStateAction<File | null>>;
  resetDocRef: React.RefObject<() => void>;
  resetTableRef: React.RefObject<() => void>;
}

export const CreatingPageContext =
  React.createContext<ICreatingPageContext | null>(null);
