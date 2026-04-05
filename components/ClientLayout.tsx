"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface-container/80 backdrop-blur-md border-b border-outline-variant/20 flex justify-between items-center px-8 h-16 font-['Manrope'] tracking-tight">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-primary font-['Newsreader'] italic">RapihinAI</Link>
          <div className="hidden md:flex gap-6 items-center h-16">
            <Link href="/" className={`h-16 flex items-center transition-colors ${pathname === '/' ? 'text-primary font-semibold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}>Editor</Link>
            <Link href="/documents" className={`h-16 flex items-center transition-colors ${pathname === '/documents' ? 'text-primary font-semibold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}>Documents</Link>
            <Link href="/templates" className={`h-16 flex items-center transition-colors ${pathname === '/templates' ? 'text-primary font-semibold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}>Templates</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
            <span className="material-symbols-outlined">history</span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-8 w-[1px] bg-outline-variant/20 mx-2"></div>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-full text-primary font-semibold hover:bg-surface-container-high transition-colors active:scale-95 duration-200">
            <span>Account</span>
          </button>
        </div>
      </nav>

      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* SideNavBar */}
        <aside className="hidden md:flex flex-col p-4 gap-2 w-64 bg-surface-container-low border-r border-outline-variant/20 overflow-y-auto">
          <div className="mb-6 px-2 pt-2">
            <h2 className="font-['Newsreader'] text-lg text-primary font-bold">RapihinAI</h2>
            <p className="text-xs text-on-surface-variant font-['Manrope']">Draft Workspace</p>
          </div>
          <Link href="/" className="w-full bg-gradient-to-br from-primary-container to-primary text-on-primary-container py-3 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 mb-4">
            <span className="material-symbols-outlined">add</span>
            New Document
          </Link>
          <nav className="flex flex-col gap-1">
            <Link href="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-['Manrope'] text-sm ${pathname === '/' ? 'bg-surface-container-highest text-primary shadow-sm border border-outline-variant/30' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
              <span className="material-symbols-outlined">edit_note</span>
              <span>Editor</span>
            </Link>
            <Link href="/styles" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-['Manrope'] text-sm ${pathname === '/styles' ? 'bg-surface-container-highest text-primary shadow-sm border border-outline-variant/30' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
              <span className="material-symbols-outlined">format_paint</span>
              <span>Styles</span>
            </Link>
            <Link href="/export" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-['Manrope'] text-sm ${pathname === '/export' ? 'bg-surface-container-highest text-primary shadow-sm border border-outline-variant/30' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
              <span className="material-symbols-outlined">file_download</span>
              <span>Export</span>
            </Link>
            <Link href="/archive" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-['Manrope'] text-sm ${pathname === '/archive' ? 'bg-surface-container-highest text-primary shadow-sm border border-outline-variant/30' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
              <span className="material-symbols-outlined">inventory_2</span>
              <span>Archive</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-surface text-on-surface flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
