import React from 'react';
import Button from "../../components/Button/Button";
import styles from './ResetWindow.module.scss'
const ResetWindow = ({changeEmail,email,clickNo,clickYes,error,status}) => {
    return (
        <>
            {status?
                <p className={styles.text}>{status}</p>:
                <p className={styles.text}>Для сброса пароля или логина укажите свою электронную почту </p>
            }
            {error.error? <p style={{color:'red'}}>{error.errorText}</p>:null}
            <input style={{borderColor:error.errorColor}} className={styles.email} type="email" value={email} onChange={e=>changeEmail(e.target.value)}/>
            <div className={styles.wrapperReset}>
                <Button text='Отправить' click={clickYes}/>
                <Button text='Отмена' click={()=>clickNo()}/>
            </div>
        </>
    );
};

export default ResetWindow;