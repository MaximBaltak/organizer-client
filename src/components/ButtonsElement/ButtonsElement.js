import React from "react";
import styles from "./ButtonsElement.module.scss";

function ButtonsElement() {
    return (
        <div className={styles.controlsbtn}>
            <button id="1" className={styles.controlsbtn__yes}/>
            <button id="2" className={styles.controlsbtn__delete}/>
        </div>
    );
}

export default ButtonsElement;
