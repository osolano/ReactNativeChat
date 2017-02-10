import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class OnlineUsersList extends React.Component {
    state = {
      name: '',
    };

    constructor() {
      super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      };
    }

    render() {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
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
    color: 'white',
    marginTop: 20,
  },

});
