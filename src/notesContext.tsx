import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useCallback,
} from "react";
import { Note } from "./types";
import client from "./indexedDB";
import { v4 as uuidv4 } from "uuid";

type NotesContextData = {
  notes: Note[];
  addNewNote: () => void;
  save: (note: Note) => void;
  active?: string;
  setActive: Dispatch<SetStateAction<string | undefined>>;
  deleteNote: (id: string) => void;
  search: (text?: string) => Promise<void>;
};

export const NotesContext = createContext<NotesContextData | undefined>(
  undefined
);

const NotesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [active, setActive] = useState<string>();

  const fetch = useCallback(async () => {
    setNotes(await client.all());
  }, [setNotes]);

  const addNewNote = () => {
    const newNote = { createdAt: Date.now(), text: "", id: uuidv4() };
    client.add(newNote);
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const save = useCallback(
    (note: Note) => {
      client.save(note);
      setNotes((prevNotes) =>
        prevNotes.map((old) => {
          if (old.id === note.id) {
            return note;
          }
          return old;
        })
      );
    },
    [setNotes]
  );

  const deleteNote = useCallback(
    (id: string) => {
      client.delete(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    },
    [setNotes]
  );

  const search = useCallback(
    async (text?: string) => {
      if (!text) {
        return fetch();
      }
      return setNotes(await client.search(text));
    },
    [setNotes, fetch]
  );

  return (
    <NotesContext.Provider
      value={{ notes, addNewNote, save, setActive, active, deleteNote, search }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
