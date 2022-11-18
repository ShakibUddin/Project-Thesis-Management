import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./DataCard.module.css";

export default function DataCard({ title, icon, value }) {
  return (
    <div className={styles.container}>
      <div className={styles.topDiv}>
        <span className="text-lg">{title}</span>
        <icon>
          <FontAwesomeIcon className="h-6 w-6" icon={icon}></FontAwesomeIcon>
        </icon>
      </div>
      <p className="text-3xl font-bold text-left m-0">{value}</p>
    </div>
  );
}
