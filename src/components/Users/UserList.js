import React from 'react';
import User from './User';

const userList = (props) => {
    const {users} = props;

    let list = '';
    if (users.length > 0) {
        list = users.map((user) => <User key={user.id} {...user} />)
    } else {
        list = <User username='No users found' />
    }

    return (
        <ul className="messages-list">
            <h2>Users</h2>
            {
                list
            }
        </ul>
    );
}

export default userList;