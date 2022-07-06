import React from "react";
import Button from "./../../components/Button/Button";
import styles from "./WindowProfile.module.scss";

function WindowProfile({
                           type = "login",
                           clickNo,
                           clickYes,
                           changeValue,
                           inputValue,
                           inputConfirmValue,
                           changeConfirmValue,
                           error,
                           errorConfirm,
                           globalErr
                       }) {
    console.log(globalErr)
    return (
        <div className={styles.modalChange}>
            <h2 className={styles.modalChange__title}>
                Изменение {type === "login" ? "логина:" : type==='password'?"пароля:":'почты:'}
            </h2>
            {globalErr?<p className={styles.modalChange__errorText}>{globalErr}</p>:null}
            <div className={styles.modalChange__block}>
                <label className={styles.modalChange__label}>
                    {type === "login" ? "Ваш новый логин:" : type==="password"?"Ваш новый пароль:":"Ваш новый email:"}
                </label>
                {error.error ? <p style={{color: error.color}}>{error.text}</p> : null}
                <input style={{borderColor: error.color}}
                       className={styles.modalChange__input}
                       onChange={e => changeValue(e.target.value)}
                       value={inputValue}
                       type={type==='login'?'text':type==='password'?'password':'email'}/>
            </div>
            <div className={styles.modalChange__block}>
                <label className={styles.modalChange__label}>
                    {type === "login" ? "Подтвердите логин:" : type==='password'?"Подтвердите пароль":"Подтвердите email"}
                </label>
                {errorConfirm.error ? <p style={{color: errorConfirm.color}}>{errorConfirm.text}</p> : null}
                <input style={{borderColor: errorConfirm.color}}
                       className={styles.modalChange__input}
                       onChange={e => changeConfirmValue(e.target.value)}
                       value={inputConfirmValue}
                       type={type==='login'?'text':type==='password'?'password':'email'}/>
            </div>
            <div className={styles.modalChange__buttons}>
                <Button text="Изменить" click={clickYes}/>
                <Button text="Отмена" click={clickNo}/>
            </div>
        </div>
    );
}

export default WindowProfile;
