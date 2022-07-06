import React from "react";
import styles from "./NotFound.module.scss";

function NotFound() {
    return (
        <div className={styles.notfound}>
            <div className={styles.notfound__container}>
                <div className={styles.notfound__text}>Страница не найдена</div>
                <a className={styles.notfound__link} href="/">
                    Перейти на главную
                </a>
            </div>
        </div>
    );
}

export default NotFound;
