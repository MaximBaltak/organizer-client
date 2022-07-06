import {connect} from "react-redux";
import ProfilePage from "./ProfilePage";
import {
    requestDeleteProfileId,
    toggleWindowDelete,
    toggleWindowChangeLogin,
    toggleWindowChangePassword,
    inputLoginProfile,
    inputPasswordProfile,
    inputConfirmLoginProfile,
    inputConfirmPasswordProfile,
    requestUpdateLogin,
    requestUpdatePassword, requestUpdateEmail, toggleWindowChangeEmail, inputEmailProfile, inputConfirmEmailProfile,
} from "../../store/actions/usersActions";

const mapStateToProps = (state) => {
    return {
        inputLogin: state.users.profile.inputLogin,
        inputPassword: state.users.profile.inputPassword,
        inputEmail: state.users.profile.inputEmail,
        inputConfirmLogin: state.users.profile.inputConfirmLogin,
        inputConfirmPassword: state.users.profile.inputConfirmPassword,
        inputConfirmEmail: state.users.profile.inputConfirmEmail,
        isOpenDelete: state.users.profile.isOpenDelete,
        isChangeLogin: state.users.profile.isChangeLogin,
        isChangePassword: state.users.profile.isChangePassword,
        isChangeEmail: state.users.profile.isChangeEmail,
        login: state.users.profile.login,
        password: state.users.profile.password,
        email: state.users.profile.email,
        errors: {
            errorLogin: state.users.profile.errorLogin,
            errorPassword: state.users.profile.errorPassword,
            errorEmail: state.users.profile.errorEmail,
            errorConfirmLogin: state.users.profile.errorConfirmLogin,
            errorConfirmPassword: state.users.profile.errorConfirmPassword,
            errorConfirmEmail: state.users.profile.errorConfirmEmail,
            globalText:state.users.profile.globalError
        }
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleDeleteUserProfile: () => {
            dispatch(requestDeleteProfileId())
        },
        updatedLogin: () => {
            dispatch(requestUpdateLogin())
        },
        updatedPassword: () => {
            dispatch(requestUpdatePassword())
        },
        updateEmail: () => {
            dispatch(requestUpdateEmail())
        },
        isClickDelete: () => {
            dispatch(toggleWindowDelete())
        },
        isClickLogin: () => {
            dispatch(toggleWindowChangeLogin())
        },
        isClickPassword: () => {
            dispatch(toggleWindowChangePassword())
        },
        isClickEmail: () => {
            dispatch(toggleWindowChangeEmail())
        },
        changedLogin: (text) => {
            dispatch(inputLoginProfile({text}))
        },
        changedPassword: (text) => {
            dispatch(inputPasswordProfile({text}))
        },
        changedEmail: (text) => {
            dispatch(inputEmailProfile({text}))
        },
        changedConfirmLogin: (text) => {
            dispatch(inputConfirmLoginProfile({text}))
        },
        changedConfirmPassword: (text) => {
            dispatch(inputConfirmPasswordProfile({text}))
        },
        changedConfirmEmail: (text) => {
            dispatch(inputConfirmEmailProfile({text}))
        },
    };
};

const ProfilePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);

export default ProfilePageContainer;
