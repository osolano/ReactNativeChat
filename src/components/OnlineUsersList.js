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
        var currentView = (this.state.isLoading)?<View/>:<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true}/>

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
