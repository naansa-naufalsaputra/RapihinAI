"use client";
import Link from 'next/link';

export default function TemplatesPage() {
  return (
    <div className="px-8 py-12 md:px-16 lg:px-24 w-full">
      {/* Header Section */}
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-['Newsreader'] font-medium text-on-surface mb-4 tracking-tight">Document Templates Gallery</h1>
        <p className="text-lg text-on-surface-variant max-w-2xl font-['Manrope'] leading-relaxed">
          Precision-engineered frameworks for your digital output. Choose a structure designed for clarity, authority, and professional impact.
        </p>
      </header>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {/* Template Card 1 */}
        <div className="group flex flex-col bg-surface-container-low dark:bg-slate-900/40 rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
          <div className="p-8 bg-surface-container-high/30 flex justify-center items-center">
            <div className="a4-preview w-48 bg-white shadow-2xl rounded-sm p-5 flex flex-col gap-3 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <div className="h-1.5 w-12 bg-slate-200 rounded-full"></div>
              <div className="h-3 w-3/4 bg-indigo-900/10 rounded-sm mt-2"></div>
              <div className="h-2 w-full bg-slate-100 rounded-sm"></div>
              <div className="h-2 w-full bg-slate-100 rounded-sm"></div>
              <div className="h-2 w-5/6 bg-slate-100 rounded-sm"></div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="h-10 bg-slate-50 rounded-sm"></div>
                <div className="h-10 bg-slate-50 rounded-sm"></div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-sm mt-2"></div>
              <div className="h-2 w-2/3 bg-slate-100 rounded-sm"></div>
              <div className="absolute bottom-4 right-4 text-[6px] text-slate-300 font-serif">A4 / 4-4-3-3</div>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-['Newsreader'] font-semibold text-on-surface mb-2">Academic Paper (4-4-3-3)</h3>
            <p className="text-xs text-on-surface-variant mb-8 line-clamp-2">Standardized scholarly layout with optimized margins for peer-reviewed submissions.</p>
            <Link href="/?template=academic" className="mt-auto w-full py-3 bg-primary-container text-primary font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-colors active:scale-[0.98] text-center block">
              Select this Template
            </Link>
          </div>
        </div>

        {/* Template Card 2 */}
        <div className="group flex flex-col bg-surface-container-low dark:bg-slate-900/40 rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
          <div className="p-8 bg-surface-container-high/30 flex justify-center items-center">
            <div className="a4-preview w-48 bg-white shadow-2xl rounded-sm p-6 flex flex-col gap-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <div className="h-4 w-1/3 bg-indigo-600/20 rounded-sm"></div>
              <div className="aspect-video w-full bg-slate-100 rounded-sm"></div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-slate-100 rounded-sm"></div>
                <div className="h-2 w-full bg-slate-100 rounded-sm"></div>
                <div className="h-2 w-3/4 bg-slate-100 rounded-sm"></div>
              </div>
              <div className="h-3 w-1/2 bg-slate-200 rounded-sm mt-2"></div>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-['Newsreader'] font-semibold text-on-surface mb-2">Blog Post</h3>
            <p className="text-xs text-on-surface-variant mb-8 line-clamp-2">Visual-heavy structure with clear h1-h3 hierarchy for digital readability.</p>
            <Link href="/?template=blog" className="mt-auto w-full py-3 bg-primary-container text-primary font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-colors active:scale-[0.98] text-center block">
              Select this Template
            </Link>
          </div>
        </div>

        {/* Template Card 3 */}
        <div className="group flex flex-col bg-surface-container-low dark:bg-slate-900/40 rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
          <div className="p-8 bg-surface-container-high/30 flex justify-center items-center">
            <div className="a4-preview w-48 bg-white shadow-2xl rounded-sm p-6 flex flex-col gap-3 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-indigo-100"></div>
                <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
              </div>
              <div className="h-2 w-full bg-slate-50 rounded-sm"></div>
              <div className="h-2 w-full bg-slate-50 rounded-sm"></div>
              <div className="h-2 w-full bg-slate-50 rounded-sm"></div>
              <div className="h-2 w-full bg-slate-50 rounded-sm"></div>
              <div className="h-2 w-full bg-slate-50 rounded-sm"></div>
              <div className="h-2 w-full bg-slate-50 rounded-sm"></div>
              <div className="h-2 w-3/4 bg-slate-50 rounded-sm"></div>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-['Newsreader'] font-semibold text-on-surface mb-2">Casual Report</h3>
            <p className="text-xs text-on-surface-variant mb-8 line-clamp-2">Lightweight internal documentation for team updates and brainstorming notes.</p>
            <Link href="/?template=casual" className="mt-auto w-full py-3 bg-primary-container text-primary font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-colors active:scale-[0.98] text-center block">
              Select this Template
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
