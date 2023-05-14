import { Note } from "./types";

export const openDatabase = (name: string, version: number) => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const openRequest = indexedDB.open(name, version);
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains("notes")) {
        db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
      }
    };
    openRequest.onsuccess = () => resolve(openRequest.result);
    openRequest.onerror = () => reject(openRequest.error);
  });
};

export const createTransaction = (
  db: IDBDatabase,
  storeName: string,
  type: IDBTransactionMode
) => {
  return db.transaction(storeName, type).objectStore(storeName);
};

export const addNote = (db: IDBDatabase, note: Note) => {
  const store = createTransaction(db, "notes", "readwrite");
  return new Promise<number>((resolve, reject) => {
    const request = store.add(note);
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
};

export const getAllNotes = (db: IDBDatabase) => {
  const store = createTransaction(db, "notes", "readonly");
  return new Promise<Note[]>((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as Note[]);
    request.onerror = () => reject(request.error);
  });
};

export const deleteNote = (db: IDBDatabase, id: string) => {
  const store = createTransaction(db, "notes", "readwrite");
  return new Promise<void>((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const searchNote = (db: IDBDatabase, text: string) => {
  const store = createTransaction(db, "notes", "readonly");
  return new Promise<Note[]>((resolve, reject) => {
    const request = store.openCursor();
    const foundNotes: Note[] = [];
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        const note: Note = cursor.value;
        if (note.text.includes(text)) {
          foundNotes.push(note);
        }
        cursor.continue();
      } else {
        resolve(foundNotes);
      }
    };
    request.onerror = () => reject(request.error);
  });
};

const saveNote = (db: IDBDatabase, note: Note) => {
  const store = createTransaction(db, "notes", "readwrite");
  return new Promise<void>((resolve, reject) => {
    const request = store.put(note);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const dbName = "NotesDB";
const version = 1;
const dbPromise = openDatabase(dbName, version);

const apiClient = {
  add: async (note: Note) => addNote(await dbPromise, note),
  all: async () => getAllNotes(await dbPromise),
  delete: async (id: string) => deleteNote(await dbPromise, id),
  save: async (note: Note) => saveNote(await dbPromise, note),
  search: async (text: string) => searchNote(await dbPromise, text),
};

export default apiClient;
