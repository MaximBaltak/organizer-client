import React from "react";
import styles from "./WindowDeleteProfile.module.scss";
import Button from "../../components/Button/Button";

function WindowDeleteProfile({
                                 clickYes,
                                 clickNo
                             }) {
    return (
        <div className={styles.modalDelete}>
            <h2 className={styles.modalDelete__title}>
                Вы действительной хотите удалить профиль?
            </h2>
            <p className={styles.modalDelete__text}>
                В этом случае все созданные цели и задачи будут удалены
            </p>
            <div className={styles.modalDelete__buttons}>
                <Button text="Да" click={clickYes}/>
                <Button text="Нет" click={clickNo} color={"highlight"}/>
            </div>
        </div>
    );
}

export default WindowDeleteProfile;
