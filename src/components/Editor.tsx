import { useAtomValue, useSetAtom } from "jotai";
import { saveNoteAtom, selectedNoteAtom } from "../store";
import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  ListsToggle,
  codeBlockPlugin,
  codeMirrorPlugin,
  InsertCodeBlock,
} from "@mdxeditor/editor";
import { useCallback } from "react";

const plugins = [
  headingsPlugin(),
  listsPlugin(),
  markdownShortcutPlugin(),
  codeBlockPlugin({
    defaultCodeBlockLanguage: "js",
  }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      jsx: "JavaScript JSX",
      ts: "TypeScript",
      tsx: "TypeScript JSX",
      python: "Python",
      css: "CSS",
      html: "HTML",
      json: "JSON",
    },
  }),
  toolbarPlugin({
    toolbarContents: () => (
      <>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <BoldItalicUnderlineToggles />
          </div>
          <div className="flex gap-1">
            <ListsToggle />
          </div>
          <InsertCodeBlock />
        </div>
      </>
    ),
  }),
];

export const Editor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const saveNote = useSetAtom(saveNoteAtom);
  const handleContentChange = useCallback(
    (newContent: string) => {
      saveNote(newContent);
    },
    [saveNote]
  );

  return (
    <div className="flex-1">
      {selectedNote ? (
        <MDXEditor
          key={selectedNote.id}
          markdown={selectedNote.content}
          onChange={handleContentChange}
          plugins={plugins}
          contentEditableClassName="prose max-w-none focus:outline-none"
          className="h-full"
          placeholder="Markdownを入力してください"
        />
      ) : (
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-500">
            ノートを選択するか、新しいノートを作成してください
          </p>
        </div>
      )}
    </div>
  );
};

export default Editor;
