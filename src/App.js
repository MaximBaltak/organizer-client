import "./App.scss";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import {Navigate, Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfilePageContainer from "./pages/ProfilePage/ProfilePageContainer";
import GoalsPageContainer from "./pages/GoalsPage/GoalsPageContainer";
import NotFound from "./pages/NotFound/NotFound";
import {useEffect, useState} from "react";
import TasksPageContainer from "./pages/TasksPage/TasksPageContainer";
import MainPageContainer from "./pages/MainPage/MainPageContainer";
import {useDispatch} from "react-redux";
import {addUserToken, removeUserToken} from "./store/actions/usersActions";
import loading from "./img/loader.gif"
import ResetContainer from "./pages/ResetPage/ResetPageContainer";
import ConfirmEmail from "./components/ConfirmEmail/ConfirmEmail";
import ConfirmEmailPage from "./pages/ConfirmEmailPage/ConfirmEmailPage";
import NewContent from "./components/newContent/NewContent";
function App({userToken, loader}) {
    const [confirm,setConfirm]=useState(false)
    const[openWindow,setOpenWindow]=useState(false)
    const toggleWindow=()=>{setOpenWindow(prev=>!prev)}
    useEffect(() => {
        setInterval(() => {
            if (localStorage.getItem('token')) {
                dispatch(addUserToken())
            } else {
                dispatch(removeUserToken())
            }
        }, 500)
    });
    useEffect(()=>{
        setInterval(()=>{
            if(localStorage.getItem('confirmEmail')==='false'){
                setConfirm(false)
            }else {
                setConfirm(true)
            }
        },1000)
    },[])
    const dispatch = useDispatch()
    return (
        <>
            {!confirm?<ConfirmEmail/>:null}
            <HeaderContainer/>
            {userToken ? <Nav user={userToken}/> : null}
            <button onClick={toggleWindow} className='newVersion'>New</button>
            {openWindow?<NewContent/>:null}
            <div className="maincontent">
                <Routes>
                    <Route
                        path="/"
                        element={
                            !userToken ? <MainPageContainer/>: <Navigate to="/do"/>
                        }
                    />
                    <Route
                        path="/do"
                        element={userToken ?<TasksPageContainer/>:<Navigate to="/"/>}
                    />
                    <Route
                        path="/goals"
                        element={userToken? <GoalsPageContainer/>:<Navigate to="/"/>}
                    />
                    <Route
                        path="/profile"
                        element={userToken?<ProfilePageContainer/>:<Navigate to="/"/>}
                    />
                    <Route path="/notfound" element={<NotFound/>}/>
                    <Route path="*" element={<Navigate to="/notfound"/>}/>
                    <Route
                        path="/reset/:token"
                        element={<ResetContainer/>}

                    />
                    <Route
                        path="/confirm/:token"
                        element={<ConfirmEmailPage/>}

                    />
                    <Route path="/notfound" element={<NotFound/>}/>
                </Routes>
            </div>
            {loader?<div className='wrapper'>
                <img src={loading} alt="loading"/>
            </div>:null}
            <Footer/>
        </>
    );
}

export default App;
