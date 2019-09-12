import React, {Component} from 'react';

class MessageForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();

        const {emit} = this.props;
        const text = this.refs.message.value.trim();
        this.refs.message.value = '';

        if (!text) {
            return false;
        }
        
        emit({
            text,
            timeStamp: Date.now(),
            id: Math.random().toString(36).substr(2, 9)
        })
    }

    render () {
        return (
            <form name="chat-message" onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    ref="message"
                    placeholder="Type your message..."
                />
            </form>
        );
    }
}

export default MessageForm;