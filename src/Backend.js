import PubNub from 'pubnub';

class Backend {
    uuid = '';
    usersOnline = null;
    pubnub = null;
    channel = 'global1'
    listener = null;

    constructor() {
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
      var messageListener = {
        message: function(message){
            console.log('Message Listener', message);
            callback(message);
        }
      }

      pubnub.addListener(messageListener);
      return messageListener;
    }

    removeMessageListener(listener) {
      pubnub.removeListener(listener);
      console.log('Did Remove Listener');
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
            }
        });

        pubnub.subscribe({
            channels: [this.channel],
            withPresence: true
        });
    }

    unsubscribe() {
        pubnub.unsubscribeAll();
    }

    stopListener(listener) {
        pubnub.removeListener(this.listener);
    }

    sendMessage(message, toUser) {
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
                        console.log('Error', status);
                    }
                }
            );
        }
    }

    loadMessages(callback) {
        pubnub.history(
            {
                channel: this.channel,
                reverse: false,
                count: 100,
            },
            function (status, response) {
                console.log(response);
                callback(response);
            }
        );

    }

    listOfUsersOnline(callback) {
        pubnub.hereNow(
            {
                channels: [this.channel],
                includeState: true
            },
            (status, response) => {
                console.log(response);
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
