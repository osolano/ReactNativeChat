import PubNub from 'pubnub';

class Backend {
    uuid = '';
    usersOnline = null;
    pubnub = null;
    
    constructor() {
        console.log('Pubnub constructor');

        pubnub = new PubNub({
            subscribeKey: 'sub-c-a8e24fb2-ef3b-11e6-b753-0619f8945a4f',
            publishKey: 'pub-c-daf7877d-2242-4a2a-b3be-c22c1d5e1a3d',
            uuid: 'computer user'
        });

        this.uuid = 'computer user'

        console.log('ID', pubnub.getUUID());
        pubnub.subscribe({
            channels: ['global'],
            withPrescense: true
        });

        pubnub.addListener({
            message: function(message){
                console.log('Listener Message', message);
            }
        });

        // View the UUID and state objects of those currently subscribed
    }

    sendMessage(message) {
        console.log('Try sending a message');
        pubnub.publish(
            {
                message: {
                    text: message
                },
                channel: 'global',
            },
            function (status, response) {
                if (status.error) {
                    // handle error
                    console.log(status)
                } else {
                    console.log("message Published w/ timetoken", response.timetoken)
                }
            }
        );
    }

    listOfUsersOnline(callback) {
        console.log('LIST ID', pubnub.getUUID());
        pubnub.hereNow(
            {
                channels: ['global'],
                includeState: true
            },
            function(status, response){
                callback({
                    occupants: response.channels.global.occupants,
                    totalOccupants: response.channels.global.occupancy
                });
            }
        );
    }

}
/*
// retrieve the messages from the Backend
loadMessages(callback) {
this.messagesRef = firebase.database().ref('messages');
this.messagesRef.off();
const onReceive = (data) => {
const message = data.val();
callback({
_id: data.key,
text: message.text,
createdAt: new Date(message.createdAt),
user: {
_id: message.user._id,
name: message.user.name,
},
});
};
this.messagesRef.limitToLast(20).on('child_added', onReceive);
}
// send the message to the Backend
sendMessage(message) {
for (let i = 0; i < message.length; i++) {
this.messagesRef.push({
text: message[i].text,
user: message[i].user,
createdAt: firebase.database.ServerValue.TIMESTAMP,
});
}
}
// close the connection to the Backend
closeChat() {
if (this.messagesRef) {
this.messagesRef.off();
}
}
}
*/
export default new Backend();
