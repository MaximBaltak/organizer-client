import React from "react";
import styles from "./PageName.module.scss";

function PageName({text}) {
    return (
        <div className={styles.title}>
            <h1>{text}</h1>
        </div>
    );
}

export default PageName;
