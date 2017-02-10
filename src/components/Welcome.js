import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class Welcome extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.label, {marginTop: 40}]}>
          Welcome to Chat
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    marginLeft: 15,
  },
  textInput: {
    height: 40,
    marginLeft: 15,
  },
});
