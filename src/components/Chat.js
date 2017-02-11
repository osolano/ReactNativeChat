import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import Backend from '../Backend';


export default class Chat extends React.Component {
    state = {
        messages: [],
        user: ''
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

    loadMessageHistory() {
        Backend.loadMessages((response) => {
            //var messageHistory = response.messages.filter(message => message.entry.to === this.props.user && message.entry.from === Backend.uuid);
            var messageHistory = response.messages.map(function(message) {
                return message.entry;
            });
            messageHistory = messageHistory.filter(message => 
                message.hasOwnProperty('_id') &&
                ((message.to == this.props.user && message.user.name == Backend.uuid) ||
                (message.to == Backend.uuid && message.user.name == this.props.user))
             );
            messageHistory = messageHistory.reverse();
            for (let message of messageHistory) {
                console.log(message.text);
            }

            console.log('Message History', messageHistory);

            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, messageHistory),
                };
            });
        });
    }

    componentDidMount() {
        //Backend.
        this.loadMessageHistory();

        Backend.listenToChannelEvents((response) => {
            console.log('Channel Event', response);
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, response.message),
                };
            });
        })
    }


    componentWillUnmount() {
        //Backend.closeChat();
    }

}
