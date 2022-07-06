import React, {useEffect} from 'react';
import styles from './ConfirmEmailPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {checkConfirmRequest} from "../../store/actions/confirmEmailActions";
const ConfirmEmailPage = () => {
    const check=useSelector(state=>state.confirm.check)
    const location=useLocation()
   const dispatch=useDispatch()
    useEffect(()=>{
       const token =location.pathname.split('/')[2]
        dispatch(checkConfirmRequest(token))
    },[])
    return (
        <div className={styles.container}>
                <p className={styles.container__text}>{check?'Почта подтверждена':'Ссылка недействительная'}</p>
        </div>
    );
};

export default ConfirmEmailPage;