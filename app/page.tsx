"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { marked } from 'marked';
import { Document as DocxDocument, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, UnderlineType } from 'docx';
import { lexer } from 'marked';
import { useDocuments } from '@/lib/useDocuments';
import { useSettings } from '@/lib/useSettings';

function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { documents, saveDocument, getDocument, isLoaded } = useDocuments();
  const { settings, isLoaded: isSettingsLoaded } = useSettings();
  
  const [markdown, setMarkdown] = useState('');
  const [htmlPreview, setHtmlPreview] = useState('');
  const [docId, setDocId] = useState<string | null>(null);
  const [title, setTitle] = useState('Untitled Document');

  useEffect(() => {
    if (!isLoaded) return;
    
    const id = searchParams.get('id');
    const template = searchParams.get('template');
    
    if (id) {
      const doc = getDocument(id);
      if (doc) {
        setMarkdown(doc.content);
        setTitle(doc.title);
        setDocId(doc.id);
      }
    } else if (template) {
      let initialContent = '';
      if (template === 'academic') {
        initialContent = `# Academic Paper Title\n\n## Abstract\n\nYour abstract here...\n\n## Introduction\n\nIntroduction text...`;
      } else if (template === 'blog') {
        initialContent = `# Blog Post Title\n\n## Introduction\n\nCatchy intro...\n\n## Main Point\n\nDetails...`;
      } else if (template === 'casual') {
        initialContent = `# Weekly Report\n\n**Date:** \n\n## Updates\n- Item 1\n- Item 2`;
      }
      setMarkdown(initialContent);
      setTitle(`New ${template} document`);
      setDocId(Date.now().toString());
    } else {
      // Default empty or load last active
      setDocId(Date.now().toString());
      setMarkdown(`# The Future of Digital Editorial\n\nProfessional document design is moving away from the "SaaS-in-a-box" aesthetic. Instead of a rigid grid of boxes and borders, modern workspaces treat the interface as a high-end atelier. \n\n## Key Design Pillars\n1. **Asymmetry**: Creates a dynamic flow that mimics high-end print.\n2. **Tonal Layering**: Replaces harsh borders with subtle color shifts.\n3. **Typographic Pairing**: Manrope for the tool, Newsreader for the craft.\n\nThe goal is to let the content breathe. By using a sophisticated range of cool grays and a deep "Professional Indigo", we create trust and focus.`);
    }
  }, [searchParams, isLoaded]);

  useEffect(() => {
    const parseMarkdown = async () => {
      const html = await marked.parse(markdown);
      setHtmlPreview(html);
    };
    parseMarkdown();
    
    // Auto-save
    if (isLoaded && docId) {
      const timeout = setTimeout(() => {
        saveDocument({
          id: docId,
          title: title,
          content: markdown,
          lastModified: new Date().toISOString()
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [markdown, title, docId, isLoaded]);

  const handleDownload = async () => {
    const tokens = lexer(markdown);
    const children: any[] = [];

    const processInlineTokens = (inlineTokens: any[]): any[] => {
      if (!inlineTokens) return [];
      return inlineTokens.map(t => {
        if (t.type === 'strong') {
          return new TextRun({ text: t.text, bold: true });
        } else if (t.type === 'em') {
          return new TextRun({ text: t.text, italics: true });
        } else if (t.type === 'codespan') {
          return new TextRun({ text: t.text, font: "Courier New", shading: { type: ShadingType.CLEAR, fill: "F0F0F0" } });
        } else if (t.type === 'link') {
          return new ExternalHyperlink({
            children: [new TextRun({ text: t.text, color: "0563C1", underline: { type: UnderlineType.SINGLE, color: "0563C1" } })],
            link: t.href,
          });
        } else if (t.type === 'text' || t.type === 'escape') {
          return new TextRun({ text: t.text });
        } else {
          return new TextRun({ text: t.raw });
        }
      });
    };

    tokens.forEach(token => {
      if (token.type === 'heading') {
        const level = token.depth === 1 ? HeadingLevel.HEADING_1 :
                      token.depth === 2 ? HeadingLevel.HEADING_2 :
                      token.depth === 3 ? HeadingLevel.HEADING_3 :
                      token.depth === 4 ? HeadingLevel.HEADING_4 :
                      token.depth === 5 ? HeadingLevel.HEADING_5 :
                      HeadingLevel.HEADING_6;
        children.push(new Paragraph({ 
          children: processInlineTokens((token as any).tokens),
          heading: level 
        }));
      } else if (token.type === 'paragraph') {
        children.push(new Paragraph({ children: processInlineTokens((token as any).tokens) }));
      } else if (token.type === 'list') {
        token.items.forEach((item: any) => {
          children.push(new Paragraph({ 
            children: processInlineTokens((item as any).tokens[0]?.tokens || [{type: 'text', text: item.text}]), 
            bullet: { level: 0 } 
          }));
        });
      } else if (token.type === 'blockquote') {
        (token as any).tokens?.forEach((t: any) => {
           if (t.type === 'paragraph') {
              children.push(new Paragraph({
                children: processInlineTokens(t.tokens),
                indent: { left: 720 },
                border: {
                  left: { color: "cccccc", space: 10, style: BorderStyle.SINGLE, size: 12 }
                }
              }));
           }
        });
      } else if (token.type === 'code') {
        const codeLines = token.text.split('\n');
        const codeRuns = codeLines.map((line: string, i: number) => {
          if (i === codeLines.length - 1) {
             return new TextRun({ text: line, font: "Courier New" });
          }
          return new TextRun({ text: line, font: "Courier New", break: 1 });
        });
        
        children.push(new Paragraph({
          children: codeRuns,
          shading: { type: ShadingType.CLEAR, fill: "F5F5F5" },
          border: {
            top: { color: "E0E0E0", space: 1, style: BorderStyle.SINGLE, size: 4 },
            bottom: { color: "E0E0E0", space: 1, style: BorderStyle.SINGLE, size: 4 },
            left: { color: "E0E0E0", space: 1, style: BorderStyle.SINGLE, size: 4 },
            right: { color: "E0E0E0", space: 1, style: BorderStyle.SINGLE, size: 4 },
          }
        }));
      } else if (token.type === 'table') {
        const rows: any[] = [];
        // Header
        rows.push(new TableRow({
          children: token.header.map((cell: any) => new TableCell({
            children: [new Paragraph({ children: processInlineTokens(cell.tokens) })],
            shading: { fill: "F0F0F0", type: ShadingType.CLEAR },
            margins: { top: 100, bottom: 100, left: 100, right: 100 }
          }))
        }));
        // Rows
        token.rows.forEach((row: any) => {
          rows.push(new TableRow({
            children: row.map((cell: any) => new TableCell({
              children: [new Paragraph({ children: processInlineTokens(cell.tokens) })],
              margins: { top: 100, bottom: 100, left: 100, right: 100 }
            }))
          }));
        });
        children.push(new Table({ 
          rows, 
          width: { size: 100, type: WidthType.PERCENTAGE } 
        }));
      } else if (token.type === 'space') {
        // ignore
      } else {
        children.push(new Paragraph({ text: token.raw }));
      }
    });

    const doc = new DocxDocument({
      styles: {
        default: {
          document: {
            run: {
              size: settings.fontSize * 2, // docx uses half-points
              font: settings.fontFamily,
            },
            paragraph: {
              spacing: {
                line: settings.lineSpacing * 240, // 240 is 1 line
              },
            },
          },
        },
      },
      sections: [{
        properties: {},
        children: children,
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-full pb-32 md:pb-0">
      {/* Left Panel: Input */}
      <section className="flex-1 p-6 md:p-8 flex flex-col gap-4 bg-surface-container-lowest border-r border-outline-variant/20">
        <div className="flex justify-between items-center">
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm font-semibold text-primary/70 tracking-wider uppercase bg-transparent border-none focus:ring-0 p-0"
          />
          <span className="text-[10px] text-on-surface-variant px-2 py-1 bg-surface-container-high rounded font-mono border border-outline-variant/30">UTF-8</span>
        </div>
        <div className="flex-1 min-h-[400px] bg-surface-container rounded-xl relative border border-outline-variant/30 flex flex-col">
          <textarea 
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 w-full p-6 bg-transparent border-none focus:ring-0 font-mono text-sm leading-relaxed text-on-surface-variant resize-none hide-scrollbar outline-none" 
            placeholder="Paste your raw content here..."
          />
        </div>
      </section>

      {/* Right Panel: Formatted Preview */}
      <section className="flex-1 p-6 md:p-8 bg-surface-container flex flex-col gap-6 relative overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-on-surface-variant tracking-wider uppercase">Formatted Preview (Word Document)</h3>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/20"></div>
            <div className="w-3 h-3 rounded-full bg-primary/20"></div>
          </div>
        </div>
        
        {/* Paper Container */}
        <div className="bg-[#e0e2e6] editorial-shadow rounded-sm p-12 md:p-16 flex flex-col gap-8 max-w-[800px] mx-auto min-h-[800px] w-full text-slate-900 border-t-4 border-primary mb-24">
          <div 
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
          />
          <div className="mt-auto pt-12 flex justify-between items-center opacity-60 border-t border-slate-300">
            <span className="font-body italic text-sm">RapihinAI Generated Portfolio</span>
            <span className="font-label text-xs">Page 1 of 1</span>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 md:bottom-8 left-0 md:left-[calc(50%+8rem)] w-full md:w-auto md:-translate-x-1/2 z-50 flex items-center justify-center gap-2 p-3 md:p-2 bg-surface-container-high/95 md:bg-surface-container-high/90 backdrop-blur-xl border-t md:border border-outline-variant/30 md:editorial-shadow md:rounded-full">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-container to-primary text-on-primary-container rounded-full font-bold text-sm md:text-base shadow-lg hover:shadow-primary/20 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg md:text-2xl">file_download</span>
            <span className="hidden sm:inline">Download as Word (.docx)</span>
            <span className="sm:hidden">Download</span>
          </button>
          <div className="w-px h-6 md:h-8 bg-outline-variant/30 mx-1 md:mx-2"></div>
          <button className="p-3 md:p-4 text-on-surface hover:bg-surface-container-highest rounded-full transition-colors" title="Share link">
            <span className="material-symbols-outlined text-lg md:text-2xl">share</span>
          </button>
          <button className="p-3 md:p-4 text-on-surface hover:bg-surface-container-highest rounded-full transition-colors" title="Print document">
            <span className="material-symbols-outlined text-lg md:text-2xl">print</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
