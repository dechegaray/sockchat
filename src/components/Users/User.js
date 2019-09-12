import React from 'react';

const user = (props) => {
    const {id, username} = props;

    return (
        <li>
            <p>{username}</p>
            <span>Code: {id}</span>
        </li>
    );
}

export default user;