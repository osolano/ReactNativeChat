import React from 'react';
import Backend from '../Backend';

import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {

    state = {
        messages: [],
        user: '',
    };

    render() {
        return (
            <GiftedChat
            messages={this.state.messages}
            onSend={(message) => {
                Backend.sendMessage(message, this.props.user);
            }}
            user={{
                _id: Backend.uuid,
                name: Backend.uuid,
            }}
            />
        );
    }

    componentDidMount() {
        this.loadMessageHistory();

        this.listener = Backend.listenToMessageEvents((response) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, response.message),
                };
            });
        })
        console.log('listener', this.listener);
    }

    loadMessageHistory() {
        Backend.loadMessages((response) => {
            var messageHistory = response.messages.map(function(message) {
                return message.entry;
            });
            messageHistory = messageHistory.filter(message =>
                message.hasOwnProperty('_id') &&
                ((message.to == this.props.user && message.user.name == Backend.uuid) ||
                (message.to == Backend.uuid && message.user.name == this.props.user))
             );

            messageHistory = messageHistory.reverse();

            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, messageHistory),
                };
            });
        });
    }



    componentWillUnmount() {
        console.log('will unmount');
        console.log(this.listener);
        Backend.removeMessageListener(this.listener);
    }

}
