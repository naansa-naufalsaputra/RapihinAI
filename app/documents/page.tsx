"use client";
import Link from 'next/link';
import { useDocuments } from '@/lib/useDocuments';

export default function DocumentsPage() {
  const { documents, archiveDocument, isLoaded } = useDocuments();

  if (!isLoaded) return <div className="p-12">Loading documents...</div>;

  const activeDocuments = documents.filter(doc => !doc.isArchived);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-6xl mx-auto px-12 py-12 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="editorial-title text-4xl font-bold tracking-tight text-on-surface mb-2">My Documents</h1>
          <p className="text-on-surface-variant font-label text-sm tracking-wide">Manage and organize your editorial drafts</p>
        </div>
        <Link href="/" className="bg-gradient-to-br from-primary-container to-[#3d52b2] text-on-primary-container px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-sm active:scale-95">
          <span className="material-symbols-outlined">add_circle</span>
          <span>+ Create New Document</span>
        </Link>
      </div>

      {/* Bento Grid Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeDocuments.map((doc) => (
          <div key={doc.id} className="group relative bg-surface-container-high rounded-lg p-6 flex flex-col justify-between h-64 border border-outline-variant/10 hover:bg-surface-container-highest transition-all duration-300 shadow-lg">
            <div className="h-32 w-full rounded-md overflow-hidden bg-surface-container mb-4">
              <div className="w-full h-full opacity-40 group-hover:opacity-60 transition-opacity bg-gradient-to-br from-indigo-900/50 to-slate-800/50"></div>
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-on-surface truncate">{doc.title}</h3>
              <p className="text-on-surface-variant text-xs mt-1">Last Modified: {formatDate(doc.lastModified)}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Link href={`/?id=${doc.id}`} className="p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </Link>
              <button onClick={() => archiveDocument(doc.id)} className="p-2 rounded-full hover:bg-error/20 hover:text-error transition-colors" title="Archive">
                <span className="material-symbols-outlined">archive</span>
              </button>
            </div>
          </div>
        ))}

        {/* Add New Placeholder */}
        <Link href="/" className="group bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-lg p-6 flex flex-col items-center justify-center h-64 hover:border-primary/50 transition-all duration-300 hover:bg-surface-container-high">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary">add</span>
          </div>
          <span className="font-headline font-semibold text-on-surface-variant group-hover:text-primary">Start New Draft</span>
        </Link>
      </div>
    </div>
  );
}
