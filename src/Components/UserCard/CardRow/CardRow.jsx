import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../UserCard.module.css";

export default function CardRow({ title, details, icon }) {
  return (
    <div className="flex justify-start align-middle my-3 py-2">
      <div className="flex flex-col justify-center mr-1 w-8 h-8">
        <icon>
          <FontAwesomeIcon className={styles.icon} icon={icon} />
        </icon>
      </div>
      <div className="flex flex-col justify-center align-top h-8">
        <p className={styles.title}>{title}</p>
        <p className={styles.detailsText}>{details}</p>
      </div>
    </div>
  );
}
