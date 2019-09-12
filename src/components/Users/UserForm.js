import React, {Component} from 'react';

class UserForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();

        const {emit, id} = this.props;
        const username = this.refs.username.value.trim();
        this.refs.username.value = '';

        if (!username) {
            return false;
        }
        
        emit({id, username});
    }

    render () {
        return (
            <form name="chat-login" onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    ref="username"
                    placeholder="Type your username..."
                />
            </form>
        );
    }
}

export default UserForm;