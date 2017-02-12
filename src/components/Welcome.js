import React from 'react';
import {
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { Container, Content, Button, Text} from 'native-base';

export default class Welcome extends React.Component {

  render() {
    return (
        <Container style={{backgroundColor: 'steelblue', alignItems: 'center'}}>
             <Content>
                 <Text style={{fontSize: 20, color: 'white', marginTop: 60, textAlign: 'center'}}>Welcome to</Text>
                 <Text style={{fontSize: 80, color: 'white', textAlign: 'center'}}>Chat</Text>
                 <Button style={{marginTop: 20, marginLeft: 20, marginRight: 20}} success block large onPress={() => Actions.login()}>
                     <Text style={{color: 'white'}}>Get Started!</Text>
                 </Button>
             </Content>
         </Container>
    );
  }
}
