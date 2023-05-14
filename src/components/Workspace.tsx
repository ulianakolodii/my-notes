import React, { useMemo, useState, FormEventHandler } from "react";
import styles from "./Workspace.module.css";
import Toolbar from "./Toolbar";
import IconButton from "./IconButton";
import ReactMarkdown from "react-markdown";
import { ReactComponent as PenToSquareIcon } from "../assets/icons/pen-to-square.svg";
import { ReactComponent as MarkdownIcon } from "../assets/icons/markdown.svg";
import useNotes from "../hooks/useNotes";
import SearchBox from "./SearchBox";

const Workspace = () => {
  const { notes, active, save } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const activeNote = useMemo(
    () => notes.find((note) => note.id === active),
    [active, notes]
  );

  const handleMarkdownClick = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInput: FormEventHandler<HTMLTextAreaElement> = (event) => {
    if (!activeNote) {
      return;
    }
    save({
      ...activeNote,
      text: (event.target as HTMLTextAreaElement).value,
    });
  };

  return (
    <div className={styles.Workspace}>
      <Toolbar>
        {!activeNote ? null : isEditing ? (
          <IconButton onClick={handleMarkdownClick}>
            <MarkdownIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleEditClick}>
            <PenToSquareIcon />
          </IconButton>
        )}
        <SearchBox />
      </Toolbar>
      {activeNote ? (
        <>
          <span className={styles.dateTime}>
            {new Date(activeNote.createdAt).toLocaleString()}
          </span>
          {isEditing ? (
            <textarea
              className={styles.textarea}
              value={activeNote.text}
              onInput={handleInput}
              autoFocus
            />
          ) : (
            <div className={styles.markdown}>
              <ReactMarkdown>{activeNote.text}</ReactMarkdown>
            </div>
          )}
        </>
      ) : (
        <div className={styles.empty}>
          <span>Please select the note! 😇</span>
        </div>
      )}
    </div>
  );
};

export default Workspace;
