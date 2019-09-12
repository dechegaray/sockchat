import React from 'react';
import Message from './Message';

const messageList = (props) => {
    const {messages} = props;

    let list = '';
    if (messages.length > 0) {
        list = messages.map((message) => <Message key={message.id} {...message} />)
    } else {
        list = <Message text='No message has been sent yet' />
    }

    return (
        <ul className="messages-list">
            <h2>Messages</h2>
            {
                list
            }
        </ul>
    );
}

export default messageList;