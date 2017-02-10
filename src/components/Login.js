import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import { Actions } from 'react-native-router-flux';

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
            //Actions.chat();
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
