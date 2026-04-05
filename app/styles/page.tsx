"use client";
import { useSettings } from '@/lib/useSettings';

export default function StylesPage() {
  const { settings, saveSettings, isLoaded } = useSettings();

  if (!isLoaded) return <div className="p-12">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto px-12 py-12 w-full">
      <div className="mb-12">
        <h1 className="editorial-title text-4xl font-bold tracking-tight text-on-surface mb-2">Global Styles</h1>
        <p className="text-on-surface-variant font-label text-sm tracking-wide">Configure default styling for your exported Word documents.</p>
      </div>

      <div className="bg-surface-container-high rounded-2xl p-8 border border-outline-variant/20 shadow-sm flex flex-col gap-8">
        
        {/* Font Family */}
        <div className="flex flex-col gap-3">
          <label className="font-headline font-semibold text-on-surface">Font Family</label>
          <div className="flex gap-4">
            {['Arial', 'Times New Roman', 'Calibri'].map(font => (
              <label key={font} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="fontFamily" 
                  value={font} 
                  checked={settings.fontFamily === font}
                  onChange={(e) => saveSettings({ ...settings, fontFamily: e.target.value })}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-on-surface-variant text-sm">{font}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="flex flex-col gap-3">
          <label className="font-headline font-semibold text-on-surface">Font Size</label>
          <div className="flex gap-4">
            {[11, 12, 14].map(size => (
              <label key={size} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="fontSize" 
                  value={size} 
                  checked={settings.fontSize === size}
                  onChange={(e) => saveSettings({ ...settings, fontSize: Number(e.target.value) })}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-on-surface-variant text-sm">{size} pt</span>
              </label>
            ))}
          </div>
        </div>

        {/* Line Spacing */}
        <div className="flex flex-col gap-3">
          <label className="font-headline font-semibold text-on-surface">Line Spacing</label>
          <div className="flex gap-4">
            {[1.0, 1.15, 1.5].map(spacing => (
              <label key={spacing} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="lineSpacing" 
                  value={spacing} 
                  checked={settings.lineSpacing === spacing}
                  onChange={(e) => saveSettings({ ...settings, lineSpacing: Number(e.target.value) })}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-on-surface-variant text-sm">{spacing}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
