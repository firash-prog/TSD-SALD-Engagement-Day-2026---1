import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ItemData, DataContextType } from '../types';
import { STATIC_ITEMS } from '../constants';

const DataContext = createContext<DataContextType | undefined>(undefined);

// New storage key for text-only persistence
const STORAGE_KEY = 'tsd_oasis_text_v1';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItemData[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedOverrides = JSON.parse(stored); // Expected format: { "1": { name: "...", description: "..." }, ... }
          
          // Merge STATIC images with STORED text
          return STATIC_ITEMS.map((staticItem) => {
            const override = parsedOverrides[staticItem.id];
            return override 
              ? { ...staticItem, name: override.name, description: override.description } 
              : staticItem;
          });
        }
      }
    } catch (error) {
      console.error('Failed to initialize data from storage', error);
    }
    return STATIC_ITEMS;
  });

  // Save ONLY text changes to local storage whenever items change
  useEffect(() => {
    try {
      // Convert array to a lightweight map of ID -> { name, description }
      const overrides = items.reduce((acc, item) => {
        acc[item.id] = { name: item.name, description: item.description };
        return acc;
      }, {} as Record<string, { name: string; description: string }>);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch (e) {
      console.error("Storage failed", e);
    }
  }, [items]);

  const updateItem = (id: string, data: Partial<ItemData>) => {
    // We only allow updating text fields via this method now
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all text to defaults? This cannot be undone.')) {
        setItems(STATIC_ITEMS);
        localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <DataContext.Provider value={{ items, updateItem, resetToDefaults }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};