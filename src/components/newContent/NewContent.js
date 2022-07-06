import React from 'react';
import styles from './NewContent.module.scss'
const NewContent = () => {
    return (
        <ul className={styles.list}>
            <h2 className={styles.list_title}>Версия 0.9</h2>
            <li className={styles.list_text}>Теперь для регистрации требуется email с подтверждением.</li>
            <li className={styles.list_text}>Через email можно восстановить логин или пароль.</li>
            <li className={styles.list_text}>Для пользователей с подтверждённым email,теперь будет приходить уведомление по целям и задачам</li>
            <li className={styles.list_text}>Исправлено отображение окон в мобильной версии</li>
        </ul>
    );
};

export default NewContent;