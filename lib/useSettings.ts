"use client";
import { useState, useEffect } from 'react';

export interface Settings {
  fontFamily: string;
  fontSize: number;
  lineSpacing: number;
}

const defaultSettings: Settings = {
  fontFamily: 'Arial',
  fontSize: 12,
  lineSpacing: 1.15,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('rapihin_settings');
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem('rapihin_settings', JSON.stringify(newSettings));
  };

  return { settings, saveSettings, isLoaded };
}
