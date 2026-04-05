"use client";
import { useState, useEffect } from 'react';
import { useDocuments } from '@/lib/useDocuments';

export default function ExportPage() {
  const { documents, isLoaded } = useDocuments();
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isLoaded && documents.length > 0) {
      // For now, just grab the most recently modified document that isn't archived
      const activeDocs = documents.filter(d => !d.isArchived).sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
      if (activeDocs.length > 0) {
        setActiveDoc(activeDocs[0]);
      }
    }
  }, [documents, isLoaded]);

  if (!isLoaded) return <div className="p-12">Loading export options...</div>;

  const handleCopyText = () => {
    if (activeDoc) {
      navigator.clipboard.writeText(activeDoc.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadMd = () => {
    if (activeDoc) {
      const blob = new Blob([activeDoc.content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeDoc.title.replace(/\s+/g, '_')}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-12 py-12 w-full">
      <div className="mb-12">
        <h1 className="editorial-title text-4xl font-bold tracking-tight text-on-surface mb-2">Export Options</h1>
        <p className="text-on-surface-variant font-label text-sm tracking-wide">Advanced ways to export your active document.</p>
      </div>

      {!activeDoc ? (
        <div className="text-center py-12 text-on-surface-variant">
          <p>No active document found to export.</p>
        </div>
      ) : (
        <div className="bg-surface-container-high rounded-2xl p-8 border border-outline-variant/20 shadow-sm flex flex-col gap-6">
          <div className="mb-4">
            <h3 className="font-headline font-bold text-lg text-on-surface">Active Document: {activeDoc.title}</h3>
            <p className="text-on-surface-variant text-xs mt-1">Last Modified: {new Date(activeDoc.lastModified).toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={handleCopyText}
              className="flex items-center justify-center gap-3 p-6 bg-surface-container hover:bg-surface-container-highest border border-outline-variant/30 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-primary">{copied ? 'check' : 'content_copy'}</span>
              <span className="font-semibold text-on-surface">{copied ? 'Copied!' : 'Copy as Plain Text'}</span>
            </button>

            <button 
              onClick={handleDownloadMd}
              className="flex items-center justify-center gap-3 p-6 bg-surface-container hover:bg-surface-container-highest border border-outline-variant/30 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-primary">markdown</span>
              <span className="font-semibold text-on-surface">Download as .md</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
