import React, { FC, MouseEventHandler } from "react";
import classNames from "classnames";
import { Note } from "../types";
import splitText from "../utils/splitText";
import formatDateTime from "../utils/formatDateTime";
import styles from "./ListItem.module.css";

const ListItem: FC<
  Note & {
    active?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  }
> = ({ createdAt, text, id, active, onClick }) => {
  const [firstLine, rest] = splitText(text);
  return (
    <div
      className={classNames(styles.ListItem, { [styles.active]: active })}
      onClick={onClick}
    >
      <div className={styles.wrapper}>
        <span>{firstLine || "New Note"}</span>
        <div>
          <span>{formatDateTime(createdAt)}</span>
          <span className={styles.text}>{rest || "No additional text"}</span>
        </div>
        <div className={styles.divider} />
      </div>
    </div>
  );
};

export default ListItem;
