import React, { FC, PropsWithChildren, MouseEventHandler } from "react";
import styles from "./IconButton.module.css";

const IconButton: FC<
  PropsWithChildren & {
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  }
> = ({ children, onClick }) => {
  return (
    <div className={styles.IconButton} onClick={onClick}>
      {children}
    </div>
  );
};

export default IconButton;
