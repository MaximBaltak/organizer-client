import {connect} from "react-redux";
import ResetPage from "./ResetPage";
import {inputLogin, inputPassword, requestNewLogin, requestNewPassword} from "../../store/actions/resetActions";


const mapStateToProps = (state) => {
    return {
        type:state.reset.typePage,
        confirmUser:state.reset.confirmUser,
        login:state.reset.login,
        password:state.reset.password,
        error:state.reset.errorsData,
        status:state.reset.status

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeLogin(e){
            dispatch(inputLogin({text:e.target.value}))
        },
        changePassword(e){
            dispatch(inputPassword({text:e.target.value}))
        },
        setNewLogin(){
            dispatch(requestNewLogin())
        },
        setNewPassword(){
            dispatch(requestNewPassword())
        }
    };
};


const ResetContainer = connect(mapStateToProps,mapDispatchToProps)(ResetPage);
export default ResetContainer;
