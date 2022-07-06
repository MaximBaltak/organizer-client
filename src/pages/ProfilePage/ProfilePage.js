import React, {useEffect} from "react";
import styles from "./ProfilePage.module.scss";
import PageName from "../../components/PageName/PageName";
import Button from "../../components/Button/Button";
import DateTimeContainer from "../../components/DateTime/DateTimeContainer";
import WindowProfile from "../../modals/WindowProfile/WindowProfile";
import WindowDeleteProfile from "../../modals/WindowDeleteProfile/WindowDeleteProfile";
import {useTransition, animated} from "react-spring";
import {useDispatch} from "react-redux";
import {requestGetData} from "../../store/actions/usersActions";

function ProfilePage({
                         handleDeleteUserProfile,
                         isOpenDelete,
                         isChangePassword,
                         isChangeLogin,
                         inputPassword,
                         inputLogin,
                         isClickDelete,
                         isClickLogin,
                         isClickPassword,
                         changedPassword,
                         changedLogin,
                         changedConfirmLogin,
                         changedConfirmPassword,
                         inputConfirmLogin,
                         inputConfirmPassword,
                         login,
                         password,
                         errors,
                         updatedLogin,
                         updatedPassword,
                        updateEmail,
                        email,
                        inputEmail,
                        inputConfirmEmail,
                         isChangeEmail,
                        isClickEmail,
                         changedEmail,
                        changedConfirmEmail

                     }) {
    const animationDelete = useTransition(isOpenDelete, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
        expires: true,
    });
    const animationChangePassword = useTransition(isChangePassword, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
        expires: true,
    });
    const animationChangeEmail = useTransition(isChangeEmail, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
        expires: true,
    });
    const animationChangeLogin = useTransition(isChangeLogin, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
        expires: true,
    });
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestGetData())
        // eslint-disable-next-line
    }, [])
    return (
        <div className={styles.profile}>
            <div className={styles.profile__container}>
                <div className={styles.profile__pagetitle}>
                    <PageName text="Профиль"/>
                </div>
                <div className={styles.profile__datetime}>
                    <DateTimeContainer/>
                </div>

                <h2 className={styles.profile__title}>
                    Добро пожаловать, {login}
                </h2>
                <div className={styles.changedata}>
                    <p className={styles.changedata__text}>Ваш пароль:</p>
                    <input
                        className={styles.changedata__input}
                        value={password}
                        disabled
                        type="password"
                    />
                    <div className={styles.changedata__button}>
                        <Button text="Изменить" click={isClickPassword}/>
                    </div>
                </div>
                <div className={styles.changedata}>
                    <p className={styles.changedata__text}>Ваш логин:</p>
                    <input
                        className={styles.changedata__input}
                        disabled
                        value={login}
                        type="text"
                    />
                    <div className={styles.changedata__button}>
                        <Button text="Изменить" click={isClickLogin}/>
                    </div>
                </div>
                <div className={styles.changedata}>
                    <p className={styles.changedata__text}>Ваш email:</p>
                    <input
                        className={styles.changedata__input}
                        disabled
                        value={email}
                        type="email"
                    />
                    <div className={styles.changedata__button}>
                        <Button text="Изменить" click={isClickEmail}/>
                    </div>
                </div>
                <div className={styles.changedata__submit}>
                    <Button
                        text="Удалить профиль"
                        click={isClickDelete}
                        color={"highlight"}
                    />
                </div>
                {animationChangeLogin((props, isOpenChangeLogin) =>
                    isOpenChangeLogin ? (
                        <animated.div style={props} className={styles.windowChange}>
                            <WindowProfile
                                type={"login"}
                                clickNo={isClickLogin}
                                changeValue={changedLogin}
                                inputValue={inputLogin}
                                changeConfirmValue={changedConfirmLogin}
                                inputConfirmValue={inputConfirmLogin}
                                error={errors.errorLogin}
                                errorConfirm={errors.errorConfirmLogin}
                                clickYes={updatedLogin}
                                globalErr={errors.globalText}
                            />
                        </animated.div>
                    ) : null
                )}
                {animationChangePassword((props, isOpenChangePassword) =>
                    isOpenChangePassword ? (
                        <animated.div style={props} className={styles.windowChange}>
                            <WindowProfile
                                type={"password"}
                                clickNo={isClickPassword}
                                changeValue={changedPassword}
                                inputValue={inputPassword}
                                changeConfirmValue={changedConfirmPassword}
                                inputConfirmValue={inputConfirmPassword}
                                error={errors.errorPassword}
                                errorConfirm={errors.errorConfirmPassword}
                                clickYes={updatedPassword}
                                globalErr={errors.globalText}
                            />
                        </animated.div>
                    ) : null
                )}
                {animationChangeEmail((props, isOpenChangeEmail) =>
                    isOpenChangeEmail ? (
                        <animated.div style={props} className={styles.windowChange}>
                            <WindowProfile
                                type={"email"}
                                clickNo={isClickEmail}
                                changeValue={changedEmail}
                                inputValue={inputEmail}
                                changeConfirmValue={changedConfirmEmail}
                                inputConfirmValue={inputConfirmEmail}
                                error={errors.errorEmail}
                                errorConfirm={errors.errorConfirmEmail}
                                clickYes={updateEmail}
                                globalErr={errors.globalText}
                            />
                        </animated.div>
                    ) : null
                )}
                {animationDelete((props, isDelete) =>
                    isDelete ? (
                        <animated.div style={props} className={styles.windowDelete}>
                            <WindowDeleteProfile
                                clickYes={handleDeleteUserProfile}
                                clickNo={isClickDelete}
                            />
                        </animated.div>
                    ) : null
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
