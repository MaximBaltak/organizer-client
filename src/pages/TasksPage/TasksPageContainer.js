import {connect} from "react-redux"
import TasksPage from "./TasksPage"
import {
    changedDateEnd, changedDateStart,
    changedTitle, toggleWindow, window, requestAddTask, requestDeleteTasksAll, requestChangedTask
} from "../../store/actions/tasksActions";

let mapStateToProps = (state) => {
    return {
        valueWindow: state.tasks.valueWindow,
        todoList: state.tasks.todoList,
        check: state.tasks.checkWindow,
        title: state.tasks.valueTitle,
        start: state.tasks.valueDateStart,
        end: state.tasks.valueDateEnd,
        errors: state.tasks.errors
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        click: (e, id) => {
            if (e.target.id === '1') {

                console.log(738)
                dispatch(requestChangedTask(id))
            } else if (e.target.id === '2') {
                dispatch(requestDeleteTasksAll(id))
            }
        },
        window: () => {
            dispatch(window())
        },
        push: () => {
            dispatch(requestAddTask())
        },
        changeTitle: (e) => {
            dispatch(changedTitle({value: e.target.value}))
        },
        changeDateStart: (e) => {
            dispatch(changedDateStart({value: e.target.value}))
        },
        changeDateEnd: (e) => {
            dispatch(changedDateEnd({value: e.target.value}))
        },

        click1: () => {
            dispatch(requestDeleteTasksAll())
        },
        window1: () => {
            dispatch(toggleWindow())
        }
    }
}


let TasksPageContainer = connect(mapStateToProps, mapDispatchToProps)(TasksPage)
export default TasksPageContainer
