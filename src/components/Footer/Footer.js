import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__copyright}>
                    &copy; Organizer {new Date().getFullYear()}
                </div>
                <a
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={styles.footer__link}
                    href="https://github.com/Eshechka/Organizer.git"
                >
                    Github repository
                </a>
            </div>
        </div>
    );
}

export default Footer;
