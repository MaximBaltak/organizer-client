import React from "react";
import styles from "./ManagementGoals.module.scss";
import Button from "../Button/Button";

function ManagementGoals({inputs, click, clearGoals}) {
    return (
        <div className={styles.managementgoals}>
            <div className={styles.managementgoals__block}>
                <div className={styles.managementgoals__goaltitle}>
                    {inputs.errors.errorTitle ?
                        <p className={styles.managementgoals__error}>
                            Должно быть название
                        </p>
                     : null}
                    <input
                        style={{
                            borderColor: inputs.errors.errorTitle ? "red" : "white",
                            transition: "all 0.2s",
                        }}
                        className={[
                            styles.managementgoals__input,
                            styles.managementgoals__input_title,
                        ].join(" ")}
                        type="text"
                        maxLength={25}
                        onChange={inputs.changeTitle}
                        value={inputs.valueTitle}
                        placeholder="Название цели"
                    />
                </div>
                <div
                    className={[
                        styles.managementgoals__info,
                        styles.managementgoals__info_left,
                    ].join(" ")}>
                    <p className={styles.managementgoals__datatext}>
                        Конечная дата для достижения заданной цели
                    </p>
                    <input
                        className={[
                            styles.managementgoals__input,
                            styles.managementgoals__input_enddata,
                        ].join(" ")}
                        onChange={inputs.changeDate}
                        value={inputs.valueDate}
                        type="date"
                    />
                </div>
                <div
                    className={[
                        styles.managementgoals__info,
                        styles.managementgoals__info_right,
                    ].join(" ")}>
                    <p className={`${styles.text} ${styles.managementgoals__stepstext}`}>
                        Перечислите название этапов для достижения цели через запятую если
                        они есть
                    </p>
                    {inputs.errors.errorTodo ? (
                        <p className={styles.managementgoals__error}>
                            Должна быть хотя бы одна задача
                        </p>
                    ) : null}
                    <textarea
                        style={{
                            borderColor: inputs.errors.errorTodo ? "red" : "white",
                            transition: "all 0.2s",
                        }}
                        className={styles.managementgoals__stepsinput}
                        onChange={inputs.changeTodo}
                        value={inputs.valueTodo}
                        cols="30"
                        rows="10"
                    />
                </div>
                <div className={styles.managementgoals__buttons}>
                    <Button click={click} text="Добавить"/>
                    <Button text="Очистить" color={"highlight"} click={clearGoals}/>
                </div>
            </div>
        </div>
    );
}

export default ManagementGoals;
