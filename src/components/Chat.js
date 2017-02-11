import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class Chat extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.label1]}>
          Chat
        </Text>
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
});
