import React from "react";
import styles from "./Inputs.module.scss";

function Inputs({
                    title,
                    start,
                    end,
                    changeTitle,
                    changeDateStart,
                    changeDateEnd,
                    errors
                }) {
    return (
        <div className={styles.addTodoInputs}>
            <div className={styles.addTodoInputs__inputblock}>
                {errors.errorTitle ? <p className={styles.addTodoInputs__error}>Должно быть название</p> : null}
                <input
                    style={{
                        borderColor: errors.errorTitle ? 'red' : 'white',
                        transition: 'all 0.2s'
                    }}
                    className={styles.addTodoInputs__input}
                    onChange={changeTitle}
                    type="text"
                    value={title}
                    maxLength={25}
                    placeholder="Название дела"
                />
            </div>
            <div className={styles.addTodoInputs__inputblock}>
                <label className={styles.addTodoInputs__label} htmlFor="start">
                    Начало:
                </label>
                <input
                    className={styles.addTodoInputs__input}
                    onChange={changeDateStart}
                    id="start"
                    value={start}
                    type="date"
                />
            </div>
            <div className={styles.addTodoInputs__inputblock}>
                <label className={styles.addTodoInputs__label} htmlFor="end">
                    Конец:
                </label>
                <input
                    className={styles.addTodoInputs__input}
                    onChange={changeDateEnd}
                    id="end"
                    value={end}
                    type="date"
                />
            </div>
        </div>
    );

}

export default Inputs;
