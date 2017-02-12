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


        <Text style={[styles.label2]}>
          Welcome to
        </Text>

        <Text style={[styles.label3]}>
         Chat
        </Text>
        <TouchableOpacity
          onPress={() => {
            Actions.login();
          }}
        >
          <Text style={styles.label4}>
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
    fontSize: 60,
    marginTop: 20,
    color: 'white',
  },
  label2: {
    fontSize: 30,
    marginTop: 60,
    color: 'white',
  },
  label3: {
    fontSize: 80,
    color: 'white',
    marginTop: 10,
  },
  label4: {
    fontSize: 30,
    color: 'white',
    marginTop: 60,
  },
});
