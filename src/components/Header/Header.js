import React from "react";
import logo from "../../img/logo.png";
import styles from "./Header.module.scss";

export default function Header({
                                   userToken,
                                   clickSighIn,
                                   clickSighUp,
                                   clickExit,
                               }) {
    return (
        <div className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__logo}>
                    <img src={logo} alt="logo"/>
                </div>
                <h1 className={styles.header__title}>Онлайн Органайзер</h1>
                {userToken === true ?
                    <div className={styles.header__auth}>
                      <span className={styles[`header__auth-text`]} onClick={clickExit}>
                        Выйти
                      </span>
                    </div> :
                    <div className={styles[`header__auth-login`]}>
                        <p className={styles[`header__auth-text`]} onClick={clickSighIn}>
                            Вход
                        </p>
                        <p className={styles[`header__auth-text`]} onClick={clickSighUp}>
                            Регистрация
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}
