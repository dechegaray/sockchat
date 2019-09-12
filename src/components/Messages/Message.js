import React from 'react';
import moment from 'moment';

const message = (props) => {
    const {text, timeStamp} = props;
    const formattedTimeStamp = timeStamp ? moment(timeStamp).format('MMM Do YYYY, h:mm:ss a') : '';

    return (
        <li>
            <p>{text}</p>
            <span>{formattedTimeStamp}</span>
        </li>
    );
}

export default message;