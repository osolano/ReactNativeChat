import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Backend from '../Backend';

export default class Login extends React.Component {
    state = {
      name: '',
    };


  render() {
    return (
      <View style={styles.container}>
          <TextInput
            placeholder='Type your username'
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({
                name: text,
              });
            }}
            value={this.state.name}
          />

        <TouchableOpacity
          onPress={() => {
              Backend.listOfUsersOnline((response) => {
                  console.log('push view');
                  console.log('BACKEND UUID', Backend.uuid);
                  let onlineUsers = response.occupants.filter(user => user.uuid !== Backend.uuid);
                  Actions.onlineUsersList({
                    name: this.state.name,
                    onlineUsers: onlineUsers
                  });
              });

          }}
        >
          <Text style={styles.label3}>
            Login
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'steelblue',
  },
  textInput: {
    height: 40,
    marginLeft: 15,
    marginTop: 120,
  },
  label3: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
  },

});
