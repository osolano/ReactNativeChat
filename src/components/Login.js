import React from 'react';
import Backend from '../Backend';

import {
  StyleSheet,
  Text,
  TextInput
} from 'react-native';

import { Container, Content, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Login extends React.Component {
    state = {
      username: '',
      password: ''
    };

  render() {
    return (
        <Container style={{backgroundColor: 'steelblue'}}>
            <Content>
                <TextInput placeholder='Username' style={styles.textInput} placeholderTextColor='mintcream'
                onChangeText={(text) => { this.setState({ username: text }); }}
                value={this.state.name}
                />
                <TextInput placeholder='Password' style={styles.textInput} placeholderTextColor='mintcream'
                onChangeText={(text) => { this.setState({ password: text }); }}
                value={this.state.name}
                />

                <Button style={{marginLeft: 20, marginRight: 20}} success block large onPress={() => {
                    if (this.state.name.length > 0) {
                        Backend.pubnubSetup(this.state.name);
                        Backend.listOfUsersOnline((response) => {
                            let onlineUsers = response.occupants.filter(user => user.uuid !== Backend.uuid);
                            Actions.onlineUsersList({
                              name: this.state.name,
                              onlineUsers: onlineUsers
                            });
                        });
                    }
                }}>
                    <Text style={{color: 'white', fontSize: 18}}>Login</Text>
                </Button>
            </Content>
        </Container>
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
    marginTop: 40,
    color: 'white',
    fontSize: 34,
    textAlign: 'center',
    height: 100,
    flex: 1
  },

});
