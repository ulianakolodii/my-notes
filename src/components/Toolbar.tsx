import React, { FC, PropsWithChildren } from "react";
import styles from "./Toolbar.module.css";

const Toolbar: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.Toolbar}>{children}</div>;
};

export default Toolbar;
