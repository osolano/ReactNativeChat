import PubNub from 'pubnub';

class Backend {
    uuid = '';
    usersOnline = null;
    pubnub = null;
    channel = 'global1'
    listener = null;

    constructor() {
        console.log('Pubnub constructor');

        pubnub = new PubNub({
            subscribeKey: 'sub-c-a8e24fb2-ef3b-11e6-b753-0619f8945a4f',
            publishKey: 'pub-c-daf7877d-2242-4a2a-b3be-c22c1d5e1a3d',
        });

    }

    pubnubSetup(name) {
        this.setUUID(name);

        pubnub.subscribe({
            channels: [this.channel],
            withPrescense: true
        });
    }

    setUUID(name) {
        pubnub.setUUID(name);
        this.uuid = name;
    }

    listenToMessageEvents(callback) {
        pubnub.addListener({
            message: function(message){
                console.log('Message Listener', message);
                callback(message);
            }
        });
    }

    listenToPresenceEvents(callback) {
        pubnub.addListener({
            status: function(statusEvent){
                if (statusEvent.category === "PNConnectedCategory") {
                    var newState = {
                        name: this.uuid,
                        timestamp: new Date()
                    };
                    pubnub.setState(
                        {
                            channels: [this.channel],
                            state: newState
                        }
                    );
                }
            },
            presence: function(p){
                console.log('Presence Listener', p);
                callback(p);

                // var action = p.action; // Can be join, leave, state-change or timeout
                // var channelName = p.channel; // The channel for which the message belongs
                // var occupancy = p.occupancy; // No. of users connected with the channel
                // var state = p.state; // User State
                // var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
                // var publishTime = p.timestamp; // Publish timetoken
                // var timetoken = p.timetoken;  // Current timetoken
                // var uuid = p.uuid; // UUIDs of users who are connected with the channel
            }
        });

        pubnub.subscribe({
            channels: [this.channel],
            withPresence: true
        });
    }


    stopListener(listener) {
        //console.log('STOP LISTENER',)
        pubnub.removeListener(this.listener);
    }

    sendMessage(message, toUser) {
        console.log('Try sending a message');

        for (let i = 0; i < message.length; i++) {
            pubnub.publish(
                {
                    message: {
                        _id: Math.round(Math.random() * 1000000),
                        to: toUser,
                        text: message[i].text,
                        createdAt: new Date().valueOf(),
                        user: message[i].user
                    },
                    channel: this.channel,
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
    }

    loadMessages(callback) {
        console.log('load messages');

        pubnub.history(
            {
                channel: this.channel,
                reverse: true, // Setting to true will traverse the time line in reverse starting with the oldest message first.
                count: 100, // how many items to fetch
            },
            function (status, response) {
                console.log(response);
                callback(response);
            }
        );

    }

    listOfUsersOnline(callback) {
        console.log('LIST ID', pubnub.getUUID());
        pubnub.hereNow(
            {
                channels: [this.channel],
                includeState: true
            },
            (status, response) => {
                console.log(response);
                console.log(this.channel);
                console.log(response.channels.hasOwnProperty(this.channel));
                if (response.channels.hasOwnProperty(this.channel)) {

                    callback({
                        occupants: response.channels[this.channel].occupants,
                        totalOccupants: response.channels[this.channel].occupancy
                    });
                }
            }
        );
    }

}


export default new Backend();
