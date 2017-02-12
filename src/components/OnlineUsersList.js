import React from 'react';
import Backend from '../Backend';

import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Container,
    Image
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
            onlineUsers: this.props.onlineUsers,
        };
    }

    componentDidMount() {
        Backend.listenToPresenceEvents((response) => {
            Backend.listOfUsersOnline((users) => {
                let newUsers = users.occupants.filter(user => user.uuid !== Backend.uuid);
                console.log('New Users', newUsers);
                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(newUsers),
                  onlineUsers: newUsers,
                });
            });
        });
    }

    componentWillUnmount() {
        Backend.unsubscribe();
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

    listIsEmpty() {
        return (this.state.userCount == 0);
    }

    render() {
        this.renderRow = this.renderRow.bind(this)
        var blankView = <Text style={{marginTop: 50, fontSize: 24, textAlign: 'center'}}>There are no users online yet... </Text>
        var blankImageView = <Image style={{ height: 300, resizeMode: 'contain', justifyContent: 'center'}} source={{uri: 'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif'}} />
        var currentView =
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            enableEmptySections={true}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            />
        var blankViewRender = (this.state.dataSource.getRowCount() == 0) ? blankView : <View></View>
        var blankImageViewRender = (this.state.dataSource.getRowCount() == 0) ? blankImageView : <View></View>

        return(
            <View>
                {currentView}
                {blankViewRender}
                {blankImageViewRender}
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
