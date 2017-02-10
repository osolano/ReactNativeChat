import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class Welcome extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.label1]}>
          Welcome to
        </Text>
        <Text style={[styles.label2]}>
          Chat
        </Text>

        <TouchableOpacity
          onPress={() => {
            //Actions.chat();
          }}
        >
          <Text style={styles.label3}>
            Get Started!
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
  label1: {
    fontSize: 20,
    marginTop: 120,
    color: 'white',
  },
  label2: {
    fontSize: 60,
    color: 'white',
  },
  label3: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
  },
});
