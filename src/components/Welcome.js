import React from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { Container, Content, Button, Text, Footer, FooterTab, Left, Right, Body, Icon } from 'native-base';

export default class Welcome extends React.Component {

  render() {
    return (
        <Container style={{backgroundColor: 'steelblue', alignItems: 'center'}}>
             <Content>
             <Text style={{fontSize: 30, color: 'white', marginTop: 70}}>Welcome to</Text>
             <Text style={{fontSize: 80, color: 'white'}}>Chat</Text>
             </Content>
             <Footer>
             <FooterTab>
                 <Button full large onPress={() => Actions.login()}>
                     <Text style={{color: 'steelblue'}}>Get Started! ✋</Text>
                 </Button>
             </FooterTab>
         </Footer>
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
  button: {
    fontSize: 30,
    color: 'white'
  },
});
