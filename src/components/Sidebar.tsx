import React from "react";
import styles from "./Sidebar.module.css";
import Toolbar from "./Toolbar";
import IconButton from "./IconButton";
import ListItem from "./ListItem";
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";
import useNotes from "../hooks/useNotes";
import { Note } from "../types";

const Sidebar = () => {
  const { notes, addNewNote, active, setActive, deleteNote } = useNotes();
  const createClickHandler = (note: Note) => () => {
    setActive(note.id);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure?") && active) {
      deleteNote(active);
    }
  };

  return (
    <div className={styles.Sidebar}>
      <Toolbar>
        <IconButton onClick={addNewNote}>
          <PlusIcon />
        </IconButton>
        {active ? (
          <IconButton onClick={handleDeleteClick}>
            <TrashIcon />
          </IconButton>
        ) : null}
      </Toolbar>
      {notes.length ? (
        notes.map((el) => (
          <ListItem
            key={el.id}
            {...el}
            active={el.id === active}
            onClick={createClickHandler(el)}
          />
        ))
      ) : (
        <div className={styles.empty}>
          <span>😞 No notes so far...</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
