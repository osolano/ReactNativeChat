import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight
} from 'react-native';

import Backend from '../Backend';
import { Actions } from 'react-native-router-flux';

export default class OnlineUsersList extends React.Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.onlineUsers),
            isLoading: false,
            name: '',
            onlineUsers: []
        };
    }

    componentDidMount() {
        console.log('ONLINE LIST DID MOUNT');
        Backend.listenToPresenceEvents((response) => {
            //console.log('ONLINE PRESENCE RESPONSE', response);
            Backend.listOfUsersOnline((users) => {
                console.log('BACKEND UUID', Backend.uuid);
                let newUsers = users.occupants.filter(user => user.uuid !== Backend.uuid);
                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(newUsers),
                });
            });
            /*
            if (response.action == 'join') {
                console.log('join');

                let duplicateUsers =  this.props.onlineUsers.filter(user => user.uuid == response.uuid );
                console.log('Count', duplicateUsers);
                console.log('old users', this.props.onlineUsers);

                if (duplicateUsers === undefined) {
                    console.log('undefined');
                    let newUsers = this.props.onlineUsers.push({
                        uuid: response.uuid
                    });
                    console.log('new users', newUsers);
                    this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(newUsers),
                    });
                }
            } else if (response.action == 'timeout') {
                let lessUsers =  this.props.onlineUsers.filter(user => user.uuid != response.uuid );

                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(lessUsers),
                });
            } else if (response.action == 'leave') {
                let lessUsers =  this.props.onlineUsers.filter(user => user.uuid != response.uuid );

                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(lessUsers),
                });
            }
            */

        });
    }

    getTheData(callback) {
        console.log('Get the Data');
        Backend.listOfUsersOnline((response) => {
            callback(response.occupants);
        });
    }

    renderRow(rowData, sectionID, rowID) {
        console.log('RenderRow');
        return (
            <TouchableHighlight
            onPress={() => {
                    Actions.chat({
                        title: rowData.uuid,
                        user: rowData.uuid
                    });
                }}
            underlayColor='#dddddd'
            style={{height:44}}>
            <View>
            <Text style={{fontSize: 20, color: '#000000'}} numberOfLines={1}>{rowData.uuid}</Text>
            <View style={{height: 1, backgroundColor: '#dddddd'}}/>
            </View>
            </TouchableHighlight>
        );
    }


    render() {
        this.renderRow = this.renderRow.bind(this)
        var currentView = (this.state.isLoading)?<View/>:<ListView dataSource={this.state.dataSource} renderRow={this.renderRow} enableEmptySections={true}/>

        return(
            <View>
            {currentView}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    label3: {
        fontSize: 20,
        color: 'black',
        marginTop: 80,
    },

});
