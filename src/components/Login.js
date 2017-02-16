import React from 'react';
import Backend from '../Backend';
import Authentication from '../Authentication';

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
                <TextInput placeholder='Username' style={styles.usernameInput} placeholderTextColor='mintcream'
                  onChangeText={(text) => { this.setState({ username: text.trim() }); }}
                  value={this.state.name}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
                <TextInput placeholder='Password' style={styles.passwordInput} placeholderTextColor='mintcream'
                  onChangeText={(text) => { this.setState({ password: text }); }}
                  value={this.state.name}
                  secureTextEntry={true}
                  autoCorrect={false}
                />

                <Button style={{marginLeft: 20, marginRight: 20}} success block large onPress={() => this.tapLoginButton() }>
                    <Text style={{color: 'white', fontSize: 18}}>Login</Text>
                </Button>
            </Content>
        </Container>
    );
  }

  tapLoginButton() {
    if (this.inputIsValid()) {
      Authentication.authenticateLogin(this.state.username,this.state.password).then((json) => {
        this.pushOnlineUserListScreen(json.email);
      });
    }
  }

  inputIsValid(username, password) {
    // just making an assumption on username length.
    if (this.state.username.length > 2) {
      console.log('Valid username');
    } else {
      console.log('Invalid username');
      alert('Your username is a bit short.');
      return false;
    }

    // just making an assumption on password length.
    if (this.state.password.length > 6) {
      console.log('Valid password');
    } else {
      console.log('Invalid password');
      alert('Your password is a bit short');
      return false;
    }

    return true;
  }

  pushOnlineUserListScreen(username) {
    Backend.pubnubSetup(username);
    Backend.listOfUsersOnline((response) => {
        let onlineUsers = response.occupants.filter(user => user.uuid !== Backend.uuid);
        Actions.onlineUsersList({
          name: username,
          onlineUsers: onlineUsers
        });
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'steelblue',
  },
  usernameInput: {
    marginTop: 40,
    color: 'white',
    fontSize: 34,
    textAlign: 'center',
    height: 60,
    flex: 1
  },
  passwordInput: {
    color: 'white',
    fontSize: 34,
    textAlign: 'center',
    height: 60,
    flex: 1
  },

});
