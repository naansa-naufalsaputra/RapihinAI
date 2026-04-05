"use client";
import Link from 'next/link';
import { useDocuments } from '@/lib/useDocuments';

export default function ArchivePage() {
  const { documents, restoreDocument, deleteDocument, isLoaded } = useDocuments();

  if (!isLoaded) return <div className="p-12">Loading archive...</div>;

  const archivedDocuments = documents.filter(doc => doc.isArchived);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-6xl mx-auto px-12 py-12 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="editorial-title text-4xl font-bold tracking-tight text-on-surface mb-2">Archive</h1>
          <p className="text-on-surface-variant font-label text-sm tracking-wide">Restore or permanently delete your old drafts</p>
        </div>
      </div>

      {archivedDocuments.length === 0 ? (
        <div className="text-center py-24 text-on-surface-variant">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-50">inventory_2</span>
          <p className="font-headline text-lg">Your archive is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {archivedDocuments.map((doc) => (
            <div key={doc.id} className="group relative bg-surface-container-high rounded-lg p-6 flex flex-col justify-between h-64 border border-outline-variant/10 hover:bg-surface-container-highest transition-all duration-300 shadow-lg opacity-80 hover:opacity-100">
              <div className="h-32 w-full rounded-md overflow-hidden bg-surface-container mb-4">
                <div className="w-full h-full opacity-40 group-hover:opacity-60 transition-opacity bg-gradient-to-br from-slate-900/50 to-gray-800/50 grayscale"></div>
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-on-surface truncate">{doc.title}</h3>
                <p className="text-on-surface-variant text-xs mt-1">Last Modified: {formatDate(doc.lastModified)}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => restoreDocument(doc.id)} className="p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-colors" title="Restore">
                  <span className="material-symbols-outlined">restore</span>
                </button>
                <button onClick={() => deleteDocument(doc.id)} className="p-2 rounded-full hover:bg-error/20 hover:text-error transition-colors" title="Permanently Delete">
                  <span className="material-symbols-outlined">delete_forever</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
