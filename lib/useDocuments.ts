"use client";
import { useState, useEffect } from 'react';

export interface Document {
  id: string;
  title: string;
  content: string;
  lastModified: string;
  isArchived?: boolean;
}

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('rapihin_docs');
    if (stored) {
      try {
        setDocuments(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse documents", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveDocument = (doc: Document) => {
    setDocuments(prev => {
      const newDocs = [...prev.filter(d => d.id !== doc.id), doc];
      localStorage.setItem('rapihin_docs', JSON.stringify(newDocs));
      return newDocs;
    });
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => {
      const newDocs = prev.filter(d => d.id !== id);
      localStorage.setItem('rapihin_docs', JSON.stringify(newDocs));
      return newDocs;
    });
  };

  const archiveDocument = (id: string) => {
    setDocuments(prev => {
      const newDocs = prev.map(d => d.id === id ? { ...d, isArchived: true } : d);
      localStorage.setItem('rapihin_docs', JSON.stringify(newDocs));
      return newDocs;
    });
  };

  const restoreDocument = (id: string) => {
    setDocuments(prev => {
      const newDocs = prev.map(d => d.id === id ? { ...d, isArchived: false } : d);
      localStorage.setItem('rapihin_docs', JSON.stringify(newDocs));
      return newDocs;
    });
  };

  const getDocument = (id: string) => {
    return documents.find(d => d.id === id);
  };

  return { documents, saveDocument, deleteDocument, archiveDocument, restoreDocument, getDocument, isLoaded };
}
