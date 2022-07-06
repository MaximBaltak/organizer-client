import React from 'react';
import styles from './TaskForGoal.module.scss'

function TaskForGoal({el, checkTodo, goalId}) {
    return (
        <div style={{borderColor: el.borderColor,}} className={styles.el}>
            <p style={{
                color: el.borderColor,
                textDecorationLine: el.chek ? 'line-through' : 'none',
                textDecorationColor: 'white'
            }}>{el.title}</p>
            {el.showButton ? <button onClick={() => checkTodo(el._id, goalId)}/> : null}
        </div>
    );
}

export default TaskForGoal;