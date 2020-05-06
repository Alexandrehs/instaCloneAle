import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import Feeds from './pages/feeds';
import Logo from './assets/instagram.png';

const Stack = createStackNavigator();

export default function Routes() {
  return(
    <Stack.Navigator
      screenOptions={{
        headerTitle: <Image source={Logo} />,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: '#f5f5f5'
        }
      }}
    >
      <Stack.Screen name="Feeds" component={Feeds} />
    </Stack.Navigator>
  );
}