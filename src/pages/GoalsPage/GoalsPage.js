import React, {useEffect} from "react";
import styles from "./GoalsPage.module.scss";
import PageName from "../../components/PageName/PageName";
import ManagementGoals from "../../components/ManagementGoals/ManagementGoals";
import TodoWindow from "../../modals/TodoWindow/TodoWindow";
import DateTimeContainer from "../../components/DateTime/DateTimeContainer";
import Goals from "../../components/Goals/Goals";
import {useTransition, animated} from "react-spring";
import {useDispatch} from "react-redux";
import {getGoalsId} from "../../store/actions/goalsActions";
import {useLocation} from "react-router-dom";

function GoalsPage({
                       errors,
                       checkWindow,
                       dayFunction,
                       openWindow,
                       addGoals,
                       goals,
                       valueWindow,
                       changeTitle,
                       changeDate,
                       changeTodo,
                       valueTitle,
                       valueDate,
                       valueTodo,
                       checkTodo,
                       deleteGoal,
                       clearGoals,
                   }) {
    let objectForInput = {
        changeTodo,
        changeTitle,
        changeDate,
        valueTodo,
        valueDate,
        valueTitle,
        errors,
    };
    const animationModal = useTransition(valueWindow, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
        expires: true
    })
    const dispatch = useDispatch()
    useEffect(() => {
        const intervalId = setInterval(() => dispatch(getGoalsId()), 500)
        return () => {
            clearInterval(intervalId)
        }
    })
    return (
        <div className={styles.goals}>
            <div className={styles.goals__container}>
                <div className={styles.goals__pagetitle}>
                    <PageName text="Список целей"/>
                </div>

                <div className={styles.goals__datetime}>
                    <DateTimeContainer/>
                </div>

                <div className={styles.goals__management}>
                    <ManagementGoals
                        click={openWindow}
                        inputs={objectForInput}
                        clearGoals={clearGoals}
                    />
                </div>

                <ul className={styles.price}>
                    {
                       goals.length===0?<p className={styles.price__text}>У вас пока нет целей</p>:
                        goals.map(el =>
                            <li key={el._id}>
                                <Goals
                                    checkTodo={checkTodo}
                                    dayFunction={dayFunction}
                                    goal={el}
                                    deleteGoal={deleteGoal}
                                />
                            </li>)
                    }
                </ul>
                {
                    animationModal((props, value) =>
                        value ? <animated.div className={styles.goals__container__window} style={props}>
                            <TodoWindow
                                text="цель"
                                check={checkWindow}
                                push={addGoals}
                                window={openWindow}
                            />
                        </animated.div> : null)
                }
            </div>
        </div>
    );
}

export default GoalsPage;
