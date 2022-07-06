import {connect} from "react-redux";
import Header from "./Header";
import {
    removeUserToken,
    setSignIn,
    setSignUp,
} from "../../store/actions/usersActions";

const mapStateToProps = (state) => {
    return {
        userToken: state.users.userToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clickSighIn: () => {
            dispatch(setSignIn());
        },
        clickSighUp: () => {
            dispatch(setSignUp());
        },
        clickExit: () => {
            dispatch(removeUserToken());
        },
    };
};
const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderContainer;
