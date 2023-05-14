import React, { FC, PropsWithChildren } from "react";
import styles from "./InputGroup.module.css";
import classNames from "classnames";

const InputGroup: FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.InputGroup, className)}>{children}</div>
  );
};

export default InputGroup;
