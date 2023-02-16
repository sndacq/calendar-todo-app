import { useState } from "react";
import Image from "next/image";

import styles from '../../styles/Home.module.css';

const Option = ({ text, handleSave, handleDelete }) => {
  const [optionText, setOptionText] = useState(text);
  const [edit, setEdit] = useState(false);

  const handleInputChange = (e) => {
    setOptionText(e.target.value);
  };

  const handleSaveClick = () => {
    handleSave(text, optionText);
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <>
          <input value={optionText} onChange={handleInputChange} />
          <Image
            src="/save.svg"
            alt="save"
            className={styles.optionIcon}
            onClick={() => handleSaveClick()}
            width={12}
            height={12}
          />
        </>
      ) : (
        <>
          {optionText}
          <Image
            src="/edit.svg"
            alt="edit"
            className={styles.optionIcon}
            onClick={() => setEdit(true)}
            width={12}
            height={12}
          />
        </>
      )}

      <Image
        src="/close.svg"
        alt="delete"
        className={styles.optionIcon}
        onClick={() => handleDelete(text)}
        width={12}
        height={12}
      />
    </>
  );
};

export default Option;