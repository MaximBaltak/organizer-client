import React from "react";
import styles from "./Task.module.scss";
import Timer from "../Timer/Timer";
import ButtonsElement from "../ButtonsElement/ButtonsElement";

function Task({el, dayFunction, click, id}) {
    return (
        <div
            onClick={(e) => click(e, id)}
            className={styles.elementtodo}
            style={{boxShadow: `inset 0 0 10px ${el.border}`}}>
            <div className={styles.elementtodo__leftblock}>
                <p
                    className={styles.elementtodo__status}
                    style={{color: el.state.color}}>
                    {el.state.text}
                </p>
                <h3 className={styles.elementtodo__name}>{el.title}</h3>
                <div className={styles.elementtodo__datesinfo}>
                    {!el.day ? null :
                        <Timer
                            dayFunction={dayFunction}
                            id={el._id}
                            day={el.day}
                            start={el.dateStart}
                            end={el.dateEnd}
                        />
                    }
                </div>
            </div>
            <ButtonsElement/>
        </div>
    );
}

export default Task;
