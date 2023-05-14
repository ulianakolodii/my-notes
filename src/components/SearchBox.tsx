import React, {
  FC,
  useState,
  useTransition,
  FormEventHandler,
  useEffect,
} from "react";
import styles from "./SearchBox.module.css";
import { ReactComponent as MagnifyingGlassIcon } from "../assets/icons/magnifying-glass.svg";
import Input from "./Input";
import InputGroup from "./InputGroup";
import useNotes from "../hooks/useNotes";

const SearchBox: FC = () => {
  const { search } = useNotes();
  const [value, setValue] = useState("");
  const [, startTransition] = useTransition();

  const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
    startTransition(() => {
      setValue((event.target as HTMLTextAreaElement).value);
    });
  };

  useEffect(() => {
    search(value);
  }, [value, search]);

  return (
    <InputGroup className={styles.SearchBox}>
      <MagnifyingGlassIcon />
      <Input placeholder="Search" onInput={handleInput} />
    </InputGroup>
  );
};

export default SearchBox;
