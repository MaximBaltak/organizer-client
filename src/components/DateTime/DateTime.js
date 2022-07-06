import React, {useEffect} from "react";
import styles from "./DateTime.module.scss";

function DateTime({date, day, time, datetime}) {
    useEffect(() => {
        let timer = setInterval(datetime, 1000);
        return () => {
            clearInterval(timer);
        };
    });
    return (
        <div className={styles.wap}>
            <p>{date}</p>
            <p>{day}, {time}</p>
        </div>
    );
}

export default DateTime;
