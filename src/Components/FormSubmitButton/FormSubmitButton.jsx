import React from "react";
import styles from "./FormSubmitButton.module.css";

export default function FormSubmitButton(props) {
  return (
    <button className={styles.buttonStyle} type="submit">
      {props?.children}
    </button>
  );
}
