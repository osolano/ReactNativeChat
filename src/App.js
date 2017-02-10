import React from 'react';
import {
  Platform,
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Welcome from './components/Welcome';
import Login from './components/Login';
import OnlineUsersList from './components/OnlineUsersList';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64 : 54}}>
          <Scene key='welcome'
            navigationBarStyle={{ backgroundColor: 'steelblue', borderBottomWidth: 0 }}
            component={Welcome}
            />
            <Scene key='login'
              navigationBarStyle={{ backgroundColor: 'steelblue', borderBottomWidth: 0 }}
              component={Login}
              />
              <Scene key='onlineUsersList'
                component={OnlineUsersList}
                title='Online'
                />
        </Scene>
      </Router>
    );
  }
}
