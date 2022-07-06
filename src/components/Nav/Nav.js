import React, {useState} from "react";
import styles from "./Nav.module.scss";
import icon1 from "../../img/icons/icon1.png";
import icon2 from "../../img/icons/icon2.png";
import icon3 from "../../img/icons/icon3.png";
import {NavLink} from "react-router-dom";
import {useTransition, animated} from "react-spring";

function Nav({user}) {
    const [activeHamburger, setActiveHamburger] = useState(false);
    const animationNav = useTransition(activeHamburger, {
        from: {
            width: `${0}%`,
            opacity: 0
        },
        enter: {
            width: `${100}%`,
            opacity: 1
        },
        leave: {
            width: `${0}%`,
            opacity: 0
        },
        expires: true,
    })

    return (
        <div className={styles.nav}>
            <div
                className={styles.nav__container}
            >
                <div className={styles.nav__hamburger}>
                    <button
                        className={
                            activeHamburger
                                ? [styles.hamburger, styles.hamburger_active].join(" ")
                                : styles.hamburger
                        }
                        onClick={() => setActiveHamburger(!activeHamburger)}
                    >
                        <span className={styles.hamburger__stick}/>
                        <span className={styles.hamburger__stick}/>
                        <span className={styles.hamburger__stick}/>
                    </button>
                    <div className={styles.nav__navlist}>
                        <ul className={styles.navlist}>
                            <li
                                className={styles.navlist__item}
                                style={{
                                    opacity: user === false ? 0.4 : 1,
                                }}
                            >
                                <NavLink to="/do">
                                    <img src={icon1} alt="icon1" className={styles.navlist__img}/>
                                    <p className={styles.navlist__text}>Список дел</p>
                                </NavLink>
                            </li>
                            <li
                                className={styles.navlist__item}
                                style={{
                                    opacity: user === false ? 0.4 : 1,
                                }}
                            >
                                <NavLink to="/goals">
                                    <img src={icon2} alt="icon2" className={styles.navlist__img}/>
                                    <p className={styles.navlist__text}>Список целей</p>
                                </NavLink>
                            </li>
                            <li
                                className={styles.navlist__item}
                                style={{
                                    opacity: user === false ? 0.4 : 1,
                                }}
                            >
                                <NavLink to="/profile">
                                    <img src={icon3} alt="icon3" className={styles.navlist__img}/>
                                    <p className={styles.navlist__text}>Профиль</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    {
                        animationNav((props, active) =>
                            active ? <animated.div style={props} className={styles.nav__navlist_active}>
                                <ul className={styles.navlist}>
                                    <li
                                        className={styles.navlist__item}
                                        style={{
                                            opacity: user === false ? 0.4 : 1,
                                        }}
                                    >
                                        <NavLink to="/do">
                                            <p className={styles.navlist__text}>Список дел</p>
                                        </NavLink>
                                    </li>
                                    <li
                                        className={styles.navlist__item}
                                        style={{
                                            opacity: user === false ? 0.4 : 1,
                                        }}
                                    >
                                        <NavLink to="/goals">
                                            <p className={styles.navlist__text}>Список целей</p>
                                        </NavLink>
                                    </li>
                                    <li
                                        className={styles.navlist__item}
                                        style={{
                                            opacity: user === false ? 0.4 : 1,
                                        }}
                                    >
                                        <NavLink to="/profile">
                                            <p className={styles.navlist__text}>Профиль</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </animated.div> : null)}
                </div>
            </div>
        </div>
    );
}

export default Nav;
