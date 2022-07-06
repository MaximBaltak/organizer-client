import React, {useEffect} from "react";
import el from "../../img/backround_element.png";
import styles from "./MainPage.module.scss";
import Form from "../../modals/Form/Form";
import {useTransition, animated} from "react-spring";
import ResetWindow from "../../modals/Reset/ResetWindow";

function MainPage({
                      isSignIn,
                      onCancel,
                      datetime,
                      time,
                      day,
                      move,
                      positionXImg,
                      registrOrlogin,
                      password,
                      login,
                      valuePassword,
                      valueLogin,
                      errorsData,
                      touch,
                      email,
                      changeEmail,
                      errorEmail,
                      resetWindow,
                      toggleReset,
                      emailForm,
                      valueEmail,
                      statusSend,
                      send
                  }) {
    useEffect(() => {
        const TimerId = setInterval(datetime, 1000);
        return () => {
            clearInterval(TimerId);
        };
    });
    const animationForm = useTransition(isSignIn, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
    });
    const animationReset = useTransition(resetWindow, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
    });
    return (
        <div onMouseMove={move} onTouchMove={touch} className={styles.main}>
            <div className={styles.main__container}>
                <div className={styles.main__greeting}>
                    <div className={styles.main__datetime}>
                        <p>{time}</p>
                        <p>{day}</p>
                    </div>
                    <p className={styles.main__info}>
                        Войдите или зарегистрируйтесь, чтобы начать пользоваться приложением
                    </p>
                </div>
            </div>
            <img
                className={styles.main__background}
                style={{transform: `translateX(${positionXImg}px)`}}
                src={el}
                alt="png"
            />
            {animationReset((props, toggle) =>
                toggle ? (
                    <animated.div className={styles.reset} style={props}>
                        <ResetWindow email={email}
                                     changeEmail={changeEmail}
                                     clickNo={toggleReset}
                                     error={errorEmail}
                                    status={statusSend}
                                    clickYes={send}/>
                    </animated.div>
                ) : null
            )}
            {animationForm((props, toggle) =>
                toggle !== null ? (
                    <animated.div className={styles.window} style={props}>
                        <Form
                            errors={errorsData}
                            changedPassword={valuePassword}
                            changedLogin={valueLogin}
                            password={password}
                            login={login}
                            email={emailForm}
                            changedEmail={valueEmail}
                            isSignIn={isSignIn}
                            clickOnSign={registrOrlogin}
                            clickOnExit={onCancel}
                            clickReset={toggleReset}
                        />
                    </animated.div>
                ) : null
            )}
        </div>
    );
}

export default MainPage;
