import React, {useEffect} from 'react';
import Button from "../../components/Button/Button";
import styles from './ResetPage.module.scss'
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {requestConfirmUser} from "../../store/actions/resetActions";

const ResetPage = ({type, confirmUser,login,password,error,changeLogin,changePassword,status,setNewLogin,setNewPassword}) => {
    console.log(confirmUser,type)
    const path = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        const url = `/auth${path.pathname}${path.search}`
        dispatch(requestConfirmUser(url))
    }, [])
    return (
        <>
            {confirmUser ?
                <div className={styles.reset}>
                    <h1 className={styles.title}>{type === 'login' ? 'Сброс логина' : 'Сброс пароля'}</h1>
                    {type === 'login' ?
                        <div className={styles.flex}>
                            <label className={styles.text} htmlFor="new-login">Новый логин</label>
                            {error.login.error? <p style={{color:'red'}} >{error.login.text}</p>:null}
                            <input className={styles.input}
                                   style={{borderColor:error.login.borderColor}}
                                   onChange={changeLogin}
                                   value={login}
                                   id='new-login'
                                   type="text"/>
                        </div> :
                        <div className={styles.flex}>
                            <label className={styles.text} htmlFor="new-password">Новый Пароль</label>
                            {error.password.error? <p style={{color:'red'}} >{error.password.text}</p>:null}
                            <input style={{borderColor:error.password.borderColor}}
                                   className={styles.input}
                                   onChange={changePassword}
                                   value={password}
                                   id='new-password'
                                   type="password"/>
                        </div>}
                    {status?<h2 style={{fontSize:'35px',color:'white',textAlign:'center'}}>{status}</h2>:null}
                    <div className={styles.button}>
                        {type === 'login' ? <Button text='Подтвердить' click={setNewLogin}/> : <Button text='Подтвердить' click={setNewPassword}/>}
                    </div>
                </div> :
                <div className={styles.reset}>
                    <h1 className={styles.title}>Ссылка не действительна</h1>
                </div>}

        </>

    );
};

export default ResetPage;