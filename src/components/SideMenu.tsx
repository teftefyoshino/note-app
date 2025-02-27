import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { notesAtom, selectedNoteIdAtom } from '../store';
import { Note } from '../domain/note';
import { Plus, Trash2 } from 'lucide-react';

function SideMenu() {
    const [notes, setNotes] = useAtom(notesAtom);
    const setSelectedNoteId = useSetAtom(selectedNoteIdAtom);
    const selectedNoteId = useAtomValue(selectedNoteIdAtom);

    const handleCreateNote = async () => {
        const noteId = (notes.length + 1).toString();

        const newNote = new Note(noteId, 'Untitled', '', Date.now());
        setNotes((prev) => [...prev, newNote]);
    };
    const handleDeleteNote = async (noteId: string) => {
        setNotes((prev) => prev.filter((n) => n.id !== noteId));
    };
    const handleNoteClick = (note: Note) => {
        setSelectedNoteId(note.id);
    };
    const handleTitleChange = (noteId: string, newTitle: string) => {
        setNotes((prev) => prev.map((n) => (n.id === noteId ? { ...n, title: newTitle } : n)));
    };
    return (
        <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Notes</h2>
                <button
                    onClick={handleCreateNote}
                    className="p-2 bg-white rounded hover:bg-gray-50"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
            <div className="flex-grow overflow-y-auto">
                {notes?.map((note) => (
                    <div
                        key={note.id}
                        className={`p-2 mb-2 rounded cursor-pointer flex justify-between items-center group ${
                            selectedNoteId === note.id ? 'bg-white' : 'hover:bg-white'
                        }`}
                        onClick={() => handleNoteClick(note)}
                    >
                        <div className="flex-1 min-w-0">
                            <input
                                type="text"
                                className="font-medium bg-transparent outline-none w-full"
                                onChange={(e) => handleTitleChange(note.id, e.target.value)}
                                value={note.title}
                            />
                            <p className="text-xs text-gray-500 truncate">
                                {note.lastEditTime
                                    ? new Date(note.lastEditTime).toLocaleString()
                                    : 'Never edited'}
                            </p>
                        </div>
                        <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-gray-400 hover:text-red-500 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SideMenu;
