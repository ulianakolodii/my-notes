import React from "react";
import "./assets/css/reset.css";
import "./assets/css/variables.css";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";
import NotesProvider from "./notesContext";

const App = () => {
  return (
    <NotesProvider>
      <div className={styles.app}>
        <Sidebar />
        <Workspace />
      </div>
    </NotesProvider>
  );
};

export default App;
