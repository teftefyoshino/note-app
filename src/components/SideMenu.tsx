import { useAtom, useSetAtom } from "jotai";
import { notesAtom, selectedNoteIdAtom } from "../store";
import { Note } from "../domain/note";

function SideMenu() {
  const [notes, setNotes] = useAtom(notesAtom);
  const setSelectedNoteId = useSetAtom(selectedNoteIdAtom);

  const handleCreateNote = async () => {
    const noteId = (notes.length + 1).toString();

    const newNote = new Note(noteId, "Untitled", "", Date.now());
    setNotes((prev) => [...prev, newNote]);
  };
  const handleDeleteNote = async (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };
  const handleNoteClick = (note: Note) => {
    setSelectedNoteId(note.id);
  };
  const handleTitleChange = (noteId: string, newTitle: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, title: newTitle } : n))
    );
  };
  return (
    <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
      <div>
        <h2>Notes</h2>
        <button onClick={handleCreateNote}>+</button>
      </div>
      <div>
        {notes?.map((note) => (
          <div
            key={note.id}
            className="p-2 mb-2 rounded cursor-pointer flex justify-between items-center group"
            onClick={() => handleNoteClick(note)}
          >
            <div className="flex-1 min-w-0">
              <input
                type="text"
                className="bg-gray-100"
                onChange={(e) => handleTitleChange(note.id, e.target.value)}
                value={note.title}
              />
              <p>
                {note.lastEditTime
                  ? new Date(note.lastEditTime).toLocaleString()
                  : "Never edited"}
              </p>
            </div>
            <button onClick={() => handleDeleteNote(note.id)}>-</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideMenu;
