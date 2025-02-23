import { atom } from "jotai";
import { Note } from "../domain/note";

export const notesAtom = atom<Array<Note>>([]);
export const selectedNoteIdAtom = atom<string | null>(null);

export const selectedNoteAtom = atom((get) => {
    const notes = get(notesAtom);
    const id = get(selectedNoteIdAtom);
    if (id === null) return null;

    return notes.find((note) => note.id === id) || null;
});