import PubNub from 'pubnub';

class Backend {
    uuid = '';
    usersOnline = null;
    pubnub = null;
    // initialize Firebase Backend
    constructor() {
        pubnub = new PubNub({
            subscribeKey: 'sub-c-a8e24fb2-ef3b-11e6-b753-0619f8945a4f',
            publishKey: 'pub-c-daf7877d-2242-4a2a-b3be-c22c1d5e1a3d',
            uuid: 'computer user'
        });

        this.set

        pubnub.subscribe({
            channels: ['global']
        });

        pubnubDemo.addListener({
            message: function(message){
                console.log(message)
            }
        });

        // View the UUID and state objects of those currently subscribed


    }


    setUid(value) {
        this.uid = value;
    }
    getUid() {
        return this.uid;
    }

    listOfUsersOnline() {
        pubnub.hereNow(
            {
                channels: ['global'],
                includeState: true
            },
            function(status, response){
                console.log(response);
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
