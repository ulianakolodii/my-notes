import React, { FC, FormEventHandler } from "react";
import styles from "./Input.module.css";

const Input: FC<{
  placeholder?: string;
  onInput?: FormEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[];
}> = ({ placeholder, onInput, value }) => {
  return (
    <input
      className={styles.Input}
      placeholder={placeholder}
      onInput={onInput}
      value={value}
    />
  );
};

export default Input;
