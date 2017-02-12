import React from 'react';
import Backend from '../Backend';

import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight
} from 'react-native';

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
        Backend.listenToPresenceEvents((response) => {
            Backend.listOfUsersOnline((users) => {
                let newUsers = users.occupants.filter(user => user.uuid !== Backend.uuid);
                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(newUsers),
                });
            });

        });
    }

    componentWillUnmount() {
        Backend.unsubscribe();
    }

    getTheData(callback) {
        Backend.listOfUsersOnline((response) => {
            callback(response.occupants);
        });
    }

    renderRow(rowData, sectionID, rowID) {
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
            <View style={styles.row}>
            <Text style={{fontSize: 20, color: '#000000', marginLeft: 12}} numberOfLines={1}>{rowData.uuid}</Text>
            </View>
            </TouchableHighlight>
        );
    }


    render() {
        //this.renderRow = this.renderRow.bind(this)
        //var currentView = (this.state.isLoading)?<View/> :


        return(
            <View>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections={true}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    separator: {
       flex: 1,
       height: StyleSheet.hairlineWidth,
       backgroundColor: '#8E8E8E',
    },
    row: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    }
});
