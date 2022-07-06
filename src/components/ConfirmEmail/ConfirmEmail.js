import React from 'react';
import styles from './ConfirmEmail.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {sendConfirmRequest} from "../../store/actions/confirmEmailActions";
const ConfirmEmail = () => {
    const sendStatus=useSelector(state=>state.confirm.sendStatus)
    const dispatch=useDispatch()
    console.log(sendStatus)
    return (
        <div className={styles.container}>
            <div className={styles.container__flex}>
            <p className={styles.container__flex__text}>{!sendStatus?'Для возможности получать уведомление на почту и восстанавливать логин или пароль подтвердите её':'Письмо отправлено'}</p>
            <button onClick={()=>dispatch(sendConfirmRequest())} className={styles.container__flex__yes}>Подтвердить</button>
            </div>
        </div>
    );
};

export default ConfirmEmail;