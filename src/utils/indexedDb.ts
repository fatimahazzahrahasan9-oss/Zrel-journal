import { JournalProject, PatternConfig } from '../types/journal';

const DB_NAME = 'pattern_journal_studio_db';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('journals')) {
        db.createObjectStore('journals', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('custom_patterns')) {
        db.createObjectStore('custom_patterns', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllJournals(): Promise<JournalProject[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('journals', 'readonly');
      const store = tx.objectStore('journals');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to get journals from IndexedDB:', err);
    return [];
  }
}

export async function getJournal(id: string): Promise<JournalProject | undefined> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('journals', 'readonly');
      const store = tx.objectStore('journals');
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to get journal from IndexedDB:', err);
    return undefined;
  }
}

export async function saveJournal(journal: JournalProject): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('journals', 'readwrite');
      const store = tx.objectStore('journals');
      const req = store.put({
        ...journal,
        updatedAt: new Date().toISOString(),
      });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to save journal to IndexedDB:', err);
    throw err;
  }
}

export async function deleteJournal(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('journals', 'readwrite');
      const store = tx.objectStore('journals');
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to delete journal from IndexedDB:', err);
    throw err;
  }
}

export async function getAllCustomPatterns(): Promise<PatternConfig[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('custom_patterns', 'readonly');
      const store = tx.objectStore('custom_patterns');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to get custom patterns from IndexedDB:', err);
    return [];
  }
}

export async function saveCustomPattern(pattern: PatternConfig): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('custom_patterns', 'readwrite');
      const store = tx.objectStore('custom_patterns');
      const req = store.put(pattern);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to save custom pattern to IndexedDB:', err);
    throw err;
  }
}

export async function deleteCustomPattern(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('custom_patterns', 'readwrite');
      const store = tx.objectStore('custom_patterns');
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to delete custom pattern from IndexedDB:', err);
    throw err;
  }
}

// Export complete workspace backup
export async function exportAllToJson(): Promise<string> {
  const journals = await getAllJournals();
  const customPatterns = await getAllCustomPatterns();
  const payload = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    app: 'Pattern Journal Studio',
    journals,
    customPatterns,
  };
  return JSON.stringify(payload, null, 2);
}

// Import JSON backup
export async function importAllFromJson(
  jsonStr: string
): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const data = JSON.parse(jsonStr);
    if (!data.journals || !Array.isArray(data.journals)) {
      return { success: false, count: 0, error: 'Format berkas tidak valid: "journals" array tidak ditemukan' };
    }

    let count = 0;
    for (const j of data.journals) {
      if (j && j.id && j.title) {
        await saveJournal(j);
        count++;
      }
    }

    if (data.customPatterns && Array.isArray(data.customPatterns)) {
      for (const p of data.customPatterns) {
        if (p && p.id) {
          await saveCustomPattern(p);
        }
      }
    }

    return { success: true, count };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message || 'Gagal mengurai file JSON' };
  }
}
