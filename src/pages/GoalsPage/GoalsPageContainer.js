import {connect} from "react-redux"
import GoalsPage from "./GoalsPage"
import {
    changedDate,
    changedTitle,
    changedTodo,
    requestAddGoal,
    requestDeleteGoalsIdAll,
    requestUpdateGoalsId,
    toggleWindow,
} from "../../store/actions/goalsActions";

let mapStateToProps = (state) => {
    return {
        valueWindow: state.goals.valueWindow,
        valueTitle: state.goals.valueTitle,
        valueDate: state.goals.valueDate,
        valueTodo: state.goals.valueTodo,
        goals: state.goals.goals,
        checkWindow: state.goals.checkWindow,
        errors: state.goals.errors,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        changeTitle: (e) => {
            dispatch(changedTitle({text: e.target.value}))
        },
        changeDate: (e) => {
            dispatch(changedDate({text: e.target.value,}))
        },
        changeTodo: (e) => {
            dispatch(changedTodo({text: e.target.value}))
        },
        addGoals: () => {
            let year = new Date().getFullYear()
            let month = new Date().getMonth() + 1
            let day = new Date().getDate()
            let date

            if (month < 10 && day < 10) {
                date = `${year}-0${month}-0${day}`
            } else {
                if (month < 10) {
                    date = `${year}-0${month}-${day}`
                } else if (day < 10) {
                    date = `${year}-${month}-0${day}`
                } else {
                    date = `${year}-${month}-${day}`
                }
            }
            dispatch(requestAddGoal(date))
        },
        openWindow: () => {
            dispatch(toggleWindow())
        },
        checkTodo: (taskId, goalId) => {
            console.log(taskId, goalId)
            dispatch(requestUpdateGoalsId({taskId, goalId}))
        },
        clearGoals: () => {
            dispatch(requestDeleteGoalsIdAll())
        },
        deleteGoal: (goalId) => {
            dispatch(requestDeleteGoalsIdAll(goalId))
        }
    }
}

let GoalsPageContainer = connect(mapStateToProps, mapDispatchToProps)(GoalsPage)
export default GoalsPageContainer